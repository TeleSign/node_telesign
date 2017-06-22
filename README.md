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


Authentication
--------------

You will need a Customer ID and API Key in order to use TeleSign’s API. If you already have an account you can retrieve
them from your account dashboard within the `Portal <https://portal.telesign.com/login>`_. If you have not signed up
yet, sign up `here <https://portal.telesign.com/signup>`_.


Node Example
------------

After installing the SDK, begin by including the telesign SDK and declaring customerId, apiKey, rest_endpoint, and timeout variables

```javascript
    var TeleSignSDK = require('telesignsdk');
    var customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890"; // find in portal.telesign.com
    var apiKey = "EXAMPLE----TE8sTgg45yusumoN4BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw=="; 
    var rest_endpoint = "https://rest-api.telesign.com";
    var timeout = 10*1000; // 10 secs

```

Example: Messaging (SMS) 
----------------------------------------

Here is an example to send an SMS

```javascript
    var phoneNumber = "12125555555"; // Your end user’s phone number, as a string of digits without spaces or punctuation, beginning with the country dialing code (for example, “1” for North America)
    var message = "You're scheduled for a dentist appointment at 2:30PM.";
    var messageType = "ARN"; // ARN = Alerts, Reminders, and Notifications; OTP = One time password; MKT = Marketing
    var reference_id = null;

    var messaging = new TeleSignSDK.MessagingClient(customerID, apiKeys, rest_endpoint, timeout);

    messaging.sendMessage(function(err, reply){    
        if(err){
            console.error(err); // network failure likely cause for error
        }
        else{
            console.log("YAY!, the SMS message is being sent now by TeleSign!");
            console.log(reply);
            reference_id=reply.reference_id; // save the reference_id to check status of the message 
        }
    }, phoneNumber, message, messageType);
```

Here is how to check the status of your SMS

```javascript

    var messaging = new TeleSignSDK.MessagingClient(customerID, apiKeys, rest_endpoint, timeout);

    messaging.getMessageStatus(function(err, statusreply){

        if(err){
            console.error(err); // network failure likely cause for error
        }
        else{
            console.log(reply);
        }
    }, reference_id); // notice, reference_id was returned when the message was sent
```

Example: Voice Message 
-------------------------------------

The following code will make a phone call and wait 30 seconds and then check for status the phone call

```javascript
    var voice = new TeleSignSDK.VoiceClient(customerID, apiKeys, rest_endpoint, timeout);
    var language = "en-GB" // British English - full list avail in REST docs ai developer.telesign.com
    var callback_url = "http://www.mydomain.com/callback";
    var account_lifecycle_event = "create"; // see options in API docs at developer.telesign.com

    voice.call(function(err, call_reply){
        setTimeout(function(){
            voice.getCallStatus(function(err, statusreply){
                console.log(statusreply);
            }, call_reply.reference_id)
        },30*1000); // wait 10 secs and see the status of the call
    },  phoneNumber, 
        message, 
        messageType, 
        language, // optional param
        callback_url, // optional param
        account_lifecycle_event); // optional param

```


Example: PhoneID (Metadata on phone number for fraud risk analysis)
-------------------------------------------------------------------

The following code will retreive metadata on a phone number using the PhoneID API

```javascript
    var phoneid = new TeleSignSDK.PhoneIDClient(customerID, apiKeys, rest_endpoint, timeout);
    var account_lifecycle_event = "create"; // see options in API docs at developer.telesign.com
    var originating_ip = "203.0.113.45";

    phoneid.getPhoneID(function(err, reply){
        console.log(reply);
    }, 
    phoneNumber,
    account_lifecycle_event, // optional param
    originating_ip); // optional param
```

Example: Score API (Metadata on phone number for fraud risk analysis)
---------------------------------------------------------------------

```javascript
    var score = new TeleSignSDK.ScoreClient(customerID, apiKeys, rest_endpoint, 10*1000);
    var accountLifecycleEvent = "create";
    score.getScore(function(err, reply){
        console.log(reply);
    },  "13109991964", 
        accountLifecycleEvent
        // originating_ip,  // OPTIONAL PARAM
        // device_id,       // OPTIONAL PARAM
        // account_id       // OPTIONAL PARAM
    );

```


Troubleshooting
---------------

* Make sure you are NOT using the trial account as it has limitations
