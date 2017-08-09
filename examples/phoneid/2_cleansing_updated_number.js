const telesign = require('../telesignClient');

const phoneNumber = "phone-number";

console.log("## PhoneIDClient.phoneID ##");

function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`PhoneID response for phone number: ${phoneNumber} ` +
            `=> code: ${responseBody['status']['code']}, ` +
            `description: ${responseBody['status']['description']}`);

        if (responseBody['status']['code'] === 200) {
            const cc = responseBody['numbering']['cleansing']['call']['country_code'];
            const pn = responseBody['numbering']['cleansing']['call']['phone_number'];
            console.log("Cleansed phone number has country code $cc and phone number is $pn.")
        }
    } else {
        console.error("Unable to get PhoneID. $error");
    }
}

telesign.phoneid.phoneID(messageCallback, phoneNumber);
