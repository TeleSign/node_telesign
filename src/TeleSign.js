const RestClient = require('./RestClient.js');
const MessagingClient = require('./MessagingClient.js');
const ScoreClient = require('./ScoreClient.js');
const PhoneIDClient = require('./PhoneIDClient.js');
const VoiceClient = require('./VoiceClient.js');
const AppVerifyClient = require('./AppVerifyClient.js');
const IntelligenceClient = require('./IntelligenceClient.js');
const { FetchRequestWrapper } = require('./RequestWrapper')

module.exports = class TeleSign {
    constructor(customerId,
                apiKey,
                restEndpoint = "https://rest-api.telesign.com",
                timeout = 15000,
                useragent = null) {

        const requestWrapper = new FetchRequestWrapper();
        this.rest = new RestClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.sms = new MessagingClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.voice = new VoiceClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.score = new ScoreClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.phoneid = new PhoneIDClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.appverify = new AppVerifyClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.intelligence = new IntelligenceClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    }
};