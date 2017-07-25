
var RestClient = require('./RestClient.js');

class ScoreClient extends RestClient {
    constructor(customerId,  apiKey, restEndpoint=null, timeout=15000, useragent=null, debug=false){
        super(customerId, apiKey, restEndpoint, timeout, useragent);
        if(debug){console.log("Init Score Client")}        
        
        this.score_resource = "/v1/score/";
    }
    getScore(callback, phone_number, accountLifecycleEvent, originating_ip=null, device_id=null, account_id=null, email_address=null, debug=false){
        if(debug){console.log("Retreving score for "+phone_number)}        

        var params = {
            account_lifecycle_event: accountLifecycleEvent
        }
        if(originating_ip!=null){
            params.originating_ip = originating_ip;
        }
        if(device_id!=null){
            params.device_id = device_id;
        }
        if(account_id!=null){
            params.account_id = account_id;
        }
        if(email_address!=null){
            params.email_address = email_address;
        }
        
        this.execute(callback, "POST", this.score_resource+encodeURI(phone_number), params);
    }
}

module.exports = ScoreClient;
