let telesign = require('../../src/main');

const CUSTOMER_ID = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const API_KEY = "EXAMPLE----TE8sTgg45yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";

const phoneNumber = "phone-number";
const message = "You're scheduled for a dentist appointment at 2:30PM.";
const messageType = "ARN";


console.log("## MessagingClient.sendMessage ##");

function voice_callback(error, response_body) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${response_body['status']['code']}` +
            `, description: ${response_body['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}

voice = new telesign.VoiceClient(CUSTOMER_ID, API_KEY);
voice.call(voice_callback, phoneNumber, message, messageType);
