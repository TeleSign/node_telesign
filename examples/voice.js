var TeleSignSDK = require('../src/TeleSign');

// var TeleSignSDK = require('telesignsdk'); // note change this to the following if copied outside examples folder: require('telesignsdk);

var customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890"; // Todo: find in portal.telesign.com
var apiKey = "EXAMPLE----TE8sTgg45yusumoN4BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw=="; // Todo: find in portal.telesign.com
var rest_endpoint = "https://rest-api.telesign.com"; // Todo: Enterprise customer, change this!
var mobile_number = "12125555555"; //  Your end user’s phone number, as a string of digits without spaces or punctuation, beginning with the country dialing code (for example, “1” for North America)

var timeout = 10*1000; // 10 secs

var callback_url = "http://www.mydomain.com/callback";
var voice = "f-en-IN" // Indian English - full list avail in REST docs ai developer.telesign.com
var message = "Hello from TeleSign!"; // contents of your SMS
var message_type = "ARN"; // // ARN = Alerts, Reminders, and Notifications; OTP = One time password; MKT = Marketing
var account_lifecycle_event = "create"; // see options in API docs at developer.telesign.com


var telesign = new TeleSignSDK( customerId, 
                                apiKey, 
                                rest_endpoint,
                                timeout // optional
                                // userAgent,
                            );
var reference_id = null;


// Send the SMS
telesign.voice.call(function(err, call_reply){    
        if(err){
            console.log("Error: Could not reach TeleSign's servers");
            console.error(err); // network failure likely cause for error
        }
        else{
            console.log("YAY!, TeleSign is attempting to call the number provided!");
            console.log(call_reply);
            reference_id=call_reply.reference_id; // save the reference_id to check status of the message 
        }
    },  
    mobile_number, 
    message, 
    message_type,
    voice, // optional param - if null, it will select US English
    callback_url, // optional param
    account_lifecycle_event // optional param
);


setTimeout(function() {
    telesign.voice.getCallStatus(function(err, reply){ 
            console.log(reply);
        }, 
        reference_id // note: this was returned when the message was sent
    );   
}, 30*1000);
