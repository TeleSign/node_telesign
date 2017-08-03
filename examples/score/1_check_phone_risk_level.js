const telesign = require('../telesign_config');

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

telesign.score.getScore(score_callback, phoneNumber, accountLifeCycleEvent);
