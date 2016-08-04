# node-bandwidth

A Node.js client library for the Bandwidth Application Platform

v2.0 Is released

For version 1.3.3 check [here](https://github.com/bandwidthcom/node-bandwidth/tree/v1.3.3)


## [Full API Reference](docs/api.md)
For the full API Reference, please see [docs/api.md](docs/api.md).

## Installing the developer preview

	npm install --save node-bandwidth

## Client initialization

All interaction with the API is done through a `client` Object. The client constructor takes an Object containing configuration options. The following options are supported:

| Field name  | Description           | Default value                       | Required |
|-------------|-----------------------|-------------------------------------|----------|
| `userId`    | Your Catapult user ID | `undefined`                         | Yes      |
| `apiToken`  | Your API token        | `undefined`                         | Yes      |
| `apiSecret` | Your API secret       | `undefined`                         | Yes      |
| `baseUrl`   | The Catapult API URL  | `https://api.catapult.inetwork.com` | No       |

To initialize the client object, provide your API credentials which can be found on your account page in [the portal](https://catapult.inetwork.com/pages/catapult.jsf).

```javascript
var CatapultClient = require("node-bandwidth");

var client = new CatapultClient({
	userId    : "YOUR_USER_ID", // <-- note, this is not the same as the username you used to login to the portal
	apiToken  : "YOUR_API_TOKEN",
	apiSecret : "YOUR_API_SECRET"
});
```

Your `client` object is now ready to use the API.

## Callbacks or Promises
All functions of the client object take an optional Node.js style `(err, result)` callback, and also return a Promise. That way if you want to use Promises in your application, you don't have to wrap the SDK with a Promise library. You can simply do things like this:

### Promise style
```javascript
client.Message.send({
	from : "+12345678901", // This must be a Catapult number on your account
	to   : "+12345678902",
	text : "Hello world."
})
.then(function(message) {
	console.log("Message sent with ID " + message.id);
})
.catch(function(err) {
	console.log(err.message);
});
```
If you're not into that kind of thing you can also do things the "old fashioned" callback way:

### Callback style
```javascript
client.Message.send({
	from : "+12345678901", // This must be a Catapult number on your account
	to   : "+12345678902",
	text : "Hello world."
}, function(err, message) {
	if (err) {
		console.log(err);
		return;
	}
	console.log("Message sent with ID " + message.id);
});
```

## Rest API Coverage
------------
* [Account](http://ap.bandwidth.com/docs/rest-api/account/)
    * [X] Information
    * [X] Transactions
* [Applications](http://ap.bandwidth.com/docs/rest-api/applications/)
    * [X] List
    * [X] Create
    * [X] Get info
    * [X] Update
    * [X] Delete
* [Available Numbers](http://ap.bandwidth.com/docs/rest-api/available-numbers/)
    * [X] Search Local
    * [X] Buy Local
    * [X] Search Tollfree
    * [X] Buy Tollfree
* [Bridges](http://ap.bandwidth.com/docs/rest-api/bridges/)
    * [X] List
    * [X] Create
    * [X] Get info
    * [X] Update Calls
    * [X] Play Audio
        * [X] Speak Sentence
        * [X] Play Audio File
    * [X] Get Calls
* [Calls](http://ap.bandwidth.com/docs/rest-api/calls/)
    * [X] List all calls
    * [X] Create
    * [X] Get info
    * [X] Update Status
        * [X] Transfer
        * [X] Answer
        * [X] Hangup
        * [X] Reject
    * [X] Play Audio
        * [X] Speak Sentence
        * [X] Play Audio File
    * [X] Send DTMF
    * [X] Events
        * [X] List
        * [X] Get individual info
    * [X] List Recordings
    * [X] List Transciptions
    * [X] Gather
        * [X] Create Gather
        * [X] Get Gather info
        * [X] Update Gather
* [Conferences](http://ap.bandwidth.com/docs/rest-api/conferences/)
    * [X] Create conference
    * [X] Get info for single conference
    * [X] Play Audio
        * [X] Speak Sentence
        * [X] Play Audio File
    * [X] Members
        * [X] Add member
        * [X] List members
        * [X] Update members
            * [X] Mute
            * [X] Remove
            * [X] Hold
        * [X] Play Audio to single member
            * [X] Speak Sentence
            * [X] Play Audio File
* [Domains](http://ap.bandwidth.com/docs/rest-api/domains/)
    * [X] List all domains
    * [X] create domain
    * [X] Delete domain
* [Endpoints](http://ap.bandwidth.com/docs/rest-api/endpoints/)
    * [X] List all endpoints
    * [X] Create Endpoint
    * [X] Get Single Endpoint
    * [X] Update Single Endpoint
    * [X] Delete Single Endpoint
    * [X] Create auth token
* [Errors](http://ap.bandwidth.com/docs/rest-api/errors/)
    * [X] Get all errors
    * [X] Get info on Single Error
* [Intelligence Services](http://ap.bandwidth.com/docs/rest-api/intelligenceservices/)
    * [ ] Number Intelligence
* [Media](http://ap.bandwidth.com/docs/rest-api/media/)
    * [X] List all media
    * [X] Upload media
    * [X] Download single media file
    * [X] Delete single media
* [Messages](http://ap.bandwidth.com/docs/rest-api/messages/)
    * [X] List all messages
    * [X] Send Message
    * [X] Get single message
* [Number Info](http://ap.bandwidth.com/docs/rest-api/numberinfo/)
    * [X] Get number info
* [Phone Numbers](http://ap.bandwidth.com/docs/rest-api/phonenumbers/)
    * [X] List all phonenumbers
    * [X] Get single phonenumber
    * [X] Order singe number
    * [X] Update single number
    * [X] Delete number
* [Recordings](http://ap.bandwidth.com/docs/rest-api/recordings/)
    * [X] List all recordings
    * [X] Get single recording info
* [Transciptions](http://ap.bandwidth.com/docs/rest-api/recordingsidtranscriptions/)
    * [X] Create
    * [X] Get info for single transcrption
    * [X] Get all transcrptions for a recording
* [BXML](http://ap.bandwidth.com/docs/xml/)
    * [X] Call
    * [X] Conference
    * [X] Gather
    * [X] Hangup
    * [X] Media
    * [X] Pause
    * [X] PlayAudio
    * [X] Record
    * [X] Reject
    * [X] SendMessage
    * [X] SpeakSentence
    * [X] Transfer

## Providing feedback on the developer preview

For current discussions on 2.0 please see the [2.0 issues section on GitHub](https://github.com/bandwidthcom/node-bandwidth/labels/2.0). To start a new topic on 2.0, please open an issue and use the `2.0` tag. Your feedback is greatly appreciated! Thanks for trying the preview and helping us make an awesome SDK!
