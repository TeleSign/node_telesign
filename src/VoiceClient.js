
var RestClient = require('./RestClient.js');

class VoiceClient extends RestClient {
    constructor(customerId,  apiKey, restEndpoint=null, timeout=15000, useragent=null, debug=false){
        super(customerId, apiKey, restEndpoint, timeout, useragent, debug);
        if(debug){console.log("Init Voice Client")}        
        
        this.voice_resource = "/v1/voice";
        this.voice_status_resource = "/v1/voice/"
    }
    call(callback, phone_number, message, message_type, voice = null, callbackURL = null, account_lifecycle_event = null, originating_ip = null, debug=false){
        if(debug){console.log("Calling "+phone_number)};        
        
        var postParams = {
            phone_number : phone_number,
            message :  message,
            message_type : message_type
        }
        if(voice!=null){
            postParams.voice = voice;
        }
        if(callbackURL!=null){
            postParams.callbackURL = callbackURL;
        }
        if(account_lifecycle_event!=null){
            postParams.account_lifecycle_event = account_lifecycle_event;
        }
        if(originating_ip!=null){
            postParams.originating_ip = originating_ip;
        }


        this.execute(callback, "POST", this.voice_resource, postParams);
    }
    getCallStatus(callback, referenceId, debug = false){
        if(debug){console.log("Retreving Call Status for "+referenceId)}        
        
        var status_resource = this.voice_status_resource+referenceId;
        this.execute(callback, "GET", status_resource);
    }
}

module.exports = VoiceClient;
