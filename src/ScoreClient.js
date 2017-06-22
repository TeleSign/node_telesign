
var RestClient = require('./RestClient.js');

class ScoreClient extends RestClient {
    constructor(customerId,  apiKey, restEndpoint=null, timeout=15000, useragent=null){
        super(customerId, apiKey, restEndpoint, timeout, useragent);
        this.score_resource = "/v1/score/";
    }
    getScore(callback, phone_number, accountLifecycleEvent, originating_ip=null, device_id=null, account_id=null, email_address=null){
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
