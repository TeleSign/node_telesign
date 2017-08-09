const RestClient = require('./RestClient.js');

/***
 * Score provides risk information about a specified phone number.
 */
class ScoreClient extends RestClient {
    constructor(customerId,
                apiKey,
                restEndpoint = null,
                timeout = 15000,
                userAgent = null,
                debug = false) {

        super(customerId, apiKey, restEndpoint, timeout, userAgent);
        if (debug) {
            console.log("Init Score Client")
        }

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
     * @param debug: Adds debug logs
     */
    score(callback,
          phoneNumber,
          accountLifecycleEvent,
          originatingIP = null,
          deviceId = null,
          accountId = null,
          emailAddress = null,
          debug = false) {

        if (debug) {
            console.log("Retreving score for " + phoneNumber)
        }

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

        this.execute(callback, "POST", this.scoreResource + encodeURI(phoneNumber), params);
    }
}

module.exports = ScoreClient;
