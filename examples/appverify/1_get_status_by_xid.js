const telesign = require('../telesignClient');

const EXTERNAL_ID = "external_id";

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

telesign.appverify.status(statusCallback, EXTERNAL_ID);
