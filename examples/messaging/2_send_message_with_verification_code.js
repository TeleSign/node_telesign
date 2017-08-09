const readline = require('readline');
const telesign = require('../telesignClient');

const phoneNumber = "phone-number";
const messageType = "ARN";
const verifyCode = "32658";
const message = "Your code is " + verifyCode;

console.log("## MessagingClient.message ##");

function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to send message. " + error);
    }
}

telesign.sms.message(messageCallback, phoneNumber, message, messageType);

function prompt(question, callback) {
    const stdin = process.stdin,
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