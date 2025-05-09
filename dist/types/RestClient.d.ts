/***
 * The TeleSign RestClient is a generic HTTP REST client that can be extended to make
 * requests against any of TeleSign's REST API endpoints.
 *
 * See https://developer.telesign.com for detailed API documentation.
 */
export default class RestClient {
    /***
     * Generates the TeleSign REST API headers used to authenticate requests.
     *
     * Creates the canonicalized stringToSign and generates the HMAC signature. This is used to
     * authenticate requests against the TeleSign REST API.
     *
     * See https://developer.telesign.com/docs/authentication for detailed API documentation.
     *
     * @param customerId: Your account customerId.
     * @param apiKey: Your account apiKey.
     * @param methodName: The HTTP method name of the request as a upper case string, should be one
     * of 'POST', 'GET', 'PUT' or 'DELETE'.
     * @param resource: The partial resource URI to perform the request against, as a string.
     * @param urlEncodedFields: HTTP body parameters to perform the HTTP request with, must be a
     * urlencoded string.
     * @param date: The date and time of the request formatted in rfc 2616, as a string.
     * @param nonce: A unique cryptographic nonce for the request, as a string.
     * @param userAgent: (optional) User Agent associated with the request, as a string.
     * @param authMethod : (optional) Authentication type. For ex: Basic, HMAC etc
     * @returns headers: {{Authorization: string, Date: *, Content-Type: string,
     * x-ts-auth-method: string, x-ts-nonce: *}}
     */
    static generateTeleSignHeaders(customerId: any, apiKey: any, methodName: any, resource: any, contentType: any, encodedFields: any, date?: any, nonce?: any, userAgent?: any, authMethod?: any): {
        Authorization: string;
        Date: any;
        "Content-Type": any;
        "x-ts-auth-method": any;
        "x-ts-nonce": any;
    };
    constructor(requestWrapper: any, customerId: any, apiKey: any, restEndpoint?: string, timeout?: number, userAgent?: any, source?: string, sdkVersionOrigin?: any, sdkVersionDependency?: any, contentType?: string);
    requestWrapper: any;
    customerId: any;
    apiKey: any;
    restEndpoint: string;
    timeout: number;
    contentType: string;
    userAgent: string;
    /***
     * Generic TeleSign REST API request handler.
     *
     * @param callback: Callback method to handle response.
     * @param methodName: The HTTP method name, as an upper case string.
     * @param resource: The partial resource URI to perform the request against, as a string.
     * @param authMethod: (optional) Authentication type. For ex: Basic, HMAC etc
     * @param params: Body params to perform the HTTP request with, as a dictionary.
     */
    execute(callback: any, methodName: any, resource: any, params?: any, authMethod?: any, nonce?: any, date?: any): void;
    /**
     * @param {string} restEndpoint
     */
    setRestEndpoint(restEndpoint: string): void;
    /**
     * @param {string} contentType
     */
    setContentType(contentType: string): void;
}
