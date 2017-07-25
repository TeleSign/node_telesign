TeleSign Node.js SDK
=================

TeleSign is a communications platform as a service (CPaaS) company, founded on security. Since 2005, TeleSign has
been a trusted partner to the world’s leading websites and mobile applications, helping secure billions of end-user
accounts. Today, TeleSign’s data-driven, cloud communications platform is changing the way businesses engage with
customers and prevent fraud.

For more information about TeleSign, visit our `website <http://www.TeleSign.com>`_.

Documentation
-------------

Code documentation is included in the SDK. Complete documentation, quick start guides and reference material
for the TeleSign API is available within the `TeleSign Developer Center <https://developer.telesign.com/>`_.

Installation
------------

To add the TeleSign Node.js SDK using NPM to your Node.js project:

```
npm install telesignsdk -save
```

If you have already cloned this SDK, you can using the following command
```
npm install ./path/to/sdk -save
```

Authentication
--------------

You will need a Customer ID and API Key in order to use TeleSign’s API. If you already have an account you can retrieve
them from your account dashboard within the `Portal <https://portal.telesign.com/login>`_. If you have not signed up
yet, sign up `here <https://portal.telesign.com/signup>`_.


Running Examples
----------------

Working examples are located in the examples folder. We recommend you start here

Sample Code
------------

After installing the SDK, begin by including the telesign SDK and declaring customerId, apiKey, rest_endpoint, and timeout variables. 

```javascript
    var TeleSignSDK = require('telesignsdk');
    var customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890"; // find in portal.telesign.com
    var apiKey = "EXAMPLE----TE8sTgg45yusumoN4BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw=="; 
    var rest_endpoint = "https://rest-api.telesign.com";
    var timeout = 10*1000; // 10 secs

    var telesign = new TeleSignSDK( customerId, 
                                    apiKey, 
                                    rest_endpoint,
                                    timeout // optional
                                  );
```

Example: Messaging (SMS) 
----------------------------------------

Here is an example to send an SMS

```javascript
    var phoneNumber = "12125555555"; // Your end user’s phone number, as a string of digits without spaces or punctuation, beginning with the country dialing code (for example, “1” for North America)
    var message = "You're scheduled for a dentist appointment at 2:30PM.";
    var messageType = "ARN"; // ARN = Alerts, Reminders, and Notifications; OTP = One time password; MKT = Marketing
    var reference_id = null; // need this to check status later

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
```

Here is how to check the status of your SMS (eg. has the SMS been delivered?)

```javascript
    telesign.sms.getMessageStatus(function(err, reply){ 
        console.log(reply);
    }, reference_id);   
```

Example: Voice Message 
-------------------------------------

The following code will make a phone call and wait 30 seconds and then check for status the phone call

```javascript
var callback_url = "http://www.mydomain.com/callback";
var voice = "f-en-IN" // Indian English - full list avail in REST docs ai developer.telesign.com
var message = "Hello from TeleSign!"; // contents of your SMS
var message_type = "ARN"; // // ARN = Alerts, Reminders, and Notifications; OTP = One time password; MKT = Marketing
var account_lifecycle_event = "create"; // see options in API docs at developer.telesign.com


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
```


Example: PhoneID (Metadata on phone number for fraud risk analysis)
-------------------------------------------------------------------

The following code will retreive metadata on a phone number using the PhoneID API

```javascript
var accountLifecycleEvent = "create";
telesign.phoneid.getPhoneID(function(err, reply){
        console.log(reply);
    },  mobile_number, 
    accountLifecycleEvent
    // originating_ip  // <optional>
);
```

Example: Score API (Metadata on phone number for fraud risk analysis)
---------------------------------------------------------------------

```javascript
var accountLifecycleEvent = "create";
telesign.score.getScore(function(err, reply){
        console.log(reply);
    },  mobile_number, 
    accountLifecycleEvent
    // originating_ip,  // OPTIONAL 
    // device_id,       // OPTIONAL
    // account_id       // OPTIONAL
);
```


Troubleshooting
---------------

* If you are using the trial account, make sure you understand it has some limitations. Use only the phone number you have verified. 
* If are unable to understand a field, make sure you look at the REST documentation located `here <https://developer.telesign.com/docs/>`_.