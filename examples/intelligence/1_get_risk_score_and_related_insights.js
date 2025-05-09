const TeleSignSDK = require('../../dist/cjs/TeleSign');

const customerId = "your_customer_id_2XT08ZA8-CA-4892-8888-ABXCAA8"; // Your customer id. Ensure your account has access to Intelligence product.
const apiKey = "your_api_key"; // Your API key.
const rest_endpoint = "https://detect.telesign.com";
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

const phoneNumber = "15555551212";
const requestBody = {
    "contact_details": {"email": "ghopper@gmail.com", "phone_number": phoneNumber},
    "external_id": "REG432538",
    "account_lifecycle_event": "create",
    "ip": "1.1.1.1",
    "device_id": "2e4fa042234d",
}

console.log("Intelligence example");

function intelligence_callback(error, response_body) {
    try {
        if (error === null) {
            console.log(
                `Phone number ${response_body['phone_details']['numbering']['original']['phone_number']} `
                + `has a ${response_body['risk']['level']} risk level `
                + `and the score is ${response_body['risk']['score']}.` +
                ` \n => status code: ${response_body['status']['code']}`
            );
        } else {
            console.error("Unable to get insights. " + error);
        }
    } catch (e) {
        console.log(`Response: ${JSON.stringify(response_body, null, 4)}`);
    }
}

client.intelligence.intelligence(intelligence_callback, requestBody);
