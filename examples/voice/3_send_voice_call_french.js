const telesign = require('../telesign_config');

const phoneNumber = "phone-number";
const message = "N'oubliez pas d'appeler votre mère pour son anniversaire demain.";
const messageType = "ARN";
const languageCode = "f-FR-fr";

console.log("## VoiceClient.call ##");

function voice_callback(error, response_body) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${response_body['status']['code']}` +
            `, description: ${response_body['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}

telesign.voice.call(voice_callback, phoneNumber, message, messageType, voice=languageCode);
