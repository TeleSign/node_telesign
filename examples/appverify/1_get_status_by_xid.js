let telesign = require('../../src/main');
const CUSTOMER_ID = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const API_KEY = "EXAMPLE----TE8sTgg45yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";

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
appverify = new telesign.AppVerifyClient(CUSTOMER_ID, API_KEY);
appverify.getStatus(status_callback, EXTERNAL_ID);
