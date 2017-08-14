// note change this to the following if using npm package: require('telesignsdk);
const TeleSignSDK = require('../../src/TeleSign');
//var TeleSignSDK = require('telesignsdk');

const customerId = "440813A2-1F7E-11E1-B760-000000000000"; // Todo: find in portal.telesign.com
const apiKey = "yVG2pGeuyRXKgb8tt97Hr210FWE4c+WukHVWsNon914dQo4FTrZzxoLePeKCz27WhrSzmQncXjTvZ6U+0wGZeQ=="; // Todo: find in portal.telesign.com
const rest_endpoint = "https://rest-api.telesign.com"; // Todo: Enterprise customer, change this!
const timeout = 10*1000; // 10 secs
const EXTERNAL_ID = "external_id";

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

function statusCallback(error, responseBody) {
    if (error === null) {
        console.log(`App verify transaction for External ID: ${EXTERNAL_ID}` +
            ` => code: ${responseBody['status']['code']}` +
            `, description: ${responseBody['status']['description']}`);
    } else {
        console.error("Unable to perform status for the given externalID. " + error);
    }
}

console.log("## AppVerifyClient.status ##");

client.appverify.status(statusCallback, EXTERNAL_ID);
