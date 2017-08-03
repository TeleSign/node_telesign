const telesign = require('../telesign_config');

const EXTERNAL_ID = "external_id";

function status_callback(error, response_body) {
    if (error === null) {
        console.log(`App verify transaction for External ID: ${EXTERNAL_ID}` +
            ` => code: ${response_body['status']['code']}` +
            `, description: ${response_body['status']['description']}`);
    } else {
        console.error("Unable to perform getStatus for the given externalID. " + error);
    }
}

console.log("## AppVerifyClient.getStatus ##");

telesign.appverify.getStatus(status_callback, EXTERNAL_ID);
