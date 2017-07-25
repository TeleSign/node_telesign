//var TeleSignSDK = require('../src/TeleSign'); // note change this to the following if copied outside examples folder: require('telesignsdk);
var TeleSignSDK = require('telesignsdk'); // note change this to the following if copied outside examples folder: require('telesignsdk);

var customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890"; // Todo: find in portal.telesign.com
var apiKey = "EXAMPLE----TE8sTgg45yusumoN4BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw=="; // Todo: find in portal.telesign.com
var rest_endpoint = "https://rest-api.telesign.com"; // Todo: Enterprise customer, change this!
var mobile_number = "12067093100"; //  Your end user’s phone number, as a string of digits without spaces or punctuation, beginning with the country dialing code (for example, “1” for North America)

var timeout = 10*1000; // 10 secs

var telesign = new TeleSignSDK( customerId, 
                                apiKey, 
                                rest_endpoint,
                                timeout // optional
                                // userAgent,
                            );

var accountLifecycleEvent = "create";
telesign.phoneid.getPhoneID(function(err, reply){
        console.log(reply);
    },  mobile_number, 
    accountLifecycleEvent
    // originating_ip  // <optional>
);