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

# Using Node SwitchCoder

## Initializing the SwitchCoder client

```
var switchCoder = require('node-switchcoder');
var client = new switchCoder.Client('apiToken', 'host');
```
## Getting a Phone Number Object
```
var phoneNumber = client.getPhoneNumber("yourNumber", opts);
```

## Getting a Code Object  
```
// get an instance of the script from the client
var code = client.getCode(scriptId, phoneNumber, opts);
```
# Invoking the Code
```
//invoke the code with all parameters
code.invoke(queryParameters, requestBody, function(response, err){});

//invoke script with just the callback
code.invoke(function(response,err){});
```
## Putting it all together
```
var switchCoder = require('node-switchcoder');
var client = new switchCoder.Client('1231232123', 'api.switchcoder.com');
var phoneNumber = client.getPhoneNumber('19195551212');
var code = client.getCode(123);
var requestParameters = {parameter1:'parameter1Value', parameter2:'parameter2Value'};
var requestBody = {bodyValue1:'my text'};

code.invoke(requestParameters, requestBody, function(response,err) {
  if(err){
    console.log("Got an error: " + err.message)
  } else {
    console.log("Response status: " response.statusCode + " with data: "  + response.data);
  }
});

```
---

