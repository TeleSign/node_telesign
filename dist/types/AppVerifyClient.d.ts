/***
 * App Verify is a secure, lightweight SDK that integrates a frictionless user verification
 * process into existing native mobile applications.
 */
export default class AppVerifyClient extends RestClient {
    constructor(requestWrapper: any, customerId: any, apiKey: any, restEndpoint?: any, timeout?: number, userAgent?: any);
    appverify_resource: string;
    /***
     * Get status of app verification transaction.
     *
     * @param callback: Callback method to handle the response.
     * @param externalId: External ID (xid) used in the JWT token during verification.
     */
    status(callback: any, externalId: any): void;
}
import RestClient from './RestClient';
