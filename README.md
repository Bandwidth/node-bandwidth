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
## Searching Phone Number Inventory
### Search Criteria Attributes
```
numberType - local or tollFree
city - A two-letter US state abbreviation
state - A city name
zip - A 5-digit US Postal Code
quantity - The maximum quantity of numbers to return (default is 10, max is 5000)
pattern - more here
```
### Available Number Attributes
```
number - the number
nationalNumber - the number formatted for the locale
patternMatch - If there was a pattern match, the match will be returned 
city - The city where the number is tied, if applicable
lata - The LATA for the number
rateCenter - The rate center for the number
state - The state where the number is tied, if applicable
```
### Searching for local numbers
```
var searchCriteria = new bandwidth.AvailableNumberSearchCriteria();
searchCriteria.numberType = "local";
searchCriteria.state = "NC";
searchCriteria.quantity = 2
client.getAvailableNumbers(searchCriteria, function(err, numbers) {
 	if(err){
 		console.log("Error: " + err.message)
 	}else
 	{
 		console.log("got data: " + numbers[0].number)
 	}
});
```
### Searching for toll-free numbers
```
var searchCriteria = new bandwidth.AvailableNumberSearchCriteria();
searchCriteria.numberType = "tollFree";
searchCriteria.quantity = 2
client.getAvailableNumbers(searchCriteria, function(err, numbers) {
 	if(err){
 		console.log("Error: " + err.message)
 	}else
 	{
 		console.log("got data: " + numbers[0].number)
 	}
});
```


## Phone Numbers
### Phone Number Attributes
```
id - Unique ID for the number
application - Url to the application where the number is assigned (if applicable)
number - E164 format of the number
nationalNumber - The number formatted for the locale
name - User-assigned name of the phone number
createdTime - Date time when the message was created.  Timestamp follows ISO8601 format
state - The state from which the number originates (e.g. CA for California)
price - The cost of the number
numberState - Either enabled or disabled
```
### Buying a new Phone Number
```
var phoneNumber = new bandwidth.PhoneNumber("+19191112222","Home Phone", "application_id"); //application_id is optional
client.acquirePhoneNumber(phoneNumber, function(err,response){
	if(err)
 	{
 		console.log("Error: " + err.message)
 	}
 	else {
 		console.log("number ID " + response.entityId)
 		var phoneNumberId = response.entityId;
 		client.getPhoneNumber(phoneNumberId, function(e,number){
 			console.log("got number:" + number.number);
 		});
 	}
 });
```
### Getting Phone Number Details
```
client.getPhoneNumber("numberId", function(err, number){
 	if(err){
 		console.log("Error: " + err.message)
 	}else {
 		console.log("number: " + number.number)
 	}
});
```
### Getting All Phone Numbers 
This method returns all phone numbers for the authenticated user
```
client.getPhoneNumbers(function(error, numbers){
	if(error){
		console.log("Error: " + error.message)
	}else {
		for(var i = 0; i < numbers.length; i++)
		{
			console.log("Number: " + numbers[i].number)
		}
	}
});
```

### Deleting a Phone Number 
This method deletes the identified number
```
client.deletePhoneNumber("numberId", function(err,response){
    if(err){
		console.log("Error: " + err.message)
	}else {
		console.log("response: " + response.statusCode) //should be 200
	}

})
```

## Applications
### Application Attributes
```
id - Unique ID for the application
name - The name you give the application
incomingSmsUrl - The callback url for handling incoming SMS events
incomingCallUrl - The callback url for handling call events
script - The script to be run

Note: You can specify callback urls or script, but not both.
```

### Getting All Applications 
This method returns all applicatons for the authenticated user
```
client.getApplications(function(error, applications){
	if(error){
		console.log("Error: " + error.message)
	}else {
		for(var i = 0; i < applications.length; i++)
		{
			console.log("Application: " + applications[i].id + "  name: " + applications[i].name)
		}
	}	
})
```

## Porting A Number In
Bandwidth currently only automates porting numbers in.  Port out support is coming in future releases.
### Port In Availability Check
Use this method to check whether or not a number can be ported to Bandwidth
```
Available Response:
{
    number:"+19199991212",
    available:true
}

Unavailable Response:
{
    number:"+19195551212",
    available:false,
    reason: some reason
}

```

```
var availabilityCheck = new bandwidth.LNPAvailabilityCheck("+19195551212")
client.checkPortInAvailability(availabilityCheck, function(error, availabilityResponse){
  if(error)
  {
    console.log("Error: " + error.message)
  }else {
    console.log( availabilityResponse.number + " : "  + availabilityResponse.available);
  }
})
```




---

