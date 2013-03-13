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

# Using Node Catapult

## Initializing the Bandwidth client

```
var bandwidth = require('bandwidth');
var client = new bandwidth.Client('host', 'user_id', 'apiToken', 'secret');
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

