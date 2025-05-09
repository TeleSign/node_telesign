import RestClient from "./RestClient";
import MessagingClient from "./MessagingClient";
import ScoreClient from "./ScoreClient";
import PhoneIDClient from "./PhoneIDClient";
import VoiceClient from "./VoiceClient";
import AppVerifyClient from "./AppVerifyClient";
import IntelligenceClient from "./IntelligenceClient";
import { FetchRequestWrapper } from "./RequestWrapper";
export default class TeleSign {
  constructor(customerId, apiKey) {
    var restEndpoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "https://rest-api.telesign.com";
    var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15000;
    var useragent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var source = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "node_telesign";
    var sdkVersionOrigin = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var sdkVersionDependency = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    var requestWrapper = new FetchRequestWrapper();
    this.rest = new RestClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent, source, sdkVersionOrigin, sdkVersionDependency);
    this.sms = new MessagingClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    this.voice = new VoiceClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    this.score = new ScoreClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    this.phoneid = new PhoneIDClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    this.appverify = new AppVerifyClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    this.intelligence = new IntelligenceClient(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
  }
}
;