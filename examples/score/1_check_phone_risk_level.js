const TeleSignSDK = require('../../src/TeleSign');

const customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890";
const apiKey = "ABC12345yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";
const detectEndpoint = "https://detect.telesign.com";
const timeout = 10*1000;

const client = new TeleSignSDK(customerId, apiKey, detectEndpoint, timeout);

const phoneNumber = "11234567890";
const accountLifecycleEvent = "create";  

console.log("## ScoreClient.score ##");

function score_callback(error, response_body) {
  if (error === null) {
    console.log(`Score response for phone number: ${phoneNumber} => code: ${response_body['status']['code']}, description: ${response_body['status']['description']}`);

    if (response_body['status']['code'] === 300) {
      const riskLevel = response_body.risk?.level || "unknown";
      const recommendation = response_body.risk?.recommendation || "no recommendation";
      console.log(`SUCCESS! Phone number ${phoneNumber} risk level: ${riskLevel}, recommendation: ${recommendation}`);
      
      console.log("Full response:", JSON.stringify(response_body, null, 2));
    } else if (response_body['status']['code'] === 301) {
      console.log("PARTIAL SUCCESS - Some data available:", JSON.stringify(response_body, null, 2));
    }
  } else {
    console.error("Unable to get score. Error:", error);
  }
}

client.score.score(score_callback, phoneNumber, accountLifecycleEvent, {
  accountId: "account-123",
  deviceId: "device-456",
  emailAddress: "user@example.com",
  externalId: "external-789",
  originatingIp: "192.0.2.1"
});