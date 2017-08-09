const telesign = require('../telesignClient');

const phoneNumber = "phone-number";
const accountLifeCycleEvent = "create";

console.log("## ScoreClient.score ##");

function score_callback(error, response_body) {
    if (error === null) {
        console.log(`Score response for phone number: ${phoneNumber}` +
            ` => code: ${response_body['status']['code']}` +
            `, description: ${response_body['status']['description']}`);
    } else {
        console.error("Unable to get score. " + error);
    }
}

telesign.score.score(score_callback, phoneNumber, accountLifeCycleEvent);
