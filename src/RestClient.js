const os = require('os');
const request = require('request');
const uuidV4Js = require("uuid-v4.js");
const crypto = require("crypto");
const URI = require('urijs');
const querystring = require('querystring');
const packagejson = require('../package.json');

/***
 * The TeleSign RestClient is a generic HTTP REST client that can be extended to make
 * requests against any of TeleSign's REST API endpoints.
 *
 * See https://developer.telesign.com for detailed API documentation.
 */
class RestClient {

    constructor(customerId,
                apiKey,
                restEndpoint = "https://rest-api.telesign.com",
                timeout = 15000,
                userAgent = null,
                debug = false) {
        this.customer_id = customerId;
        this.api_key = apiKey;
        this.restEndpoint = (restEndpoint === null ? "https://rest-api.telesign.com" : restEndpoint);
        this.timeout = timeout;
        this.debug = debug;

        if (debug) {
            console.log("Init PhoneId Client")
        }

        try {
            if (userAgent === null) {
                this.userAgent = `TeleSignSDK/ECMAScript-Node v ${packagejson.version}`
                    + ` ${os.arch()}`
                    + `/${os.platform()}`
                    + `-v${os.release()}`; // Generates a Node useragent - helpful in diagnosing errors
            }
        }
        catch (err) {
            this.userAgent = "TeleSignSDK/ECMAScript-Node v-UNKNOWN";
            console.error("WARNING: Trouble determining OS Specific information for user agent");
        }

        if (this.debug) {
            console.log("User-Agent: " + this.userAgent);
        }
    }


    /***
     * Generates the TeleSign REST API headers used to authenticate requests.
     *
     * Creates the canonicalized string_to_sign and generates the HMAC signature. This is used to
     * authenticate requests against the TeleSign REST API.
     *
     * See https://developer.telesign.com/docs/authentication for detailed API documentation.
     *
     * @param customerId: Your account customer_id.
     * @param apiKey: Your account api_key.
     * @param methodName: The HTTP method name of the request as a upper case string, should be one
     * of 'POST', 'GET', 'PUT' or 'DELETE'.
     * @param resource: The partial resource URI to perform the request against, as a string.
     * @param urlEncodedFields: HTTP body parameters to perform the HTTP request with, must be a
     * urlencoded string.
     * @param date: The date and time of the request formatted in rfc 2616, as a string.
     * @param nonce: A unique cryptographic nonce for the request, as a string.
     * @param userAgent: (optional) User Agent associated with the request, as a string.
     * @returns headers: {{Authorization: string, Date: *, Content-Type: string,
     * x-ts-auth-method: string, x-ts-nonce: *}}
     */
    static generateTeleSignHeaders(customerId,
                                   apiKey,
                                   methodName,
                                   resource,
                                   urlEncodedFields,
                                   date = null,
                                   nonce = null,
                                   userAgent = null) {

        if (date == null) {
            date = (new Date()).toUTCString();
        }

        if (nonce == null) {
            nonce = uuidV4Js(); // generates a Random NONCE (Number Used Only Once)
        }

        var contentType = (methodName == "POST" || methodName == "PUT") ?
            "application/x-www-form-urlencoded" : "";
        var authMethod = "HMAC-SHA256";

        var urlencoded = "";
        if (urlEncodedFields != null && urlEncodedFields.length > 0) {
            urlencoded = os.EOL + urlEncodedFields;
        }
        var string_to_sign_builder = methodName +
            os.EOL + contentType +
            os.EOL + date +
            os.EOL + "x-ts-auth-method:" + authMethod +
            os.EOL + "x-ts-nonce:" + nonce +
            urlencoded +
            os.EOL + resource;

        var signed_str_utf8 = string_to_sign_builder.toString('utf8');
        var decodedAPIKey = Buffer.from(apiKey, 'base64');

        var jsSignature = crypto.createHmac("sha256", decodedAPIKey)
            .update(signed_str_utf8)
            .digest("base64")
            .toString('utf8');
        // console.log("js Signature: " + jsSignature);

        var authorization = "TSA " + customerId + ":" + jsSignature;
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
     * @param params: Body params to perform the HTTP request with, as a dictionary.
     */
    execute(callback, methodName, resource, params = null) {
        var telesign_url = this.restEndpoint + resource;
        var bodyData = null;
        if (methodName == "POST" || methodName == "PUT") {
            if (params != null && Object.keys(params).length > 0) {
                bodyData = querystring.stringify(params);
                if (this.debug) {
                    console.log("POST/Put Params: " + bodyData);
                }
            }
        }
        else { // GET method
            if (params != null) {
                telesign_url = URI(this.restEndpoint + resource).query(params);
            }
            else {
                telesign_url = URI(this.restEndpoint + resource).toString();
            }
        }

        var headers = RestClient.generateTeleSignHeaders(this.customer_id,
            this.api_key,
            methodName,
            resource,
            bodyData,
            null,
            null,
            this.userAgent);

        var requestParams = {
            headers: headers,
            uri: telesign_url,
            method: methodName
        };

        if (bodyData != null) {
            requestParams.body = bodyData;
        }
        if (this.debug) {
            console.log(requestParams);
        }

        request(requestParams, function (err, res, bodyStr) {

            if (err) {

                console.error(`FATAL ERROR: ${new Date()}`
                    + ` Problems contacting Telesign Servers. Check your internet connection.`);

                if (this.debug) {
                    console.log(err);
                    console.log(res);
                }
                callback(err, bodyStr);

            }
            if (res) {
                var body = JSON.parse(bodyStr);
                callback(err, body);
            }
        });

    }
}

module.exports = RestClient;
