/***
 * TeleSign's Messaging API allows you to easily send SMS messages. You can send alerts,
 * reminders, and notifications, or you can send verification messages containing
 * one-time passcodes ( OTP ).
 */
export default class MessagingClient extends RestClient {
    constructor(requestWrapper: any, customerId: any, apiKey: any, restEndpoint?: any, timeout?: number, userAgent?: any);
    messaging_resource: string;
    messaging_status_resource: string;
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
    message(callback: any, phoneNumber: any, message: any, messageType: any): void;
    /***
     * Get status of message transaction.
     *
     * @param callback: Callback method to handle the response.
     * @param referenceId: Reference ID received in the response of message.
     */
    status(callback: any, referenceId: any): void;
}
import RestClient from './RestClient';
