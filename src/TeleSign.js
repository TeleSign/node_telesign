const RestClient = require('./RestClient.js');
const MessagingClient = require('./MessagingClient.js');
const ScoreClient = require('./ScoreClient.js');
const PhoneIDClient = require('./PhoneIDClient.js');
const VoiceClient = require('./VoiceClient.js');
const AppVerifyClient = require('./AppVerifyClient.js');
const { FetchRequestWrapper } = require('./RequestWrapper');
const detectEndpoint = "https://detect.telesign.com";

module.exports = class TeleSign {
    constructor(customerId,
                apiKey,
                restEndpoint = "https://rest-api.telesign.com",
                timeout = 15000,
                useragent = null,
                source = "node_telesign",
                sdkVersionOrigin = null,
                sdkVersionDependency = null) {

        const requestWrapper = new FetchRequestWrapper();
        this.rest = new RestClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent, source, sdkVersionOrigin, sdkVersionDependency);
        this.sms = new MessagingClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.voice = new VoiceClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.score = new ScoreClient(requestWrapper, customerId, apiKey, detectEndpoint, timeout, useragent);
        this.phoneid = new PhoneIDClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.appverify = new AppVerifyClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    }
};