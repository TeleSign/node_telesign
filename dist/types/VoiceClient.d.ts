/***
 * TeleSign's Voice API allows you to easily send voice messages. You can send alerts,
 * reminders, and notifications, or you can send verification messages containing time-based,
 * one-time passcodes (TOTP).
 */
export default class VoiceClient extends RestClient {
    constructor(requestWrapper: any, customerId: any, apiKey: any, restEndpoint?: any, timeout?: number, useragent?: any);
    voice_resource: string;
    voice_status_resource: string;
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
    call(callback: any, phoneNumber: any, message: any, messageType: any, voice?: any, callbackURL?: any, accountLifecycleEvent?: any, originatingIP?: any): void;
    /***
     * Get status of voice call transaction.
     *
     * @param callback: Callback method to handle the response.
     * @param referenceId: Reference ID received in the response of call.
     */
    status(callback: any, referenceId: any): void;
}
import RestClient from './RestClient';
