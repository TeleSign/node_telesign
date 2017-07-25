var TeleSignSDK = require('../src/TeleSign');
//var TeleSignSDK = require('telesignsdk'); // note: uncomment this if SDK is installed via npm


var customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890"; // Todo: find in portal.telesign.com
var apiKey = "EXAMPLE----TE8sTgg45yusumoN4BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw=="; // Todo: find in portal.telesign.com
var rest_endpoint = "https://rest-api.telesign.com"; // Todo: Enterprise customer, change this!
var mobile_number = "12125555555"; //  Your end user’s phone number, as a string of digits without spaces or punctuation, beginning with the country dialing code (for example, “1” for North America)

var timeout = 10*1000; // 10 secs


var message = "Hello from TeleSign!"; // contents of your SMS
var message_type = "ARN"; // // ARN = Alerts, Reminders, and Notifications; OTP = One time password; MKT = Marketing


var telesign = new TeleSignSDK( customerId, 
                                apiKey, 
                                rest_endpoint,
                                timeout // optional
                                // userAgent,
                            );
var reference_id = null;


// Send the SMS
telesign.sms.sendMessage(function(err, reply){    
        if(err){
            console.log("Error: Could not reach TeleSign's servers");
            console.error(err); // network failure likely cause for error
        }
        else{
            console.log("YAY!, the SMS message is being sent now by TeleSign!");
            console.log(reply);
            reference_id=reply.reference_id; // save the reference_id to check status of the message 
        }
    },  
    mobile_number, 
    message, 
    message_type
);


// let's wait 20 secs and then check the status of our SMS
setTimeout(function() {
    telesign.sms.getMessageStatus(function(err, reply){ 
        console.log(reply);
    }, 
    reference_id // obtained earlier from inside the sendMessage function 
    );   
}, 5*1000);
