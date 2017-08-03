const telesign = require('../telesign_config');

const phoneNumber = "phone-number";
const message = "You're scheduled for a dentist appointment at 2:30PM.";
const messageType = "ARN";

console.log("## MessagingClient.sendMessage ##");

function message_callback(error, response_body) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${response_body['status']['code']}` +
            `, description: ${response_body['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}

telesign.sms.sendMessage(message_callback, phoneNumber, message, messageType);
