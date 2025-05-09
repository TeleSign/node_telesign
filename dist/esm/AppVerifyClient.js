import RestClient from "./RestClient";

/***
 * App Verify is a secure, lightweight SDK that integrates a frictionless user verification
 * process into existing native mobile applications.
 */
export default class AppVerifyClient extends RestClient {
  constructor(requestWrapper, customerId, apiKey) {
    var restEndpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15000;
    var userAgent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    super(requestWrapper, customerId, apiKey, restEndpoint, timeout, userAgent);
    this.appverify_resource = "/v1/mobile/verification/status/";
  }

  /***
   * Get status of app verification transaction.
   *
   * @param callback: Callback method to handle the response.
   * @param externalId: External ID (xid) used in the JWT token during verification.
   */
  status(callback, externalId) {
    this.execute(callback, "GET", this.appverify_resource + externalId);
  }
}