let telesign = require('../../src/main');

const CUSTOMER_ID = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const API_KEY = "EXAMPLE----TE8sTgg45yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";

const phoneNumber = "phone-number";
const messageType = "ARN";
const verifyCode = "32658";
const message = "Your code is " + verifyCode;

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

function prompt(question, callback) {
    let stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

prompt('Enter the verification code received:\n', function (input) {
    if (input === verifyCode) {
        console.log('Your code is correct.');
    } else {
        console.log('Your code is incorrect. input: ' + input + ", code: " + verifyCode);
    }
    process.exit();
});