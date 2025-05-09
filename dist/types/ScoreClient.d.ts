/***
 * Score provides risk information about a specified phone number.
 */
export default class ScoreClient extends RestClient {
    constructor(requestWrapper: any, customerId: any, apiKey: any, restEndpoint?: any, timeout?: number, userAgent?: any);
    scoreResource: string;
    /***
     * Score is an API that delivers reputation scoring based on phone number intelligence,
     * traffic patterns, machine learning, and a global data consortium.
     *
     * See https://developer.telesign.com/docs/score-api for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param phoneNumber: Phone number for which to check score
     * @param accountLifecycleEvent: Indicate what phase of the lifecycle you are in when you
     * send a transaction.
     * @param originatingIP: (Optional) End user's IP address.
     * @param deviceId: (Optional) End user’s device identifier.
     * @param accountId: (Optional) End user’s account id
     * @param emailAddress: (Optional) End user’s email address
     * @param requestRiskInsights: (Optional) Boolean value of true, false or null for reason codes
     *                              ONLY SET IF Score 2.0 requests is enabled, confirm with your Telesign representative
     */
    score(callback: any, phoneNumber: any, accountLifecycleEvent: any, originatingIP?: any, deviceId?: any, accountId?: any, emailAddress?: any, requestRiskInsights?: any): void;
}
import RestClient from './RestClient';
