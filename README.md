# node-bandwidth
[![npm version](https://badge.fury.io/js/node-bandwidth.svg)](https://badge.fury.io/js/node-bandwidth)
[![Build Status](https://travis-ci.org/bandwidthcom/node-bandwidth.svg?branch=master)](https://travis-ci.org/bandwidthcom/node-bandwidth)
[![dependencies](https://david-dm.org/bandwidthcom/node-bandwidth.svg)](https://david-dm.org/bandwidthcom/node-bandwidth)
[![Known Vulnerabilities](https://snyk.io/package/npm/node-bandwidth/badge.svg)](https://snyk.io/package/npm/node-bandwidth)

A Node.js client library for the [Bandwidth Application Platform](http://bandwidth.com/products/application-platform?utm_medium=social&utm_source=github&utm_campaign=dtolb&utm_content=_)

The current version is v2, released 5 August, 2016. Version 1.3.3 is available  [here](https://github.com/bandwidthcom/node-bandwidth/tree/v1.3.3).


## [Full API Reference](http://bwdemos.com/node-bandwidth/index.html)
The Full API Reference is available either as an interactive site or as a single Markdown file:

* [Site](http://bwdemos.com/node-bandwidth/index.html).
* [Single MD file](https://github.com/bandwidthcom/node-bandwidth/blob/master/docs/api.md)


## Installing the SDK

`node-bandwidth` is available on NPM:

	npm install --save node-bandwidth

## Supported Versions
`node-bandwidth` should work on all versions of node newer than `0.10.*`. However, due to the rapid development in the Node and npm environment, we can only provide _support_ on [LTS versions of Node](https://github.com/nodejs/LTS)

| Version | Support Level |
|---------|---------------|
| <0.10.* | Unsupported | 
| 0.10.* | Supported |
| 0.12.* | Supported |
| >=4.0 <4.2 | Unsupported |
| __>=4.2 <5.* (Node v4 argon LTS)__ | **Recommended** |
| 5.* | Unsupported |
| 6.* | Unsupported |

## Client initialization

All interaction with the API is done through a `client` Object. The client constructor takes an Object containing configuration options. The following options are supported:

| Field name  | Description           | Default value                       | Required |
|-------------|-----------------------|-------------------------------------|----------|
| `userId`    | Your Bandwidth user ID | `undefined`                         | Yes      |
| `apiToken`  | Your API token        | `undefined`                         | Yes      |
| `apiSecret` | Your API secret       | `undefined`                         | Yes      |
| `baseUrl`   | The Bandwidth API URL  | `https://api.catapult.inetwork.com` | No       |

To initialize the client object, provide your API credentials which can be found on your account page in [the portal](https://catapult.inetwork.com/pages/catapult.jsf).

```javascript
var Bandwidth = require("node-bandwidth");

var client = new Bandwidth({
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
## Providing feedback

For current discussions on 2.0 please see the [2.0 issues section on GitHub](https://github.com/bandwidthcom/node-bandwidth/labels/2.0). To start a new topic on 2.0, please open an issue and use the `2.0` tag. Your feedback is greatly appreciated!

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
    * [X] [Batch Messages](http://ap.bandwidth.com/docs/rest-api/messages/#resourcePOSTv1usersuserIdmessages) (single request, multiple messages)
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

