import RestClient from "./RestClient";

/***
 * Score provides risk information about a specified phone number.
 */
export default class ScoreClient extends RestClient {
  constructor(requestWrapper, customerId, apiKey) {
    var restEndpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15000;
    var userAgent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    super(requestWrapper, customerId, apiKey, restEndpoint, timeout, userAgent);
    this.scoreResource = "/v1/score/";
  }

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
  score(callback, phoneNumber, accountLifecycleEvent) {
    var originatingIP = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var deviceId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var accountId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var emailAddress = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var requestRiskInsights = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    var params = {
      account_lifecycle_event: accountLifecycleEvent
    };
    if (originatingIP != null) {
      params.originating_ip = originatingIP;
    }
    if (deviceId != null) {
      params.device_id = deviceId;
    }
    if (accountId != null) {
      params.account_id = accountId;
    }
    if (emailAddress != null) {
      params.email_address = emailAddress;
    }
    if (requestRiskInsights != null) {
      params.request_risk_insights = requestRiskInsights;
    }
    this.execute(callback, "POST", this.scoreResource + encodeURI(phoneNumber), params);
  }
}