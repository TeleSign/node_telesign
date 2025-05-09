import RestClient from "./RestClient";
import { AuthMethodNames } from "./Constants";
var INTELLIGENCE_ENDPOINT_PATH = "/intelligence";
var contentType = "application/json";

/***
 * It is critical today to evaluate fraud risk throughout the entire customer journey.
 *
 * Telesign Intelligence makes it easy to understand the risk and the reason behind it with tailored scoring models
 *and comprehensive reason codes.
 */
export default class IntelligenceClient extends RestClient {
  constructor(requestWrapper, customerId, apiKey) {
    var restEndpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15000;
    var userAgent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    super(requestWrapper, customerId, apiKey, restEndpoint, timeout, userAgent, contentType);
    this.intelligenceResource = INTELLIGENCE_ENDPOINT_PATH;
  }

  /***
   * Telesign Intelligence is like a credit check for digital profiles.
   *
   * You submit a phone number, IP, and email to the service, the individual
   *identifiers are each evaluated, and then a score is returned telling you how risky
   *that user is.
   *
   * You decide whether to proceed based on the score.
   *
   * See https://developer.telesign.com/enterprise/docs/intelligence-overview
   *for detailed API documentation.
   *
   * @param callback: Callback method to handle response.
   * @param requestBody: requestBody to be passed to Intelligence API
   */
  intelligence(callback, requestBody) {
    this.execute(callback, "POST", this.intelligenceResource, requestBody, AuthMethodNames.BASIC);
  }
}