# node-bandwidth

[![Build](https://travis-ci.org/bandwidthcom/node-bandwidth.png?branch=master)](https://travis-ci.org/bandwidthcom/node-bandwidth)

Node Client library for [Bandwidth's App Platform](http://ap.bandwidth.com/?utm_medium=social&utm_source=github&utm_campaign=dtolb&utm_content=)


With node-bandwidth  you have access to the entire set of API methods including:
* **Account** - get user's account data and transactions,
* **Application** - manage user's applications,
* **AvailableNumber** - search free local or toll-free phone numbers,
* **Bridge** - control bridges between calls,
* **Call** - get access to user's calls,
* **Conference** - manage user's conferences,
* **ConferenceMember** - make actions with conference members,
* **Domain** - get access to user's domains,
* **EntryPoint** - control of endpoints of domains,
* **Error** - list of errors,
* **Media** - list, upload and download files to Bandwidth API server,
* **Message** - send SMS/MMS, list messages,
* **NumberInfo** - receive CNUM info by phone number,
* **PhoneNumber** - get access to user's phone numbers,
* **Recording** - mamange user's recordings.

Also you can work with Bandwidth XML using special types (in object `xml`).
## Install

Run

```
npm install node-bandwidth
```
## Getting Started

* Install `node-bandwidth`,
* **Get user id, api token and secret** - to use the Catapult API you need these data.  You can get them [here](https://catapult.inetwork.com/pages/catapult.jsf) on the tab "Account",
* **Set user id, api token and secret** - you can do that with 2 ways:

```js
var catapult = require("node-bandwidth");

//Using client directly
var client = new catapult.Client("userId", "apiToken", "apiSecret");

//Or you can use default client instance.
//Do that only once
catapult.Client.globalOptions.apiToken = "token";
catapult.Client.globalOptions.apiSecret = "secret";
catapult.Client.globalOptions.userId = "userId";


```
## Usage

All "static" functions support 2 ways to be called: with client instance as first arg or without client instance (default client instance will be used then)

```js
var catapult = require("node-bandwidth");

//Using client directly
var client = new catapult.Client("userId", "apiToken", "apiSecret");
catapult.Call.list(client, {page: 1}, function(err, calls){...});

//Or you can use default client instance.
//You should set up its global options before using of api functions.

catapult.Call.list({page: 1}, function(err, calls){
  //Default client will be used to do this calls
});

```
Read [Catapult Api documentation](http://ap.bandwidth.com/) for more details

## Examples
*All examples assume you have already setup your auth data!*

List all calls from special number

```js
  catapult.Call.list({from: "+19195551212"}, function(err, list) {...});
```

List all received messages

```js
  catapult.Message.list({state: "received"}, function(err, list){...});
```

Send SMS

```js
  catapult.Message.create({from: "+19195551212", to: "+191955512142", text: "Test"}, function(err, message){...});
```


Send some SMSes

```js
  catapult.Message.create([{from: "+19195551212", to: "+191955512142", text: "Test"}, {from: "+19195551212", to: "+191955512143", text: "Test2"}], function(err, statuses){...});
```

Upload file

```js
  catapult.Media.upload("avatar.png", "/local/path/to/file.png", "image/png", function(err){...});
```

Make a call

```js
  catapult.Call.create({from: "+19195551212", to: "+191955512142"}, function(err, call){...});
```

Reject incoming call

```js
  call.rejectIncoming(function(err){...});
```

Create a gather
```js
  call.createGather({maxDigits: 3, interDigitTimeout: 5, prompt: {sentence: "Please enter 3 digits"}}, function(err, gather){...});
```

Start a conference
```js
  catapult.Conference.create({from: "+19195551212"}, function(err, conference){...});
```

Add a member to the conference

```js
  conference.createMember({callId => "id_of_call_to_add_to_this_conference", joinTone: true, leavingTone: true}, function(err, member){...})
```


Connect 2 calls to a bridge

```js
  catapult.Bridge.create({callIds: [callId1, callId2]}, function(err, bridge){...});
```

Search available local numbers to buy

```js
  catapult.AvailableNumber.searchLocal({state: "NC", city: "Cary"}, function(err, numbers){...});
```
Get CNAM info for a number

```js
  catapult.NumberInfo.get("+19195551212", function(err, info){...});
```

Buy a phone number

```js
  catapult.PhoneNumber.create({number: "+19195551212"}, function(err, phoneNumber){...});
```

List recordings

```js
  catapult.Recording.list(function(err, list){...});
```

Generate Bandwidth XML
```js
   var xml = require("bandwidth").xml;
   var response = new xml.Response();
   var speakSentence = new xml.SpeakSentence({sentence: "Transferring your call, please wait.", voice: "paul", gender: "male", locale: "en_US"});
   var transfer = new xml.Transfer({
        transferTo: "+13032218749",
        transferCallerId: "private",
        speakSentence: {
            sentence: "Inner speak sentence.",
            voice: "paul",
            gender: "male",
            locale: "en_US"
        }
    });
    var hangup = new xml.Hangup();

    response.push(speakSentence);
    response.push(transfer);
    response.push(hangup);

    //as alternative we can pass list of verbs to constructor of Response
    //response = new xml.Response([speakSentence, transfer, hangup]);

    console.log(response.toXml());
```

See directory `samples` for more examples.
See [node-bandwidth-example](https://github.com/bandwidthcom/node-bandwidth-example) for more complex examples of using this module.

# Bugs/Issues
Please open an issue in this repository and we'll handle it directly. If you have any questions please contact us at openapi@bandwidth.com.
