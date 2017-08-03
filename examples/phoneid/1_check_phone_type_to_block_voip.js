let telesign = require('../../src/main');

const CUSTOMER_ID = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const API_KEY = "EXAMPLE----TE8sTgg45yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";

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

data = new telesign.PhoneIDClient(CUSTOMER_ID, API_KEY);
data.getPhoneID(message_callback, phoneNumber);
