# node-bandwidth

A Node.js client library for the Bandwidth Application Platform

2.0 Developer Preview
> Please note: this developer preview is still under heavy development, and is only intended to be used to gather feedback from developers using the SDK. Many things will change, and this code should not be used in any production applications.

## Installing the developer preview

Because this version is not published via npm, you must install it by specifying the specific GitHub branch. Running the following command will install and save the latest version:

	$ npm install --save https://github.com/bandwidthcom/node-bandwidth.git#2.0-preview

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

Your `client` object is now ready to use the API. All client functions take an optional Node.js style `(err, result)` callback, and also return a Promise.

## Messages API

### Sending messages

Send a message and print the resulting message ID with a Promise:

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

Send a message and print the resulting message ID using a callback:

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

> Please note: sending multiple messages at the same time is not supported yet

### Getting messages

Get a single message by ID:

```javascript
client.Message.get("m-etppxbktp4bxkyg7mzs7c5z")
.then(function(message) {
	console.log(message.text);
})
.catch(function(err) {
	console.log(err.message);
});
```

Get a list of messages from a certain number:

```javascript
client.Message.list({
	from : "+12345678901"
})
.then(function(messages) {
	messages.forEach(function(message){
		console.log(message.text);
	});
})
.catch(function(err) {
	console.log(err.message);
});
```

## Providing feedback on the developer preview

For current discussions on 2.0 please see the [2.0 issues section on GitHub](https://github.com/bandwidthcom/node-bandwidth/labels/2.0). To start a new topic on 2.0, please open an issue and use the `2.0` tag. Your feedback is greatly appreciated! Thanks for trying the preview and helping us make an awesome SDK!
