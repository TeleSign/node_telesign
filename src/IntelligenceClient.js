const RestClient = require('./RestClient.js');
const Constants = require('./Constants.js');

const INTELLIGENCE_ENDPOINT_PATH = "/intelligence";
const contentType = "application/json";

/***
 * It is critical today to evaluate fraud risk throughout the entire customer journey.
 *
 * Telesign Intelligence makes it easy to understand the risk and the reason behind it with tailored scoring models
 *and comprehensive reason codes.
 */
class IntelligenceClient extends RestClient {
    constructor(requestWrapper,
                customerId,
                apiKey,
                restEndpoint = null,
                timeout = 15000,
                userAgent = null) {

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
        this.execute(callback, "POST", this.intelligenceResource, requestBody,
            Constants.AuthMethodNames.BASIC);
    }
}

module.exports = IntelligenceClient;
