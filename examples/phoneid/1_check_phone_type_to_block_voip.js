const telesign = require('../telesignClient');

const phoneNumber = "phone-number";
const phoneTypeVOIP = "5";

console.log("## PhoneIDClient.phoneID ##");

function messageCallback(error, responseBody) {
    if (error === null) {
        console.log(`PhoneID response for phone number: ${phoneNumber}`
            + ` => code: ${responseBody['status']['code']}`
            + `, description: ${responseBody['status']['description']}`);

        if (responseBody['status']['code'] === 200) {
            if (responseBody['phone_type']['code'] === phoneTypeVOIP) {
                console.log("Phone type in request is VOIP");
            } else {
                console.log("Phone type in request is not VOIP");
            }
        }
    } else {
        console.error("Unable to get PhoneID. " + error);
    }
}

telesign.phoneid.phoneID(messageCallback, phoneNumber);
