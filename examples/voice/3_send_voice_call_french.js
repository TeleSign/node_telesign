const telesign = require('../telesignClient');

const phoneNumber = "phone-number";
const message = "N'oubliez pas d'appeler votre mère pour son anniversaire demain.";
const messageType = "ARN";
const languageCode = "f-FR-fr";

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

telesign.voice.call(voiceCallback, phoneNumber, message, messageType, voice=languageCode);
