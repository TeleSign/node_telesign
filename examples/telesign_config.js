// note change this to the following if copied outside examples folder: require('telesignsdk);
const TeleSignSDK = require('../src/TeleSign');
//var TeleSignSDK = require('telesignsdk');

const customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890"; // Todo: find in portal.telesign.com
const apiKey = "EXAMPLE----TE8sTgg45yusumoN4BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw=="; // Todo: find in portal.telesign.com
const rest_endpoint = "https://rest-api.telesign.com"; // Todo: Enterprise customer, change this!
const timeout = 10*1000; // 10 secs

const client = new TeleSignSDK( customerId,
    apiKey,
    rest_endpoint,
    timeout // optional
    // userAgent
);

module.exports = client;