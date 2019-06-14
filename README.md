# node-bandwidth
[![npm version](https://badge.fury.io/js/node-bandwidth.svg)](https://badge.fury.io/js/node-bandwidth)
[![Build Status](https://travis-ci.org/bandwidth/node-bandwidth.svg?branch=master)](https://travis-ci.org/bandwidth/node-bandwidth)
[![dependencies](https://david-dm.org/bandwidth/node-bandwidth.svg)](https://david-dm.org/bandwidth/node-bandwidth)
[![Known Vulnerabilities](https://snyk.io/package/npm/node-bandwidth/badge.svg)](https://snyk.io/package/npm/node-bandwidth)

A Node.js client library for [Bandwidth's Communications Platform](https://app.bandwidth.com/)

## API Documentation

The API documentation is located at [dev.bandwidth.com/ap-docs/](http://dev.bandwidth.com/ap-docs/)

## [Full SDK Reference](http://dev.bandwidth.com/node-bandwidth/index.html)
The Full API Reference is available either as an interactive site or as a single Markdown file:

* [Site](http://dev.bandwidth.com/node-bandwidth/index.html).
* [Single MD file](https://github.com/bandwidth/node-bandwidth/blob/master/docs/api.md)

## Installing the SDK

`node-bandwidth` is available on NPM:

	npm install --save node-bandwidth

## Supported Versions
`node-bandwidth` should work on all versions of node newer than `6.0.0`. However, due to the rapid development in the Node and npm environment, we can only provide _support_ on [LTS versions of Node](https://github.com/nodejs/LTS)

| Version                        | Support Level            |
|:-------------------------------|:-------------------------|
| < 6 | Unsupported
| 6-12      | Supported                |
| > 12 | N/A |

## Release Notes
| Version | Notes |
|:---|:---|
| 3.0.0 | Dropped support for node versions less than 6 |
| 3.0.2 | Updated the URL used for Bandwidth's V2 Messaging |

## Client initialization

All interaction with the API is done through a `client` Object. The client constructor takes an Object containing configuration options. The following options are supported:

| Field name  | Description            | Default value                       | Required |
|:------------|:-----------------------|:------------------------------------|:---------|
| `userId`    | Your Bandwidth user ID | `undefined`                         | Yes      |
| `apiToken`  | Your API token         | `undefined`                         | Yes      |
| `apiSecret` | Your API secret        | `undefined`                         | Yes      |
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

## Using Messaging V2 API

Both callback and promise styles are supported

```javascript
// First you should create and application on Bandwidth Dashboard
var dashboardAuth = {
	accountId    : "accountId",
	userName     : "userName",
	password     : "password",
	subaccountId : "subaccountId"
};

client.v2.Message.createMessagingApplication(dashboardAuth, {
    name: "My Messaging App",
    callbackUrl: "http://my-callback",
    locationName: "My Location",
    smsOptions: {
        enabled: true,
        tollFreeEnabled: true
    },
    mmsOptions: {
        enabled: true
    }
}).then(function (application) {
	// application.applicationId contains id of created dashboard application
	// application.locationId contains id of location

	// Now you should reserve 1 ore more numbers on  Bandwidth Dashboard
	return client.v2.Message.searchAndOrderNumbers(dashboardAuth, application, new client.AreaCodeSearchAndOrderNumbersQuery({areaCode: "910", quantity: 1}))
		.then(function (numbers) {
			// Now you can send messages using these numbers
			return client.v2.Message.send({from: numbers[0], to: ["+12345678901", "+12345678902"], text: "Hello", applicationId: application.applicationId});
		});
});
```

## Providing feedback

For current discussions on 2.0 please see the [2.0 issues section on GitHub](https://github.com/bandwidth/node-bandwidth/labels/2.0). To start a new topic on 2.0, please open an issue and use the `2.0` tag. Your feedback is greatly appreciated!
