TeleSign Node.js SDK
=================

TeleSign is a communications platform as a service (CPaaS) company, founded on security. Since 2005, TeleSign has
been a trusted partner to the world’s leading websites and mobile applications, helping secure billions of end-user
accounts. Today, TeleSign’s data-driven, cloud communications platform is changing the way businesses engage with
customers and prevent fraud.

For more information about TeleSign, visit our [website](http://www.TeleSign.com>).


Documentation
-------------

Code documentation is included in the SDK. Complete documentation, quick start guides and reference material
for the TeleSign API is available within the [TeleSign Developer Center](https://developer.telesign.com/).


Installation
------------

To add the TeleSign Node.js SDK using NPM to your Node.js project:

```
npm install telesignsdk -save
```

If you have already cloned this SDK, you can using the following command
```
npm install /path/to/sdk -save
```

Authentication
--------------

You will need a Customer ID and API Key in order to use TeleSign’s API. If you already have an account you can retrieve
them from your account dashboard within the [Portal](https://portal.telesign.com/login). If you have not signed up
yet, sign up [here](https://portal.telesign.com/signup).


Dependencies
------------

We make use of popular, feature-rich and well-tested open-source libraries to perform the underlying functionality of
the SDK. These dependencies are managed by the community accepted package manager. If you are unable to add these
additional third party dependencies to your project we have ensured that the SDK code is easy to read and can serve as
sample code. We have also made sure that more complicated functions such as generate_telesign_headers can be easily
extracted from the SDK and used 'as is' in your project.


Running Examples
----------------

Working examples are located in the /examples/ folder. We recommend you start here

Sample Code
-----------

After installing the SDK, begin by including the telesign SDK and declaring customerId, apiKey, restEndpoint, and
timeout variables.

```javascript
    var TeleSignSDK = require('telesignsdk');
    var customerId = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890"; // find in portal.telesign.com
    var apiKey = "EXAMPLE----TE8sTgg45yusumoN4BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw=="; 
    var restEndpoint = "https://rest-api.telesign.com";
    var timeout = 10*1000; // 10 secs

    var telesign = new TeleSignSDK( customerId,
                                    apiKey,
                                    restEndpoint,
                                    timeout // optional
                                  );
```

Example: Messaging (SMS) 
----------------------------------------

Here is an example to send an SMS

```javascript
    var phoneNumber = "12125555555"; // Your end user’s phone number, as a string of digits without spaces or
    punctuation, beginning with the country dialing code (for example, “1” for North America)
    var message = "You're scheduled for a dentist appointment at 2:30PM.";
    var messageType = "ARN"; // ARN = Alerts, Reminders, and Notifications; OTP = One time password; MKT = Marketing
    var referenceId = null; // need this to check status later

    telesign.sms.sendMessage(function(err, reply){
            if(err){
                console.log("Error: Could not reach TeleSign's servers");
                console.error(err); // network failure likely cause for error
            }
            else{
                console.log("YAY!, the SMS message is being sent now by TeleSign!");
                console.log(reply);
                referenceId=reply.reference_id; // save the reference_id to check status of the message
            }
        },
        phoneNumber,
        message,
        messageType
    );
```

Here is how to check the status of your SMS

```javascript

    telesign.sms.getMessageStatus(function(err, statusResponse) {

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

    var referenceId = null; // To be used to get call status later

    telesign.voice.call(function(err, callResponse) {
        if(err){
            console.log("Error: Could not reach TeleSign's servers");
            console.error(err); // network failure likely cause for error
        }
        else{
            console.log("YAY!, TeleSign is attempting to call the number provided!");
            console.log(callResponse);
            reference_id=callResponse.reference_id; // save the reference_id to check status of the message
        }
    },  phoneNumber,
        message,
        messageType,
        voice, // optional param - if null, it will select US English
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

    telesign.phoneid.getPhoneID(function(err, phoneidResponse) {
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

    telesign.score.getScore(function(err, response) {
        console.log(response);
    },  phoneNumber,
        accountLifecycleEvent
        // originatingIP,   // optional param
        // deviceId,       // optional param
        // accountId       // optional param
    );

```


Further reading
---------------

* If you are using the trial account, make sure you understand it has some limitations. Use only the phone number you have verified.
* The definitions of the parameters are best documented in the REST API documentation located [here](https://developer.telesign.com/docs/api-docs).
