const RestClient = require('./RestClient.js');

/***
 * ScoreClient for TeleSign Intelligence Cloud.
 * Supports POST /intelligence/phone endpoint(Cloud migration).
 */
class ScoreClient extends RestClient {
  constructor(requestWrapper,
              customerId,
              apiKey,
              restEndpoint = "https://detect.telesign.com",
              timeout = 15000,
              userAgent = null) {
    super(requestWrapper, customerId, apiKey, restEndpoint, timeout, userAgent);
    this.scoreResource = "/intelligence/phone";
    this.setContentType("application/x-www-form-urlencoded");
  }
/**
* Obtain a risk recommendation for a phone number using Telesign Intelligence Cloud API.
*
* @param callback Callback handling the response
* @param phoneNumber Phone number to check (digits-only E.164 format)
* @param accountLifecycleEvent Required lifecycle event string: 'create', 'sign-in', etc.
* @param options Optional object for additional parameters:
*    accountId, deviceId, emailAddress, externalId, originatingIp, etc.
*/
  score(callback,
        phoneNumber,
        accountLifecycleEvent,
        options = {}) {
    const params = {
      phone_number: phoneNumber,
      account_lifecycle_event: accountLifecycleEvent,
      ...(options.accountId && { account_id: options.accountId }),
      ...(options.deviceId && { device_id: options.deviceId }),
      ...(options.emailAddress && { email_address: options.emailAddress }),
      ...(options.externalId && { external_id: options.externalId }),
      ...(options.originatingIp && { originating_ip: options.originatingIp }),
    };

    this.execute(callback, "POST", this.scoreResource, params);
  }
          
}
        
module.exports = ScoreClient;
