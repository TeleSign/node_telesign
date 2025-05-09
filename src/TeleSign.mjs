import RestClient from './RestClient.mjs';
import MessagingClient from './MessagingClient.mjs';
import ScoreClient from './ScoreClient.mjs';
import PhoneIDClient from './PhoneIDClient.mjs';
import VoiceClient from './VoiceClient.mjs';
import AppVerifyClient from './AppVerifyClient.mjs';
import IntelligenceClient from './IntelligenceClient.mjs';
import { FetchRequestWrapper } from './RequestWrapper.mjs';

export default class TeleSign {
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
        this.score = new ScoreClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.phoneid = new PhoneIDClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.appverify = new AppVerifyClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
        this.intelligence = new IntelligenceClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    }
};
