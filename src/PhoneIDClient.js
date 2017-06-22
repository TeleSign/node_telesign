
var RestClient = require('./RestClient.js');

class PhoneIDClient extends RestClient {
    constructor(customerId,  apiKey, restEndpoint=null, timeout=15000, useragent=null, debug=false){
        super(customerId, apiKey, restEndpoint, timeout, useragent, debug);
        this.phoneid_resource = "/v1/phoneid/";
    }
    getPhoneID(callback, phone_number, accountLifecycleEvent=null, originating_ip=null){
        var params = {};
        if(originating_ip!=null){
            params.originating_ip = originating_ip;
        }
        if(accountLifecycleEvent!=null){
            params.accountLifecycleEvent = accountLifecycleEvent;
        }

        this.execute(callback, "POST", this.phoneid_resource+encodeURI(phone_number), params);
    }
}

module.exports = PhoneIDClient;