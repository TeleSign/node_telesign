const crypto = require("crypto");
const fs = require('fs');
const path = require('path');
const Constants = require('./Constants.js');

/***
 * The TeleSign RestClient is a generic HTTP REST client that can be extended to make
 * requests against any of TeleSign's REST API endpoints.
 *
 * See https://developer.telesign.com for detailed API documentation.
 */
class RestClient {

    constructor(requestWrapper,
                customerId,
                apiKey,
                restEndpoint = "https://rest-api.telesign.com",
                timeout = 15000,
                userAgent = null,
                contentType = "application/x-www-form-urlencoded") {
        this.requestWrapper = requestWrapper
        this.customerId = customerId;
        this.apiKey = apiKey;
        this.restEndpoint = (restEndpoint === null ? "https://rest-api.telesign.com" : restEndpoint);
        this.timeout = timeout;
        this.contentType = contentType ;

        try {
            if (userAgent === null) {
                const packageJsonPath = path.join(__dirname, '..', 'package.json')
                const packageJson = fs.readFileSync(packageJsonPath, 'utf8');
                const packageData = JSON.parse(packageJson);
                const version = packageData.version;
                this.userAgent = `TeleSignSDK/ECMAScript-Node v ${version}`
                    + ` ${process.arch}`
                    + `/${process.platform}`
                    + ` ${process.release.name}`
                    + `/${process.version}`; // Generates a Node useragent - helpful in diagnosing errors
            }
        }
        catch (err) {
            this.userAgent = "TeleSignSDK/ECMAScript-Node v-UNKNOWN";
            console.error("WARNING: Trouble determining OS Specific information for user agent");
        }

    }


    /***
     * Generates the TeleSign REST API headers used to authenticate requests.
     *
     * Creates the canonicalized stringToSign and generates the HMAC signature. This is used to
     * authenticate requests against the TeleSign REST API.
     *
     * See https://developer.telesign.com/docs/authentication for detailed API documentation.
     *
     * @param customerId: Your account customerId.
     * @param apiKey: Your account apiKey.
     * @param methodName: The HTTP method name of the request as a upper case string, should be one
     * of 'POST', 'GET', 'PUT' or 'DELETE'.
     * @param resource: The partial resource URI to perform the request against, as a string.
     * @param urlEncodedFields: HTTP body parameters to perform the HTTP request with, must be a
     * urlencoded string.
     * @param date: The date and time of the request formatted in rfc 2616, as a string.
     * @param nonce: A unique cryptographic nonce for the request, as a string.
     * @param userAgent: (optional) User Agent associated with the request, as a string.
     * @param authMethod : (optional) Authentication type. For ex: Basic, HMAC etc
     * @returns headers: {{Authorization: string, Date: *, Content-Type: string,
     * x-ts-auth-method: string, x-ts-nonce: *}}
     */
    static generateTeleSignHeaders(customerId,
                                   apiKey,
                                   methodName,
                                   resource,
                                   contentType,
                                   encodedFields,
                                   date = null,
                                   nonce = null,
                                   userAgent = null,
                                   authMethod=null) {

        if (date == null) {
            date = (new Date()).toUTCString();
        }

        if (nonce == null) {
            nonce = crypto.randomUUID(); // generates a Random NONCE (Number Used Only Once)
        }

        var contentType = (methodName == "POST" || methodName == "PUT") ?
            contentType : "";
        var authMethod = authMethod!=null ? authMethod: Constants.AuthMethodNames.HMAC_SHA256;

        var urlencoded = "";
        if (encodedFields != null && encodedFields.length > 0) {
            urlencoded = "\n" + encodedFields;
        }
        var stringToSignBuilder = methodName +
            "\n" + contentType +
            "\n" + date +
            "\n" + "x-ts-auth-method:" + authMethod +
            "\n" + "x-ts-nonce:" + nonce +
            urlencoded +
            "\n" + resource;
        if(authMethod === Constants.AuthMethodNames.BASIC){
            var authorization = "Basic " + Buffer.from(customerId + ":" + apiKey).toString('base64');
        }else{
            var signedStrUTF8 = stringToSignBuilder.toString('utf8');
            var decodedAPIKey = Buffer.from(apiKey, 'base64');

            var jsSignature = crypto.createHmac("sha256", decodedAPIKey)
                .update(signedStrUTF8)
                .digest("base64")
                .toString('utf8');
            // console.log("js Signature: " + jsSignature);

            var authorization = "TSA " + customerId + ":" + jsSignature;
        }
        var headers = {
            "Authorization": authorization,
            "Date": date,
            "Content-Type": contentType,
            "x-ts-auth-method": authMethod,
            "x-ts-nonce": nonce
        };
        if (userAgent != null)
            headers["User-Agent"] = userAgent;

        return headers;
    } // method generateTeleSignHeaders


    /***
     * Generic TeleSign REST API request handler.
     *
     * @param callback: Callback method to handle response.
     * @param methodName: The HTTP method name, as an upper case string.
     * @param resource: The partial resource URI to perform the request against, as a string.
     * @param authMethod: (optional) Authentication type. For ex: Basic, HMAC etc
     * @param params: Body params to perform the HTTP request with, as a dictionary.
     */
    execute(callback, methodName, resource, params = null, authMethod = null, nonce = null, date = null) {
        var telesignURL = this.restEndpoint + resource;
        var bodyData = this.contentType=="application/json" ? "{}" : null;
        if (methodName == "POST" || methodName == "PUT") {
            if (params != null && Object.keys(params).length > 0) {
              if (this.contentType == "application/x-www-form-urlencoded") {
                 const urlSearchParams = new URLSearchParams(params);
                 bodyData = urlSearchParams.toString();
              } else {
                bodyData = JSON.stringify(params);
              }
            }
        }
        else { // GET method
            if (params != null) {
                var url = new URL(this.restEndpoint + resource);
                Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                telesignURL = url.toString();
            }
            else {
                telesignURL = new URL(this.restEndpoint + resource).toString();
            }
        }

        var headers = RestClient.generateTeleSignHeaders(this.customerId,
            this.apiKey,
            methodName,
            resource,
            this.contentType,
            bodyData,
            date !== null ? date : null,
            nonce,
            this.userAgent,
            authMethod);

        var requestParams = {
            headers: headers,
            url: telesignURL,
            method: methodName,
            timeout: this.timeout
        };

        if (bodyData != null) {
            requestParams.body = bodyData;
        }

        this.requestWrapper.request(requestParams, function (err, res, bodyStr) {

            if (err) {

                console.error(`FATAL ERROR: ${date !== null ? date : new Date()}`
                    + ` Problems contacting Telesign Servers. Check your internet connection.`);

                if (callback){
                    callback(err, bodyStr);
                }
            }
            if (res) {
                var body = JSON.parse(bodyStr);
                if (callback){
                    callback(err, body);
                }
            }
        });

    }
}

module.exports = RestClient;
