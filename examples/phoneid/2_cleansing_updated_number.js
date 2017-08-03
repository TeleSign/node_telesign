const telesign = require('../telesign_config');

const phoneNumber = "phone-number";

console.log("## PhoneIDClient.getPhoneID ##");

function message_callback(error, response_body) {
    if (error === null) {
        console.log(`PhoneID response for phone number: ${phoneNumber} ` +
            `=> code: ${response_body['status']['code']}, ` +
            `description: ${response_body['status']['description']}`);

        if (response_body['status']['code'] === 200) {
            const cc = response_body['numbering']['cleansing']['call']['country_code'];
            const pn = response_body['numbering']['cleansing']['call']['phone_number'];
            console.log("Cleansed phone number has country code $cc and phone number is $pn.")
        }
    } else {
        console.error("Unable to get PhoneID. $error");
    }
}

telesign.phoneid.getPhoneID(message_callback, phoneNumber);
