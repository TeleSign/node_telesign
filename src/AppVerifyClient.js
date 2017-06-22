var RestClient = require('./RestClient.js');

class AppVerify extends RestClient {
    constructor(customerId,  apiKey, restEndpoint=null, timeout=15000, useragent=null, debug=false){
        super(customerId, apiKey, restEndpoint, timeout, useragent, debug);
        this.appverify_resource = "/v1/mobile/verification/status/";
    }
    getStatus(callback, externalId){
        this.execute(callback, "GET", this.messaging_status_resource+externalId);
    }
}

module.exports = MessagingClient;
