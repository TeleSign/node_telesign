var RestClient = require('./RestClient.js');
var MessagingClient = require('./MessagingClient.js');
var ScoreClient = require('./ScoreClient.js');
var PhoneIDClient = require('./PhoneIDClient.js');
var VoiceClient = require('./VoiceClient.js')


module.exports = class TeleSign {
    constructor(customerId,  apiKey, restEndpoint="https://rest-api.telesign.com", timeout=15000, useragent=null, debug = false){ 

        if(debug==true){console.log("Init TeleSign SDK")};

        this.sms = new MessagingClient(customerId, apiKey, restEndpoint, timeout, useragent, debug);
        this.voice = new VoiceClient(customerId, apiKey, restEndpoint, timeout, useragent, debug);
        this.score = new ScoreClient(customerId, apiKey, restEndpoint, timeout, useragent, debug);
        this.phoneid = new PhoneIDClient(customerId, apiKey, restEndpoint, timeout, useragent, debug);
    }
}