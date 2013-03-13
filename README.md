# Node Catapult

This is a simple node module for integrating with the iNetwork Catapult API

It is just now getting started.

---

# Pre-Requisites and Installation
## Prerequisites

You will need to create an account on Catapult and create your API tokens.
This client presumes you have a valid account and API token already configured

## Installation 
```shell
npm install catapult

```

---

# Using Node Catapult

## Initializing the Catapult client

```
var catapult = require('catapult');
var client = new catapult.Client('host', 'user_id', 'apiToken', 'secret');
```
## Sending an SMS
```
client.sendMessage('from', 'to', 'body', function(err,response){
	if(err)
	{
		console.log("Error: " + err.message)
	}
	else {
		console.log("message ID " + response.entityId)
	}
	
});
```
## Getting SMS Details
```
client.getMessage('messageId', function(err,response){
	if(err)
	{
		console.log("Error: " + err.message)
	}
	else {
		console.log("message ID " + response.entityId)
	}
});

---

