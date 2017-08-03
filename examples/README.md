TeleSign Node.js SDK Examples
=============================

**How to Run**

1. Edit file and replace values for API Key, Customer ID, and mobile_number
2. Run the file via : node filename.js

Example: You can run the 1_send_message.js with the following command

```
node examples/appverify/1_get_status_by_xid.js
```


Node Example
============

After installing the SDK, begin by including the telesign SDK and declaring customerId, apiKey, restEndpoint, and
timeout variables

```javascript
    var TeleSignSDK = require('telesignsdk');
    var customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890"; // find in portal.telesign.com
    var apiKey = "EXAMPLE----TE8sTgg45yusumoN4BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw==";
    var restEndpoint = "https://rest-api.telesign.com";
    var timeout = 10*1000; // 10 secs

```


Example: Messaging (SMS)
----------------------------------------

Here is an example to send an SMS

```javascript
    var phoneNumber = "12125555555"; // Your end user’s phone number, as a string of digits without spaces or
    punctuation, beginning with the country dialing code (for example, “1” for North America)
    var message = "You're scheduled for a dentist appointment at 2:30PM.";
    var messageType = "ARN"; // ARN = Alerts, Reminders, and Notifications; OTP = One time password; MKT = Marketing
    var referenceId = null;
    var accountLifecycleEvent = "create"

    var messaging = new TeleSignSDK.MessagingClient(customerID, apiKeys, restEndpoint, timeout);

    messaging.sendMessage(function(err, response) {
        if(err) {
            console.error(err); // network failure likely cause for error
        }
        else{
            console.log("YAY!, the SMS message is being sent now by TeleSign!");
            console.log(response);
            referenceId=response.referenceId; // save the referenceId to check status of the message
        }
    }, phoneNumber, message, messageType);
```

Here is how to check the status of your SMS

```javascript

    var messaging = new TeleSignSDK.MessagingClient(customerID, apiKeys, restEndpoint, timeout);

    messaging.getMessageStatus(function(err, statusResponse) {

        if(err) {
            console.error(err); // network failure likely cause for error
        }
        else{
            console.log(statusResponse);
        }
    }, referenceId); // notice, referenceId was returned when the message was sent
```


Example: Voice Message
-------------------------------------

The following code will make a phone call and wait 30 seconds and then check for status the phone call

```javascript
    var voice = new TeleSignSDK.VoiceClient(customerID, apiKeys, restEndpoint, timeout);
    var language = "en-GB" // British English - full list avail in REST docs ai developer.telesign.com
    var callbackURL = "http://www.mydomain.com/callback";
    var accountLifecycleEvent = "create"; // see options in API docs at developer.telesign.com

    voice.call(function(err, callResponse) {
        setTimeout(function() {
            voice.getCallStatus(function(err, statusResponse) {
                console.log(statusResponse);
            }, callResponse.referenceId)
        },30*1000); // wait 10 secs and see the status of the call
    },  phoneNumber,
        message,
        messageType,
        language, // optional param
        callbackURL, // optional param
        accountLifecycleEvent); // optional param

```


Example: PhoneID (Metadata on phone number for fraud risk analysis)
-------------------------------------------------------------------

The following code will retreive metadata on a phone number using the PhoneID API

```javascript
    var phoneid = new TeleSignSDK.PhoneIDClient(customerID, apiKeys, restEndpoint, timeout);
    var accountLifecycleEvent = "create"; // see options in API docs at developer.telesign.com
    var originatingIP = "203.0.113.45";

    phoneid.getPhoneID(function(err, phoneidResponse) {
        console.log(phoneidResponse);
    },
    phoneNumber,
    accountLifecycleEvent, // optional param
    originatingIP); // optional param
```


Example: Score API (Metadata on phone number for fraud risk analysis)
---------------------------------------------------------------------

```javascript
    var score = new TeleSignSDK.ScoreClient(customerID, apiKeys, restEndpoint, 10*1000);
    var accountLifecycleEvent = "create";
    score.getScore(function(err, response) {
        console.log(response);
    },  "13109991964",
        accountLifecycleEvent
        // originatingIP,   // optional param
        // deviceId,       // optional param
        // accountId       // optional param
    );

```


Further reading
---------------

For more documentation visit the `TeleSign Developer Center <https://developer.telesign.com/>`_.
