# Bandwidth Voice and SMS API

This is a simple node module for integrating with the Bandwidth  API

It is just now getting started.

---

# Pre-Requisites and Installation
## Prerequisites

You will need to create an account on Bandwidth and create your API tokens.
This client presumes you have a valid account and API token already configured

## Installation 
```shell
npm install bandwidth

```

---

# Using Bandwidth Client

## Initializing the Bandwidth client

```
var bandwidth = require('bandwidth');
var client = new bandwidth.Client('host', 'user_id', 'apiToken', 'secret');
```
## SMS Messages
### Message Attributes
```
messageId - Unique ID for the message
direction - in for inbound, out for outbound
from - From number
to - To number
state - Message state
time - Date time when the message was created.  Timestamp follows ISO8601 format
```
### Sending an SMS
```
var message = new bandwidth.Message("from", "to", "message")
client.sendMessage(message, function(err, response) {
	if(err)
 	{
 		console.log("Error: " + err.message)
 	}
 	else {
 		console.log("message ID " + response.entityId)
 		messageId = response.entityId;
 		client.getMessage(messageId, function(e,msg){
 			console.log("got message:" + msg.messageId + "  " + msg.text + "   " + msg.direction);
 		});
 	}
 }
);
```
### Getting SMS Details
```
client.getMessage('messageId', function(err,message){
	if(err)
	{
		console.log("Error: " + err.message)
	}
	else {
		console.log("Got message " + message.messageId)
	}
});

```
### Getting all SMS for a user
```
client.getMessages(function(err,messages){
	if(messages){
		console.log("messages: " + messages.length)
	}
});
```
## Phone Numbers
### Phone Number Attributes
```
```
### Buying a new Phone Number
```
```


---

