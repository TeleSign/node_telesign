const telesign = require('../telesignClient');

const phoneNumber = "phone-number";
const message = "You're scheduled for a dentist appointment at 2:30PM.";
const messageType = "ARN";


console.log("## VoiceClient.call ##");

function voiceCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}

telesign.voice.call(voiceCallback, phoneNumber, message, messageType);
