/***
 * It is critical today to evaluate fraud risk throughout the entire customer journey.
 *
 * Telesign Intelligence makes it easy to understand the risk and the reason behind it with tailored scoring models
 *and comprehensive reason codes.
 */
export default class IntelligenceClient extends RestClient {
    constructor(requestWrapper: any, customerId: any, apiKey: any, restEndpoint?: any, timeout?: number, userAgent?: any);
    intelligenceResource: string;
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
    intelligence(callback: any, requestBody: any): void;
}
import RestClient from './RestClient';
