let telesign = require('../../src/main');

const CUSTOMER_ID = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const API_KEY = "EXAMPLE----TE8sTgg45yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";

const phoneNumber = "phone-number";
const accountLifeCycleEvent = "create";


console.log("## ScoreClient.getScore ##");

function score_callback(error, response_body) {
    if (error === null) {
        console.log(`Score response for phone number: ${phoneNumber}` +
            ` => code: ${response_body['status']['code']}` +
            `, description: ${response_body['status']['description']}`);
    } else {
        console.error("Unable to get score. " + error);
    }
}

data = new telesign.ScoreClient(CUSTOMER_ID, API_KEY);
data.getScore(score_callback, phoneNumber, accountLifeCycleEvent);
