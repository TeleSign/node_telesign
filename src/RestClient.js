const uuidV4Js = require("uuid-v4.js");
var jsSHA = require("jssha");
var packagejson = require('../package.json');
var URI = require('urijs');
const os = require('os');

const utf8 = require('utf8');
const request = require('request');
var querystring = require('querystring');

class RestClient {
    constructor(customer_id, api_key, restEndpoint = "https://rest-api.telesign.com", timeout = 15000, user_agent, debug=false) {
        this.customer_id = customer_id;
        this.api_key = api_key;
        this.restEndpoint = restEndpoint;
        this.timeout = timeout; 
        this.debug = debug;

        try{
            if(!user_agent){
                this.user_agent="TeleSignSDK/ECMAScript-Node v"+packagejson.version+" "+os.arch()+"/"+os.platform()+"-v"+os.release(); // Generates a Node useragent - helpful in diagnosing errors
            }
        }
        catch(err){
            this.user_agent="TeleSignSDK/ECMAScript-Node v-UNKNOWN";
            console.error("WARNING: Trouble determining OS Specific information for user agent");
        }
        if(this.debug){
            console.log("User-Agent: "+this.user_agent);
        }
        
    }

    static generateTeleSignHeaders(
        customer_id, 
        api_key, 
        method_name,
        resource,
        url_encoded_fields,
        date = null,
        nonce = null
    ){
        if(!date) {
            date = (new Date()).toUTCString();
        }
        
        if(!nonce) {
            nonce = uuidV4Js(); // generates a Random NONCE (Number Used Only Once)
        }

        var content_type = (method_name=="POST" || method_name=="PUT")? "application/x-www-form-urlencoded" : "";
        var auth_method = "HMAC-SHA256";

        var urlencoded="";
        if(url_encoded_fields != null && url_encoded_fields.length > 0){
            urlencoded="\n"+url_encoded_fields;
        }
        var string_to_sign_builder = method_name+
                                    "\n"+content_type+
                                    "\n"+date+
                                    "\n"+"x-ts-auth-method:"+auth_method+
                                    "\n"+"x-ts-nonce:"+nonce+
                                    urlencoded+ // note, \n is already incorporated
                                    "\n"+resource;

        const signed_str_utf8 = utf8.encode(string_to_sign_builder); // TODO: check if this step is required

        //console.log(signed_str_utf8);

        var shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.setHMACKey(api_key, "B64");
        shaObj.update(signed_str_utf8);
        var jsSignature = shaObj.getHMAC("B64");
        var authorization = "TSA "+customer_id+":"+jsSignature;
        var headers = {
                "Authorization": authorization, 
                "Date": date, 
                "Content-Type":content_type, 
                "x-ts-auth-method":auth_method, 
                "x-ts-nonce":nonce 
            };
        if(this.user_agent!=null) headers["User-Agent"] = this.user_agent;
        return headers;
    } // method generateTeleSignHeaders

    execute(callback, methodName, resource, params=null){
        var telesign_url = this.restEndpoint + resource;
        var bodyData = null;
        if (methodName=="POST" || methodName=="PUT"){
            if(params!=null && Object.keys(params).length>0){
                bodyData = querystring.stringify(params);
                if(this.debug){
                    console.log("POST/Put Params: "+ bodyData);
                };                
            }
        }
        else{ // GET method
            if(params!=null){
                telesign_url=URI(this.restEndpoint+resource).query(params);
            }
            else{
                telesign_url=URI(this.restEndpoint+resource).toString();
            }
        }

        var headers = RestClient.generateTeleSignHeaders(this.customer_id, this.api_key, methodName, 
                                                         resource, bodyData, null, null);

        var requestParams = {
            headers: headers,
            uri: telesign_url,
            method: methodName
        }

        if(bodyData!=null){ requestParams.body=bodyData;};

        if(this.debug){
            console.log(requestParams);
        }

        request(requestParams, function (err, res, bodyStr) {
                if(err){
                    console.error("FATAL ERROR: " +Date()+" Problems contacting Telesign Servers. Check your internet connection.");
                    if(this.debug){
                        console.log(err);
                        console.log(res);
                    }
                    callback(err, bodyStr);

                }
                if(res){
                    var body=JSON.parse(bodyStr);
                    callback(err, body);
                }
        });
        
    }
}

module.exports = RestClient;
