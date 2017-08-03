const telesign = require('../telesign_config');

const phoneNumber = "phone-number";
const phoneTypeVOIP = "5";

console.log("## PhoneIDClient.getPhoneID ##");

function message_callback(error, response_body) {
    if (error === null) {
        console.log(`PhoneID response for phone number: ${phoneNumber}`
            + ` => code: ${response_body['status']['code']}`
            + `, description: ${response_body['status']['description']}`);

        if (response_body['status']['code'] === 200) {
            if (response_body['phone_type']['code'] === phoneTypeVOIP) {
                console.log("Phone type in request is VOIP");
            } else {
                console.log("Phone type in request is not VOIP");
            }
        }
    } else {
        console.error("Unable to get PhoneID. " + error);
    }
}

telesign.phoneid.getPhoneID(message_callback, phoneNumber);
