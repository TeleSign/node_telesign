import RestClient from "./RestClient";

/***
 * A set of APIs that deliver deep phone number data attributes that help optimize the end user
 * verification process and evaluate risk.
 */
export default class PhoneIDClient extends RestClient {
  constructor(requestWrapper, customerId, apiKey) {
    var restEndpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15000;
    var useragent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    super(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    this.phoneid_resource = "/v1/phoneid/";
    this.contentType = "application/json";
  }

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
  phoneID(callback, phoneNumber) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    this.execute(callback, "POST", this.phoneid_resource + encodeURI(phoneNumber), params);
  }
}