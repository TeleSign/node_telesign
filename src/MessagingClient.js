
var RestClient = require('./RestClient.js');

class MessagingClient extends RestClient {
    constructor(customerId,  apiKey, restEndpoint=null, timeout=15000, useragent=null, debug=false){
        super(customerId, apiKey, restEndpoint, timeout, useragent, debug);
        this.messaging_resource = "/v1/messaging";
        this.messaging_status_resource = "/v1/messaging/";
    }
    sendMessage(callback, phone_number, message, message_type){
        var params = {
            phone_number : phone_number,
            message :  message,
            message_type : message_type
        }
        this.execute(callback, "POST", this.messaging_resource, params, this.debug);
    }
    getMessageStatus(callback, referenceId){
        this.execute(callback, "GET", this.messaging_status_resource+referenceId, null, this.debug);
    }
}

module.exports = MessagingClient;
