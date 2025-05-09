/***
 * A set of APIs that deliver deep phone number data attributes that help optimize the end user
 * verification process and evaluate risk.
 */
export default class PhoneIDClient extends RestClient {
    constructor(requestWrapper: any, customerId: any, apiKey: any, restEndpoint?: any, timeout?: number, useragent?: any);
    phoneid_resource: string;
    /***
     * The PhoneID API provides a cleansed phone number, phone type, and telecom carrier
     * information to determine the best communication method - SMS or voice.
     *
     * See https://developer.telesign.com/docs/phoneid-api for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param phoneNumber: Phone number to call
     * @param accountLifecycleEvent: (Optional) Indicates the phase in lifecycle for the
     * transaction.
     * @param originatingIP: IP address of request origination host
     */
    phoneID(callback: any, phoneNumber: any, params?: any): void;
}
import RestClient from './RestClient';
