var RestClient = require("./RestClient.js");

/***
 * A set of APIs that deliver deep phone number data attributes that help optimize the end user
 * verification process and evaluate risk.
 */
class PhoneIDClient extends RestClient {

    constructor(customerId,
                apiKey,
                restEndpoint = null,
                timeout = 15000,
                useragent = null,
                debug = false) {
        super(customerId, apiKey, restEndpoint, timeout, useragent, debug);
        this.phoneid_resource = "/v1/phoneid/";
    }

    /***
     * The PhoneID API provides a cleansed phone number, phone type, and telecom carrier
     * information to determine the best communication method - SMS or voice.
     *
     * See https://developer.telesign.com/docs/phoneid-api for detailed API documentation.
     *
     * @param callback: Callback method to handle response.
     * @param phone_number: Phone number to call
     * @param accountLifecycleEvent: (Optional) Indicates the phase in lifecycle for the
     * transaction.
     * @param originating_ip
     */
    getPhoneID(callback, phone_number, accountLifecycleEvent = null, originating_ip = null) {
        var params = {};
        if (originating_ip != null) {
            params.originating_ip = originating_ip;
        }
        if (accountLifecycleEvent != null) {
            params.account_lifecycle_event = accountLifecycleEvent;
        }

        this.execute(callback, "POST", this.phoneid_resource + encodeURI(phone_number), params);
    }
}

module.exports = PhoneIDClient;