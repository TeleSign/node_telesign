let telesign = require('../../src/main');

const CUSTOMER_ID = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const API_KEY = "EXAMPLE----TE8sTgg45yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";

const phoneNumber = "phone-number";
const phoneTypeVOIP = "5";

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

data = new telesign.PhoneIDClient(CUSTOMER_ID, API_KEY);
data.getPhoneID(message_callback, phoneNumber);
