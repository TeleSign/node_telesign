import RestClient from "./RestClient";

/***
 * TeleSign's Messaging API allows you to easily send SMS messages. You can send alerts,
 * reminders, and notifications, or you can send verification messages containing
 * one-time passcodes ( OTP ).
 */
export default class MessagingClient extends RestClient {
  constructor(requestWrapper, customerId, apiKey) {
    var restEndpoint = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var timeout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 15000;
    var userAgent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    super(requestWrapper, customerId, apiKey, restEndpoint, timeout, userAgent);
    this.messaging_resource = "/v1/messaging";
    this.messaging_status_resource = "/v1/messaging/";
  }

  /***
   * Send a message to the target phoneNumber.
   *
   * See https://developer.telesign.com/docs/messaging-api for detailed API documentation.
   *
   * @param callback: Callback method to handle response.
   * @param phoneNumber: Phone number to call
   * @param message: Text of the message to be sent to the end user.
   * @param messageType: This parameter specifies the traffic type being sent in the message.
   * transaction.
   */
  message(callback, phoneNumber, message, messageType) {
    var params = {
      phone_number: phoneNumber,
      message: message,
      message_type: messageType
    };
    this.execute(callback, "POST", this.messaging_resource, params);
  }

  /***
   * Get status of message transaction.
   *
   * @param callback: Callback method to handle the response.
   * @param referenceId: Reference ID received in the response of message.
   */
  status(callback, referenceId) {
    this.execute(callback, "GET", this.messaging_status_resource + referenceId, null);
  }
}