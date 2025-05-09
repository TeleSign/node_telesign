import RestClient from "./RestClient";

/***
 * TeleSign's Voice API allows you to easily send voice messages. You can send alerts,
 * reminders, and notifications, or you can send verification messages containing time-based,
 * one-time passcodes (TOTP).
 */
export default class VoiceClient extends RestClient {
  constructor(requestWrapper, customerId, apiKey) {
    var restEndpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15000;
    var useragent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    super(requestWrapper, customerId, apiKey, restEndpoint, timeout, useragent);
    this.voice_resource = "/v1/voice";
    this.voice_status_resource = "/v1/voice/";
  }

  /***
   * Send a voice callto the target phoneNumber.
   *
   * See https://developer.telesign.com/docs/voice-api for detailed API documentation.
   *
   * @param callback: Callback method to handle response.
   * @param phoneNumber: Phone number to call
   * @param message: Text of the message to be converted to voice on call to the end
   * user. [max 2000 code points]
   * @param messageType: This parameter specifies the traffic type being sent in the message.
   * @param voice: The voice parameter allows you to specify a voice to be used to speak your
   * text to speech message.
   * @param callbackURL: (Optional) URL of the callback server you would like to receive updates
   * on.
   * @param accountLifecycleEvent: (Optional) Indicates the phase in lifecycle for the
   * transaction.
   * @param originatingIP: (Optional) End user's IP address.
   */
  call(callback, phoneNumber, message, messageType) {
    var voice = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var callbackURL = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    var accountLifecycleEvent = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
    var originatingIP = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
    var params = {
      phone_number: phoneNumber,
      message: message,
      message_type: messageType
    };
    if (voice != null) {
      params.voice = voice;
    }
    if (callbackURL != null) {
      params.callbackURL = callbackURL;
    }
    if (accountLifecycleEvent != null) {
      params.account_lifecycle_event = accountLifecycleEvent;
    }
    if (originatingIP != null) {
      params.originating_ip = originatingIP;
    }
    this.execute(callback, "POST", this.voice_resource, params);
  }

  /***
   * Get status of voice call transaction.
   *
   * @param callback: Callback method to handle the response.
   * @param referenceId: Reference ID received in the response of call.
   */
  status(callback, referenceId) {
    var status_resource = this.voice_status_resource + referenceId;
    this.execute(callback, "GET", status_resource);
  }
}