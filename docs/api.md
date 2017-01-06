## Classes

<dl>
<dt><a href="#Account">Account</a></dt>
<dd></dd>
<dt><a href="#AccountResponse">AccountResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#TransactionListResponse">TransactionListResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#TransactionResponse">TransactionResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Application">Application</a></dt>
<dd></dd>
<dt><a href="#ApplicationListResponse">ApplicationListResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ApplicationResponse">ApplicationResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#AvailableNumber">AvailableNumber</a></dt>
<dd></dd>
<dt><a href="#AvailableNumberResponse">AvailableNumberResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#OrderedNumberResponse">OrderedNumberResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Bridge">Bridge</a></dt>
<dd></dd>
<dt><a href="#BridgeListResponse">BridgeListResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#BridgeResponse">BridgeResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Call">Call</a></dt>
<dd></dd>
<dt><a href="#CallResponse">CallResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GatherResponse">GatherResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EventResponse">EventResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#RecordingResponse">RecordingResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#TranscriptionResponse">TranscriptionResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Conference">Conference</a></dt>
<dd></dd>
<dt><a href="#ConferenceResponse">ConferenceResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Domain">Domain</a></dt>
<dd></dd>
<dt><a href="#DomainResponse">DomainResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Endpoint">Endpoint</a></dt>
<dd></dd>
<dt><a href="#EndpointResponse">EndpointResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Error">Error</a></dt>
<dd></dd>
<dt><a href="#ErrorResponse">ErrorResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#CatapultClient">CatapultClient</a></dt>
<dd></dd>
<dt><a href="#Media">Media</a></dt>
<dd></dd>
<dt><a href="#DownloadMediaFileResponse">DownloadMediaFileResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MediaFileResponse">MediaFileResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Message">Message</a></dt>
<dd></dd>
<dt><a href="#MessageListResponse">MessageListResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ExtendedMessageResponse">ExtendedMessageResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MessageError">MessageError</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#MessageResponse">MessageResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#NumberInfo">NumberInfo</a></dt>
<dd></dd>
<dt><a href="#NumberInfoResponse">NumberInfoResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#PhoneNumber">PhoneNumber</a></dt>
<dd></dd>
<dt><a href="#PhoneNumberResponse">PhoneNumberResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Recording">Recording</a></dt>
<dd></dd>
<dt><a href="#RecordingResponse">RecordingResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#TranscriptionResponse">TranscriptionResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#BXMLResponse">BXMLResponse</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getNextLink">getNextLink(response)</a> ⇒</dt>
<dd><p>getNextLink</p>
</dd>
</dl>

<a name="Account"></a>

## Account
**Kind**: global class  

* [Account](#Account)
    * [new Account()](#new_Account_new)
    * [.get(accountId, callback)](#Account+get) ⇒ <code>[AccountResponse](#AccountResponse)</code>
    * [.getTransactions(params, callback)](#Account+getTransactions) ⇒ <code>[TransactionListResponse](#TransactionListResponse)</code>

<a name="new_Account_new"></a>

### new Account()
Account

<a name="Account+get"></a>

### account.get(accountId, callback) ⇒ <code>[AccountResponse](#AccountResponse)</code>
Gets information about user's account.

**Kind**: instance method of <code>[Account](#Account)</code>  
**Returns**: <code>[AccountResponse](#AccountResponse)</code> - A promise for the account information  

| Param | Type | Description |
| --- | --- | --- |
| accountId | <code>String</code> | The ID of the account to get |
| callback | <code>function</code> | A callback with the account information |

**Example**  
```js
// Promise
client.Account.get().then(function(info){});

// Callback
client.Account.get(function(err, info){});
```
<a name="Account+getTransactions"></a>

### account.getTransactions(params, callback) ⇒ <code>[TransactionListResponse](#TransactionListResponse)</code>
Gets a list of transactions from user's account.

**Kind**: instance method of <code>[Account](#Account)</code>  
**Returns**: <code>[TransactionListResponse](#TransactionListResponse)</code> - A promise for the list of transactions  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Query parameters for listing accounts |
| [params.size] | <code>Number</code> | <code>25</code> | Used for pagination to indicate the size of each page requested for querying a list of transactions. If no value is specified the default value is 25 (maximum value 1000). |
| [params.maxItems] | <code>Number</code> |  | Limit the number of transactions that will be returned |
| [params.toDate] | <code>String</code> |  | Return only transactions that are newer than the parameter. |
| [params.fromDate] | <code>String</code> |  | Return only transactions that are older than the parameter. |
| [params.type] | <code>String</code> |  | Return only transactions that are this type. |
| callback | <code>function</code> |  | A callback with the list of transactions |

**Example**  
```js
//Promise
client.Account.getTransactions()
	.then(function (response) {
		console.log(response.transactions);
		if(response.hasNextPage) {
			return response.getNextPage();
		}
		else {
			return {transactions: []};
		}
	})
	.then(function(response) {
		console.log(response.transactions);
	});
```
**Example**  
```js
//Get transactions filtering by date
//Promise
var params = {
	fromDate: "2013-02-21T13:38:00"
};
client.Account.getTransactions(params)
	.then(function (response) {
		console.log(response.transactions);
		if(response.hasNextPage) {
			return response.getNextPage();
		}
		else {
			return {transactions: []};
		}
	})
	.then(function(response) {
		console.log(response.transactions);
	});
```
**Example**  
```js
//Get transactions filtering by date
//Promise
var params = {
	fromDate: "2013-02-21T13:38:00",
	toDate:   "2013-02-21T13:40:00"
};
client.Account.getTransactions(params)
	.then(function (response) {
		console.log(response.transactions);
		if(response.hasNextPage) {
			return response.getNextPage();
		}
		else {
			return {transactions: []};
		}
	})
	.then(function(response) {
		console.log(response.transactions);
	});
```
**Example**  
```js
//Get transactions limiting result
//Promise
var params = {
	maxItems: 1
};
client.Account.getTransactions(params)
	.then(function (response) {
		console.log(response.transactions);
		if(response.hasNextPage) {
			return response.getNextPage();
		}
		else {
			return {transactions: []};
		}
	})
	.then(function(response) {
		console.log(response.transactions);
	});
```
**Example**  
```js
//Get transactions of `payment` type
//Promise
var params = {
	type: "Payment"
};
client.Account.getTransactions(params)
	.then(function (response) {
		console.log(response.transactions);
		if(response.hasNextPage) {
			return response.getNextPage();
		}
		else {
			return {transactions: []};
		}
	})
	.then(function(response) {
		console.log(response.transactions);
	});
```
<a name="AccountResponse"></a>

## AccountResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| balance | <code>String</code> | User's account balance in dollars, as a string; the currency symbol is not included. |
| type | <code>String</code> | The type of account configured for your user. |

<a name="TransactionListResponse"></a>

## TransactionListResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| transactions | <code>[Array.&lt;TransactionResponse&gt;](#TransactionResponse)</code> | Array of transactions |
| getNextPage | <code>function</code> | Calls the next page function |
| hasNextPage | <code>boolean</code> | True/False flag for next |

<a name="TransactionResponse"></a>

## TransactionResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique identifier for the transaction. |
| time | <code>String</code> | The time the transaction was processed. |
| amount | <code>String</code> | The transaction amount in dollars, as a string; the currency symbol is not included. |
| type | <code>String</code> | The type of transaction. |
| units | <code>String</code> | The number of product units the transaction charged or credited. |
| productType | <code>String</code> | The product the transaction was related to |
| number | <code>String</code> | The phone number the transaction was related to |

<a name="Application"></a>

## Application
**Kind**: global class  

* [Application](#Application)
    * [new Application(client)](#new_Application_new)
    * [.list(params, [callback])](#Application+list) ⇒ <code>[ApplicationListResponse](#ApplicationListResponse)</code>
    * [.create(params, [callback])](#Application+create) ⇒ <code>[ApplicationResponse](#ApplicationResponse)</code>
    * [.get(applicationId, [callback])](#Application+get) ⇒ <code>[ApplicationResponse](#ApplicationResponse)</code>
    * [.update(applicationId, params, [callback])](#Application+update)
    * [.delete(applicationId, [callback])](#Application+delete)

<a name="new_Application_new"></a>

### new Application(client)
Application


| Param | Type | Description |
| --- | --- | --- |
| client | <code>Object</code> | Catapult client |

<a name="Application+list"></a>

### application.list(params, [callback]) ⇒ <code>[ApplicationListResponse](#ApplicationListResponse)</code>
List the user's applications

**Kind**: instance method of <code>[Application](#Application)</code>  
**Returns**: <code>[ApplicationListResponse](#ApplicationListResponse)</code> - A promise for the list of applications, has a getNextPage
function if the number of applications returned by the query exceeds the page size.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Parameters for filtering applications. |
| [params.size] | <code>Number</code> | The maximum number of applications returned by the query per page (Max size: 1000). |
| [callback] | <code>function</code> | A callback for the list of applications. |

**Example**  
```js
//Promise
client.Application.list()
.then(function (response) {
	console.log(response.applications);
	if(response.hasNextPage) {
		return response.getNextPage();
	}
	else {
		return {applications: []};
	}
})
.then(function(response) {
	console.log(response.applications);
});
```
<a name="Application+create"></a>

### application.create(params, [callback]) ⇒ <code>[ApplicationResponse](#ApplicationResponse)</code>
Create a new application

**Kind**: instance method of <code>[Application](#Application)</code>  
**Returns**: <code>[ApplicationResponse](#ApplicationResponse)</code> - A promise for the newly created application.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Parameters for creating a new call |
| params.name | <code>String</code> |  | A name you choose for this application. |
| params.incomingCallUrl | <code>String</code> |  | A URL where call events will be sent for an inbound call. This is the endpoint where the Application Platform will send all call events. Either incomingCallUrl or incomingMessageUrl is required. |
| [params.incomingCallUrlCallbackTimeout] | <code>String</code> |  | Determine how long should the platform wait for incomingCallUrl's response before timing out in milliseconds. |
| [params.incomingCallFallbackUrl] | <code>String</code> |  | The URL used to send the callback event if the request to incomingCallUrl fails. |
| params.incomingMessageUrl | <code>String</code> |  | A URL where message events will be sent for an inbound message. This is the endpoint where the Application Platform will send all message events. Either incomingMessageUrl or incomingCallUrl is required. |
| [params.incomingMessageUrlCallbackTimeout] | <code>Number</code> |  | Determine how long should the platform wait for incomingMessageUrl's response before timing out in milliseconds. |
| [params.incomingMessageFallbackUrl] | <code>String</code> |  | The URL used to send the callback event if the request to incomingMessageUrl fails. |
| [params.callbackHttpMethod] | <code>String</code> |  | Determine if the callback event should be sent via HTTP GET or HTTP POST. Values are "get" or "post", default: "post". |
| [params.autoAnswer] | <code>Boolean</code> | <code>true</code> | Determines whether or not an incoming call should be automatically answered. Default value is 'true'. |
| [callback] | <code>function</code> |  | A callback for the list of applications |

**Example**  
```js
//Promise
client.Application.create({
	name: 'SampleApp',
	incomingCallUrl: 'http://your-server.com/CallCallback',
	incomingMessageUrl: 'http://your-server.com/MsgCallback'
})
.then(function (response) {
	console.log(response);
});

//Callback
client.Application.create({
	name: 'SampleApp2',
	incomingCallUrl: 'http://your-server.com/CallCallback',
	incomingMessageUrl: 'http://your-server.com/MsgCallback'
}, function (err, response) {
	if (err) {
		console.log(err);
	}
	else {
		console.log(response)
	}
});
```
<a name="Application+get"></a>

### application.get(applicationId, [callback]) ⇒ <code>[ApplicationResponse](#ApplicationResponse)</code>
Get an application.

**Kind**: instance method of <code>[Application](#Application)</code>  
**Returns**: <code>[ApplicationResponse](#ApplicationResponse)</code> - A promise for the application.  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The ID of the application to get. |
| [callback] | <code>function</code> | A callback for the application. |

**Example**  
```js
// Promise
client.Application.get('a-j4f2jz53mq')
.then(function (response) {
	console.log(response);
});

// Callback
client.Application.get('a-zuwwfzzrbea',
	function (err, response) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(response);
		}
});
```
<a name="Application+update"></a>

### application.update(applicationId, params, [callback])
Make changes to an application.

**Kind**: instance method of <code>[Application](#Application)</code>  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The ID of the application to modify. |
| params | <code>Object</code> | Parameters for creating a new call |
| [params.name] | <code>String</code> | A name you choose for this application. |
| [params.incomingCallUrl] | <code>String</code> | A URL where call events will be sent for an inbound call. This is the endpoint where the Application Platform will send all call events. Either incomingCallUrl or incomingMessageUrl is required. |
| [params.incomingCallUrlCallbackTimeout] | <code>String</code> | Determine how long should the platform wait for incomingCallUrl's response before timing out in milliseconds. |
| [params.incomingCallFallbackUrl] | <code>String</code> | The URL used to send the callback event if the request to incomingCallUrl fails. |
| [params.incomingMessageUrl] | <code>String</code> | A URL where message events will be sent for an inbound message. This is the endpoint where the Application Platform will send all message events. Either incomingMessageUrl or incomingCallUrl is required. |
| [params.incomingMessageUrlCallbackTimeout] | <code>Number</code> | Determine how long should the platform wait for incomingMessageUrl's response before timing out in milliseconds. |
| [params.incomingMessageFallbackUrl] | <code>String</code> | The URL used to send the callback event if the request to incomingMessageUrl fails. |
| [params.callbackHttpMethod] | <code>String</code> | Determine if the callback event should be sent via HTTP GET or HTTP POST. Values are "get" or "post", default: "post". |
| [params.autoAnswer] | <code>Boolean</code> | Determines whether or not an incoming call should be automatically answered. Default value is 'true'. |
| [callback] | <code>function</code> | A callback for the list of applications |

**Example**  
```js
// Promise
client.Application.update('a-j4f2j6vjmqz53mq', {
	name: 'Rename App1',
	autoAnswer: false
})
.then(function (response) {
	console.log(response);
});

// Callback
client.Application.update('a-zudcfzzrbea',
	{
		name: 'Rename App2',
		autoAnswer: false
	},
	function (err, response) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(response);
		}
});
```
<a name="Application+delete"></a>

### application.delete(applicationId, [callback])
Delete an application.

**Kind**: instance method of <code>[Application](#Application)</code>  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The ID of the application to delete. |
| [callback] | <code>function</code> | A callback for the application. |

**Example**  
```js
// Promise
client.Application.delete('a-j4f2j6mqz53mq')
.then(function (response) {
	console.log(response);
});

// Callback
client.Application.delete('a-zuwwzrbea',
	function (err, response) {
		if (err) {
			console.log(err);
		}
		else {
			console.log(response);
		}
});
```
<a name="ApplicationListResponse"></a>

## ApplicationListResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| applications | <code>[Array.&lt;ApplicationResponse&gt;](#ApplicationResponse)</code> | Array of applications |
| getNextPage | <code>function</code> | Calls the next page function |
| hasNextPage | <code>boolean</code> | True/False flag for next |

<a name="ApplicationResponse"></a>

## ApplicationResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique identifier for the application. |
| name | <code>String</code> | A name you choose for this application. |
| incomingCallUrl | <code>String</code> | A URL where call events will be sent for an inbound call. This is the endpoint where the Application Platform will send all call events. Either incomingCallUrl or incomingMessageUrl is required. |
| incomingCallUrlCallbackTimeout | <code>String</code> | Determine how long should the platform wait for incomingCallUrl's response before timing out in milliseconds. |
| incomingCallFallbackUrl | <code>String</code> | The URL used to send the callback event if the request to incomingCallUrl fails. |
| callbackHttpMethod | <code>String</code> | Determine if the callback event should be sent via HTTP GET or HTTP POST. Values are "get" or "post", default: "post". |
| autoAnswer | <code>Boolean</code> | Determines whether or not an incoming call should be automatically answered. Default value is 'true'. |
| incomingMessageUrl | <code>String</code> | A URL where message events will be sent for an inbound message. This is the endpoint where the Application Platform will send all message events. Either incomingMessageUrl or incomingCallUrl is required. |
| incomingMessageUrlCallbackTimeout | <code>Number</code> | Determine how long should the platform wait for incomingMessageUrl's response before timing out in milliseconds. |
| incomingMessageFallbackUrl | <code>String</code> | The URL used to send the callback event if the request to incomingMessageUrl fails. |

<a name="new_ApplicationResponse_new"></a>

### new ApplicationResponse()
ApplicationResponse

<a name="AvailableNumber"></a>

## AvailableNumber
**Kind**: global class  

* [AvailableNumber](#AvailableNumber)
    * [new AvailableNumber()](#new_AvailableNumber_new)
    * [.search(type, params, callback)](#AvailableNumber+search) ⇒ <code>[Array.&lt;AvailableNumberResponse&gt;](#AvailableNumberResponse)</code>
    * [.searchAndOrder(type, params, callback)](#AvailableNumber+searchAndOrder) ⇒ <code>[Array.&lt;OrderedNumberResponse&gt;](#OrderedNumberResponse)</code>

<a name="new_AvailableNumber_new"></a>

### new AvailableNumber()
Available numbers

<a name="AvailableNumber+search"></a>

### availableNumber.search(type, params, callback) ⇒ <code>[Array.&lt;AvailableNumberResponse&gt;](#AvailableNumberResponse)</code>
Search for available local or tollFree numbers

**Kind**: instance method of <code>[AvailableNumber](#AvailableNumber)</code>  
**Returns**: <code>[Array.&lt;AvailableNumberResponse&gt;](#AvailableNumberResponse)</code> - A promise for the list of available numbers  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of number to search (local or tollFree) |
| params | <code>Object</code> | Search parameters |
| [params.city] | <code>String</code> | A city name (only for local numbers) |
| [params.state] | <code>String</code> | A state name (only for local numbers) |
| [params.zip] | <code>String</code> | A 5-digit US ZIP code (only for local numbers) |
| [params.areaCode] | <code>String</code> | A 3-digit telephone area code (only for local numbers) |
| [params.localNumber] | <code>String</code> | First digits of a telephone number inside an area code for filtering the results (only for local numbers) |
| [params.inLocalCallingArea] | <code>String</code> | Boolean value to indicate that the search for available numbers must consider overlayed areas. Only applied for localNumber searching. (only for local numbers) |
| [params.quantity] | <code>String</code> | The maximum number of numbers to return (default 10, maximum 5000) |
| [params.pattern] | <code>String</code> | A number pattern that may include letters, digits, and the following wildcard characters: ? - matches any single digit, * - matches zero or more digits |
| callback | <code>function</code> | A callback with the list of available numbers |

**Example**  
```js
// Search 3 available local phone numbers with area code 910

// Promise
client.AvailableNumber.search("local", { areaCode : "910", quantity : 3 }).then(function (numbers) {});

// Callback
client.AvailableNumber.search("local", { areaCode : "910", quantity : 3 }, function (err, numbers) {});
```
**Example**  
```js
//Promise
client.AvailableNumber.search("tollFree", {
	quantity : 3 })
.then(function (numbers) {
	console.log(numbers)
});

// Callback
client.AvailableNumber.search("tollFree", {
	quantity : 3 },
	function (err, numbers) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(numbers);
		}
	});
```
<a name="AvailableNumber+searchAndOrder"></a>

### availableNumber.searchAndOrder(type, params, callback) ⇒ <code>[Array.&lt;OrderedNumberResponse&gt;](#OrderedNumberResponse)</code>
Search for available local or tollFree numbers and order them

**Kind**: instance method of <code>[AvailableNumber](#AvailableNumber)</code>  
**Returns**: <code>[Array.&lt;OrderedNumberResponse&gt;](#OrderedNumberResponse)</code> - A promise for the list of ordered numbers  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Type of number to search (local or tollFree) |
| params | <code>Object</code> | Search parameters |
| [params.city] | <code>String</code> | A city name (only for local numbers) |
| [params.state] | <code>String</code> | A state name (only for local numbers) |
| [params.zip] | <code>String</code> | A 5-digit US ZIP code (only for local numbers) |
| [params.areaCode] | <code>String</code> | A 3-digit telephone area code (only for local numbers) |
| [params.localNumber] | <code>String</code> | First digits of a telephone number inside an area code for filtering the results (only for local numbers) |
| [params.inLocalCallingArea] | <code>String</code> | Boolean value to indicate that the search for available numbers must consider overlayed areas. Only applied for localNumber searching. (only for local numbers) |
| [params.quantity] | <code>String</code> | The maximum number of numbers to return (default 10, maximum 5000) |
| callback | <code>function</code> | A callback with the list of ordered numbers |

**Example**  
```js
// Search 2 available local phone numbers with area code 910 and order them

// Promise
client.AvailableNumber.searchAndOrder("local", { areaCode : "910", quantity : 2 }).then(function (numbers) {});

// Callback
client.AvailableNumber.serchAndOrder("local", { areaCode : "910", quantity : 2 }, function (err, numbers) {});
```
**Example**  
```js
//Search and order tollfree numbers
//Promise
client.AvailableNumber.searchAndOrder("tollFree", {
	quantity : 1 })
.then(function (numbers) {
	console.log(numbers)
});

// Callback
client.AvailableNumber.searchAndOrder("tollFree", {
	quantity : 1 },
	function (err, numbers) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(numbers);
		}
	});
```
<a name="AvailableNumberResponse"></a>

## AvailableNumberResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| number | <code>String</code> | Phone number. |
| nationalNumber | <code>String</code> | Phone number in national format. |
| price | <code>String</code> | Price of this phone number. |
| city | <code>String</code> | A city name of number (only for local numbers). |
| rateCenter | <code>String</code> | A rate center (only for local numbers). |
| state | <code>String</code> | A state of number (only for local numbers). |

<a name="OrderedNumberResponse"></a>

## OrderedNumberResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | Id of ordered number. |
| number | <code>String</code> | Phone number. |
| nationalNumber | <code>String</code> | Phone number in national format. |
| price | <code>String</code> | Price of this phone number. |

<a name="Bridge"></a>

## Bridge
**Kind**: global class  

* [Bridge](#Bridge)
    * [new Bridge()](#new_Bridge_new)
    * [.create(params, [callback])](#Bridge+create) ⇒ <code>[BridgeResponse](#BridgeResponse)</code>
    * [.get(bridgeId, callback)](#Bridge+get) ⇒ <code>[BridgeResponse](#BridgeResponse)</code>
    * [.list(params, callback)](#Bridge+list) ⇒ <code>[BridgeListResponse](#BridgeListResponse)</code>
    * [.update(bridgeId, params, [callback])](#Bridge+update) ⇒ <code>[BridgeResponse](#BridgeResponse)</code>
    * [.speakSentence(bridgeId, sentence, [callback])](#Bridge+speakSentence) ⇒ <code>Promise</code>
    * [.playAudioFile(bridgeId, fileUrl, [callback])](#Bridge+playAudioFile) ⇒ <code>Promise</code>
    * [.playAudioAdvanced(bridgeId, params, [callback])](#Bridge+playAudioAdvanced) ⇒ <code>Promise</code>
    * [.getCalls(bridgeId, callback)](#Bridge+getCalls) ⇒ <code>Promise</code>

<a name="new_Bridge_new"></a>

### new Bridge()
Bridge

<a name="Bridge+create"></a>

### bridge.create(params, [callback]) ⇒ <code>[BridgeResponse](#BridgeResponse)</code>
Create a new bridge

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>[BridgeResponse](#BridgeResponse)</code> - A promise for the newly created bridge  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Parameters for creating a bridge |
| [params.bridgeAudio] | <code>Boolean</code> | <code>true</code> | Enable/Disable two way audio path. |
| [params.callIds] | <code>Array.&lt;String&gt;</code> |  | The list of call ids in the bridge. If the list of call ids is not provided the bridge is logically created and it can be used to place calls later. |
| [callback] | <code>function</code> |  | Callback with the newly created bridge |

**Example**  
```js
//Promise
client.Bridge.create({
	bridgeAudio: true,
	callIds: ['c-qbs5kwrsyx6wsdi', 'c-zan4g74pprsq']
})
.then(function (response) {
	console.log(response);
});

//Callback
client.Bridge.create({
	bridgeAudio: true,
	callIds: ['c-qbsx6wsdi', 'c-zan4g7prsq']
}, function (err, response) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(response);
		}
	});
```
<a name="Bridge+get"></a>

### bridge.get(bridgeId, callback) ⇒ <code>[BridgeResponse](#BridgeResponse)</code>
Gets information about a bridge.

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>[BridgeResponse](#BridgeResponse)</code> - A promise for the call information  

| Param | Type | Description |
| --- | --- | --- |
| bridgeId | <code>String</code> | The ID of the bridge to get |
| callback | <code>function</code> | A callback with the call information |

**Example**  
```js
//Promise
client.Bridge.get('brg-65dhjwrmbasiei')
.then(function (response) {
	console.log(response);
});

//Callback
client.Bridge.get('brg-65dhmbasiei',
	function (err, response) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(response);
		}
	});
```
<a name="Bridge+list"></a>

### bridge.list(params, callback) ⇒ <code>[BridgeListResponse](#BridgeListResponse)</code>
Gets a list of bridges.

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>[BridgeListResponse](#BridgeListResponse)</code> - A promise for the list of bridges  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Query parameters for listing bridges |
| [params.size] | <code>Number</code> | <code>25</code> | Used for pagination to indicate the size of each page requested for querying a list of bridges. If no value is specified the default value is 25 (maximum value 1000). |
| callback | <code>function</code> |  | A callback with the list of bridges |

**Example**  
```js
client.Bridge.list()
.then(function (response) {
	console.log(response.bridges);
	if(response.hasNextPage) {
		return response.getNextPage();
	}
	else {
		return {bridges: []};
	}
})
.then(function(response) {
	console.log(response.bridges);
});
```
<a name="Bridge+update"></a>

### bridge.update(bridgeId, params, [callback]) ⇒ <code>[BridgeResponse](#BridgeResponse)</code>
Update the bridge

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>[BridgeResponse](#BridgeResponse)</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| bridgeId | <code>String</code> | The ID of the bridge |
| params | <code>Object</code> | Changed parameters of the bridge |
| params.bridgeAudio | <code>Boolean</code> | Enable/Disable two way audio path (default = true). |
| params.callIds | <code>Array.&lt;String&gt;</code> | The list of call ids in the bridge. |
| [callback] | <code>function</code> | Callback with the newly created bridge |

**Example**  
```js
//Promise
client.Bridge.update('brg-65dasiei', {
	bridgeAudio: false
})
.then(function (response) {
	console.log(response);
});

//Callback
client.Bridge.update('brg-65dhjbanasiei', {
	bridgeAudio: false
}, function (err, response) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(response);
		}
	});
```
<a name="Bridge+speakSentence"></a>

### bridge.speakSentence(bridgeId, sentence, [callback]) ⇒ <code>Promise</code>
Speak sentence to the bridge using default values

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| bridgeId | <code>String</code> | The ID of the bridge |
| sentence | <code>String</code> | A sentence to speak to the bridge. |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Speak sentence in a bridge

//Promise
client.Bridge.speakSentence("bridgeID", "Hello From Bandwidth").then(function (res) {});

//Callback
client.Bridge.speakSentence("bridgeID", "Hello From Bandwidth", function (err, res) {});
```
<a name="Bridge+playAudioFile"></a>

### bridge.playAudioFile(bridgeId, fileUrl, [callback]) ⇒ <code>Promise</code>
Play audio url to the bridge

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| bridgeId | <code>String</code> | The ID of the bridge |
| fileUrl | <code>String</code> | The http location of an audio file to play (WAV and MP3 supported). |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Play Audio file on bridge

//Promise
client.Bridge.playAudioFile("bridgeID", "http://myurl.com/file.mp3").then(function (res) {});

//Callback
client.Bridge.playAudioFile("bridgeID", "http://myurl.com/file.wav", function (err, res) {});
```
<a name="Bridge+playAudioAdvanced"></a>

### bridge.playAudioAdvanced(bridgeId, params, [callback]) ⇒ <code>Promise</code>
Play audio file or speak sentence in bridge

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| bridgeId | <code>String</code> |  | The ID of the bridge |
| params | <code>Object</code> |  | Parameters to play audio in bridge. |
| [params.fileUrl] | <code>String</code> |  | The http location of an audio file to play (WAV and MP3 supported). |
| [params.sentence] | <code>String</code> |  | The sentence to speak. |
| [params.gender] | <code>String</code> | <code>female</code> | The gender of the voice used to synthesize the sentence. It will be considered only if sentence is not null. The female gender will be used by default. |
| [params.locale] | <code>String</code> | <code>en_US</code> | The locale used to get the accent of the voice used to synthesize the sentence. Check out [docs](http://ap.bandwidth.com/docs/rest-api/bridges/#resourcePOSTv1usersuserIdbridgesbridgeIdaudio) for list of supported locales. It will be considered only if sentence is not null/empty. The en_US will be used by default. |
| [params.voice] | <code>String</code> | <code>Susan</code> | The voice to speak the sentence. Check out [docs](http://ap.bandwidth.com/docs/rest-api/bridges/#resourcePOSTv1usersuserIdbridgesbridgeIdaudio) for list of supported voices It will be considered only if sentence is not null/empty. Susan's voice will be used by default. |
| [params.loopEnabled] | <code>Boolean</code> | <code>false</code> | When value is true, the audio will keep playing in a loop. Default: false. |
| [callback] | <code>function</code> |  | Callback for the operation |

**Example**  
```js
//Play Audio File on loop
var options = {
	fileUrl     : "http://myurl.com/file.mp3",
	loopEnabled : true
}
//Promise
client.Bridge.playAudioAdvanced("bridgeId", options).then(function (res) {});

//Callback
client.Bridge.playAudioAdvanced("bridgeId", options, function (err,res) {});
```
**Example**  
```js
//Speak sentence with options
var options = {
	sentence : "hola de Bandwidth",
	gender   : "male",
	locale   : "es",
	voice    : "Jorge"
}
//Promise
client.Bridge.playAudioAdvanced("bridgeId", options).then(function (res) {});

//Callback
client.Bridge.playAudioAdvanced("bridgeId", options, function (err,res) {});
```
<a name="Bridge+getCalls"></a>

### bridge.getCalls(bridgeId, callback) ⇒ <code>Promise</code>
Gets information about a bridge.

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>Promise</code> - A promise for the call information  

| Param | Type | Description |
| --- | --- | --- |
| bridgeId | <code>String</code> | The ID of the bridge to get |
| callback | <code>function</code> | A callback with the call information |

**Example**  
```js
//Promise
client.Bridge.getCalls('brg-65dhjbiei')
.then(function (response) {
	console.log(response);
});

//Callback
client.Bridge.getCalls('brg-65dhjrmbasiei',
	function (err, response) {
		if(err) {
			console.log(err);
		}
		else {
			console.log(response);
		}
	});
```
<a name="BridgeListResponse"></a>

## BridgeListResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bridges | <code>[Array.&lt;BridgeResponse&gt;](#BridgeResponse)</code> | Array of bridges |
| getNextPage | <code>function</code> | Calls the next page function |
| hasNextPage | <code>boolean</code> | True/False flag for next |

<a name="BridgeResponse"></a>

## BridgeResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique ID of the bridge. |
| state | <code>String</code> | Bridge state. Possible state values are described here. |
| callIds | <code>Array.&lt;String&gt;</code> | List of call Ids that will be in the bridge. |
| bridgeAudio | <code>Boolean</code> | Enable/Disable two way audio path. |
| completedTime | <code>String</code> | The time when the bridge was completed. |
| createdTime | <code>String</code> | The time that bridge was created. |
| activatedTime | <code>String</code> | The time that the bridge got into active state. |

<a name="Call"></a>

## Call
**Kind**: global class  

* [Call](#Call)
    * [new Call()](#new_Call_new)
    * [.create(params, [callback])](#Call+create) ⇒ <code>[CallResponse](#CallResponse)</code>
    * [.get(callId, callback)](#Call+get) ⇒ <code>Promise</code>
    * [.list(params, callback)](#Call+list) ⇒ <code>Promise</code>
    * [.update(callId, params, [callback])](#Call+update) ⇒ <code>Promise</code>
    * [.answer(callId, [callback])](#Call+answer) ⇒ <code>Promise</code>
    * [.reject(callId, [callback])](#Call+reject) ⇒ <code>Promise</code>
    * [.hangup(callId, [callback])](#Call+hangup) ⇒ <code>Promise</code>
    * [.transfer(params, [callback])](#Call+transfer) ⇒ <code>[CallResponse](#CallResponse)</code>
    * [.speakSentence(callId, sentence, [callback])](#Call+speakSentence) ⇒ <code>Promise</code>
    * [.playAudioFile(callId, fileUrl, [callback])](#Call+playAudioFile) ⇒ <code>Promise</code>
    * [.playAudioAdvanced(callId, params, [callback])](#Call+playAudioAdvanced) ⇒ <code>Promise</code>
    * [.enableRecording(callId, [callback])](#Call+enableRecording) ⇒ <code>Promise</code>
    * [.createGather(callId, params, [callback])](#Call+createGather) ⇒ <code>[CallResponse](#CallResponse)</code>
    * [.getGather(callId, gatherId, [callback])](#Call+getGather) ⇒ <code>[GatherResponse](#GatherResponse)</code>
    * [.completeGather(callId, gatherId, [callback])](#Call+completeGather) ⇒ <code>Promise</code>
    * [.getEvents(callId, [callback])](#Call+getEvents) ⇒ <code>[Array.&lt;EventResponse&gt;](#EventResponse)</code>
    * [.getEvent(callId, eventId, [callback])](#Call+getEvent) ⇒ <code>[EventResponse](#EventResponse)</code>
    * [.getRecordings(callId, [callback])](#Call+getRecordings) ⇒ <code>[Array.&lt;RecordingResponse&gt;](#RecordingResponse)</code>
    * [.getTranscriptions(callId, [callback])](#Call+getTranscriptions) ⇒ <code>[Array.&lt;TranscriptionResponse&gt;](#TranscriptionResponse)</code>
    * [.sendDtmf(callId, dtmfOut, [callback])](#Call+sendDtmf) ⇒ <code>Promise</code>

<a name="new_Call_new"></a>

### new Call()
Voice call

<a name="Call+create"></a>

### call.create(params, [callback]) ⇒ <code>[CallResponse](#CallResponse)</code>
Create a new voice call

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>[CallResponse](#CallResponse)</code> - A promise for the newly created call  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Parameters for creating a new call |
| params.from | <code>String</code> | A Bandwidth phone number on your account the call should come from (must be in E.164 format, like +19195551212). |
| params.to | <code>String</code> | The number to call (must be either an E.164 formated number, like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com). |
| [params.callTimeout] | <code>Number</code> | Determine how long should the platform wait for] call answer before timing out in seconds. |
| [params.callbackUrl] | <code>String</code> | The full server URL where the call events related to the Call will be sent to. |
| [params.callbackTimeout] | <code>Number</code> | Determine how long should the platform wait for callbackUrl's response before timing out in milliseconds. |
| [params.callbackHttpMethod] | <code>String</code> | Determine if the callback event should be sent via HTTP GET or HTTP POST. Values are "GET" or "POST" (if not set the default is POST). |
| [params.fallbackUrl] | <code>String</code> | The full server URL used to send the callback event if the request to callbackUrl fails. |
| [params.bridgeId] | <code>String</code> | The id of the bridge where the call will be added. |
| [params.conferenceId] | <code>String</code> | Id of the conference where the call will be added. This property is required if you want to add this call to a conference. |
| [params.recordingEnabled] | <code>String</code> | Indicates if the call should be recorded after being created. Set to "true" to enable. Default is "false". |
| [params.recordingMaxDuration] | <code>String</code> | Indicates the maximum duration of call recording in seconds. Default value is 1 hour. |
| [params.transcriptionEnabled] | <code>String</code> | Whether all the recordings for this call is going to be automatically transcribed. |
| [params.tag] | <code>String</code> | A string that will be included in the callback events of the call. |
| [params.sipHeaders] | <code>Object</code> | Map of Sip headers prefixed by "X-". Up to 5 headers can be sent per call. |
| [callback] | <code>function</code> | Callback with the newly created call |

<a name="Call+get"></a>

### call.get(callId, callback) ⇒ <code>Promise</code>
Gets information about an active or completed call.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the call information  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call to get |
| callback | <code>function</code> | A callback with the call information |

<a name="Call+list"></a>

### call.list(params, callback) ⇒ <code>Promise</code>
Gets a list of active and historic calls you made or received.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the list of calls  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Query parameters for listing calls |
| [params.bridgeId] | <code>String</code> |  | The id of the bridge for querying a list of calls history (pagination does not apply). |
| [params.conferenceId] | <code>String</code> |  | The id of the conference for querying a list of calls history |
| [params.from] | <code>String</code> |  | The number to filter calls that came from (must be either an E.164 formated number,like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com). |
| [params.to] | <code>String</code> |  | The number to filter calls that was called to (must be either an E.164 formated number,like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com). |
| [params.page] | <code>Number</code> | <code>0</code> | Used for pagination to indicate the page requested for querying a list of calls. If no value is specified the default is 0. |
| [params.size] | <code>Number</code> | <code>25</code> | Used for pagination to indicate the size of each page requested for querying a list of calls. If no value is specified the default value is 25 (maximum value 1000). |
| callback | <code>function</code> |  | A callback with the list of calls |

<a name="Call+update"></a>

### call.update(callId, params, [callback]) ⇒ <code>Promise</code>
Update properties of an active phone call.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the incoming call |
| params | <code>Object</code> | The propreties to update |
| [params.state] | <code>string</code> | The call state. Possible values: `rejected` to reject not answer, `active` to answer the call, `completed` to hangup the call, `transferring` to start and connect call to a new outbound call. |
| [params.recordingEnabled] | <code>string</code> | Indicates if the call should be recorded. Values `true` or `false`. You can turn recording on/off and have multiple recordings on a single call. |
| [params.recordingFileFormat] | <code>string</code> | The file format of the recorded call. Supported values are `wav` (default) and `mp3`. |
| [params.transferTo] | <code>string</code> | Phone number or SIP address that the call is going to be transferred to. |
| [params.transferCallerId] | <code>string</code> | This is the caller id that will be used when the call is transferred. This parameter is only considered in `transfer` state. <br> - transferring an incoming call: Allowed values are 1) "private" 2) the incoming call "from" number or 3) any Bandwidth number owned by user. <br> - transferring an outgoing call call: allowed values are 1) "private" or 2) any Bandwidth phone number owned by user. |
| [params.whisperAudio] | <code>string</code> | Audio to be played to the caller that the call will be transferred to. |
| [params.callbackUrl] | <code>string</code> | The server URL where the call events for the new call will be sent. |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Start recording a mp3 and update the callback url
var payLoad = {
	recordingEnabled: "true",
	recordingFileFormat = "mp3",
	callbackUrl: "http://yourUrl.com/callbacks/callrecording"
};

client.call.update("callId", payload)
.then(function () {
	// keep on keeping on here;
});
```
<a name="Call+answer"></a>

### call.answer(callId, [callback]) ⇒ <code>Promise</code>
Answer an incoming call

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the incoming call |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Promise
client.Call.answer("callID").then(function () {});

//Callback
client.Call.answer("callID", function (err) {});
```
<a name="Call+reject"></a>

### call.reject(callId, [callback]) ⇒ <code>Promise</code>
Reject an incoming call

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the incoming call |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Promise
client.Call.reject("callID").then(function () {});

//Callback
client.Call.reject("callID", function (err) {});
```
<a name="Call+hangup"></a>

### call.hangup(callId, [callback]) ⇒ <code>Promise</code>
Complete active call

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Promise
client.Call.hangup("callID").then(function () {});

//Callback
client.Call.hangup("callID", function (err) {});
```
<a name="Call+transfer"></a>

### call.transfer(params, [callback]) ⇒ <code>[CallResponse](#CallResponse)</code>
Transfer a call

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>[CallResponse](#CallResponse)</code> - A promise for the transfered call  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Parameters for transfering of the call |
| params.transferTo | <code>String</code> |  | Phone number or SIP address that the call is going to be transferred to. |
| [params.transferCallerId] | <code>String</code> |  | The caller id that will be used when the call is transferred see the [docs](http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallId) for supported options. |
| [params.whisperAudio] | <code>Object</code> |  | Audio to be played to the caller that the call will be transferred to. Uses the same parameters as call.playAudioAdvanced. See the [docs](http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio). |
| [params.whisperAudio.gender] | <code>String</code> | <code>female</code> | The gender of the voice used to synthesize the sentence |
| [params.whisperAudio.voice] | <code>String</code> | <code>Susan</code> | The voice to speak the sentence |
| [params.whisperAudio.locale] | <code>String</code> | <code>en_US</code> | The locale used to get the accent of the voice used to synthesize the sentence. |
| [params.whisperAudio.fileUrl] | <code>String</code> |  | The location of an audio file to play WAV and MP3 supported |
| [params.whisperAudio.loopEnabled] | <code>Boolean</code> | <code>false</code> | Loop media |
| [callback] | <code>function</code> |  | Callback with the transfered call |

**Example**  
```js
//Transfer call
var speakSentence = {
	transferTo       : "+15555555555",
	transferCallerId : "private",
	whisperAudio     : {
		sentence : "You have an incoming call",
		gender   : "female",
		voice    : "julie",
		locale   : "en"
	}
};

//Using Promises
client.Call.transfer("callId", speakSentence).then(function (res) {});

var playAudio = {
	fileUrl     : "http://mysite.com/file.wav",
	loopEnabled : true
}
//Using callbacks
client.Call.transfer("callId", playAudio, function (err, res) {});
```
<a name="Call+speakSentence"></a>

### call.speakSentence(callId, sentence, [callback]) ⇒ <code>Promise</code>
Speak sentence to the call using default values

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| sentence | <code>String</code> | A sentence to speak to the call. |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Speak sentence in a call

//Promise
client.Call.speakSentence("callID", "Hello From Bandwidth").then(function (res) {});

//Callback
client.Call.speakSentence("callID", "Hello From Bandwidth", function (err, res) {});
```
<a name="Call+playAudioFile"></a>

### call.playAudioFile(callId, fileUrl, [callback]) ⇒ <code>Promise</code>
Play audio url to the call

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| fileUrl | <code>String</code> | The http location of an audio file to play (WAV and MP3 supported). |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Play Audio file on call

//Promise
client.Call.playAudioFile("callId", "http://myurl.com/file.mp3").then(function (res) {});

//Callback
client.Call.playAudioFile("callId", "http://myurl.com/file.wav", function (err, res) {});
```
<a name="Call+playAudioAdvanced"></a>

### call.playAudioAdvanced(callId, params, [callback]) ⇒ <code>Promise</code>
Play audio file or speak sentence in call

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callId | <code>String</code> |  | The ID of the call |
| params | <code>Object</code> |  | Parameters to play audio in call. |
| [params.fileUrl] | <code>String</code> |  | The http location of an audio file to play (WAV and MP3 supported). |
| [params.sentence] | <code>String</code> |  | The sentence to speak. |
| [params.gender] | <code>String</code> | <code>female</code> | The gender of the voice used to synthesize the sentence. It will be considered only if sentence is not null. The female gender will be used by default. |
| [params.locale] | <code>String</code> | <code>en_US</code> | The locale used to get the accent of the voice used to synthesize the sentence. Check out [docs](http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio) for list of supported locales. It will be considered only if sentence is not null/empty. The en_US will be used by default. |
| [params.voice] | <code>String</code> | <code>Susan</code> | The voice to speak the sentence. Check out [docs](http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio) for list of supported voices It will be considered only if sentence is not null/empty. Susan's voice will be used by default. |
| [params.loopEnabled] | <code>Boolean</code> | <code>false</code> | When value is true, the audio will keep playing in a loop. Default: false. |
| [callback] | <code>function</code> |  | Callback for the operation |

**Example**  
```js
//Play Audio File on loop
var options = {
	fileUrl     : "http://myurl.com/file.mp3",
	loopEnabled : true
}
//Promise
client.Call.playAudioAdvanced("callId", options).then(function (res) {});

//Callback
client.Call.playAudioAdvanced("callId", options, function (err,res) {});
```
**Example**  
```js
//Speak sentence with options
var options = {
	sentence : "hola de Bandwidth",
	gender   : "male",
	locale   : "es",
	voice    : "Jorge"
}
//Promise
client.Call.playAudioAdvanced("callId", options).then(function (res) {});

//Callback
client.Call.playAudioAdvanced("callId", options, function (err,res) {});
```
<a name="Call+enableRecording"></a>

### call.enableRecording(callId, [callback]) ⇒ <code>Promise</code>
Turns on call recording for the active call

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Turn on recording

//Promise
client.Call.enableRecording("callId").then(function (res) {});

//Callback
client.Call.enableRecording("callId", function (err, res) {});
```
<a name="Call+createGather"></a>

### call.createGather(callId, params, [callback]) ⇒ <code>[CallResponse](#CallResponse)</code>
Collects a series of DTMF digits from a phone call with an optional prompt.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>[CallResponse](#CallResponse)</code> - A promise for the newly created call  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| callId | <code>String</code> |  | The ID of the call |
| params | <code>Object</code> |  | Parameters for creating a gather |
| [params.maxDigits] | <code>String</code> |  | The maximum number of digits to collect (max: 30) |
| [params.interDigitTimeout] | <code>String</code> | <code>5</code> | Stop gathering if a DTMF digit is not detected in this many seconds (max: 30s) |
| [params.terminatingDigits] | <code>String</code> | <code>#</code> | A string of DTMF digits that end the gather operation immediately if any one of them is detected |
| [params.tag] | <code>String</code> |  | A string you choose that will be included with the response and events for this gather operation. |
| [params.prompt.sentence] | <code>String</code> |  | The text to speak for the prompt. Uses the same defaults as call.playAudioAdvanced. See the [docs](http://ap.bandwidth.com/docs/rest-api/calls/#resourcePOSTv1usersuserIdcallscallIdaudio) |
| [params.prompt.gender] | <code>String</code> |  | The gender to use for the voice reading the prompt sentence |
| [params.prompt.locale] | <code>String</code> |  | The language and region to use for the voice reading the prompt sentence |
| [params.prompt.loopEnabled] | <code>Boolean</code> | <code>false</code> | When value is true, the audio will keep playing in a loop |
| [params.prompt.bargeable] | <code>Boolean</code> | <code>true</code> | Make the prompt (audio or sentence) bargeable (will be interrupted at first digit gathered). |
| [params.prompt.fileUrl] | <code>Strings</code> |  | Make the prompt (audio or sentence) bargeable (will be interrupted at first digit gathered). |
| [callback] | <code>function</code> |  | Callback with the newly created call |

**Example**  
```js
//Create Gather
//The gather ends if either 0, #, or * is detected
var options = {
	maxDigits         : 30,
	interDigitTimeout : "30",
	terminatingDigits : "0#*",
	prompt            : {
		sentence    : "Please enter your account number and press pound",
		gender      : "male",
		voice       : "Simon",
		locale      : "en_UK",
		loopEnabled : true,
		bargeable   : true
	}
};
//Promise
client.Call.createGather("callId", options).then(function(res) {});

//Callback
client.Call.createGather("callId", options, function(err, res) {});
```
<a name="Call+getGather"></a>

### call.getGather(callId, gatherId, [callback]) ⇒ <code>[GatherResponse](#GatherResponse)</code>
Get the gather DTMF parameters and results.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>[GatherResponse](#GatherResponse)</code> - A promise for the gather  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| gatherId | <code>String</code> | The ID of the gather |
| [callback] | <code>function</code> | Callback with the gather |

<a name="Call+completeGather"></a>

### call.completeGather(callId, gatherId, [callback]) ⇒ <code>Promise</code>
Complete the gather.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| gatherId | <code>String</code> | The ID of the gather |
| [callback] | <code>function</code> | Callback of the operation |

<a name="Call+getEvents"></a>

### call.getEvents(callId, [callback]) ⇒ <code>[Array.&lt;EventResponse&gt;](#EventResponse)</code>
Get events for the call.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>[Array.&lt;EventResponse&gt;](#EventResponse)</code> - A promise for the event list  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| [callback] | <code>function</code> | Callback with the event list |

**Example**  
```js
// Promise
client.Call.getEvents(callId).then(function (events) {});
// Callback
client.Call.getEvents(callId, function (err, events) {});
```
<a name="Call+getEvent"></a>

### call.getEvent(callId, eventId, [callback]) ⇒ <code>[EventResponse](#EventResponse)</code>
Get a single event for the call.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>[EventResponse](#EventResponse)</code> - A promise for the event list  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| eventId | <code>String</code> | The ID of the event to get |
| [callback] | <code>function</code> | Callback with the event list |

**Example**  
```js
// Promise
client.Call.getEvent(callId, evenId).then(function (callEvent) {});
// Callback
client.Call.getEvent(callId, eventId, function (err, callEvent) {});
```
<a name="Call+getRecordings"></a>

### call.getRecordings(callId, [callback]) ⇒ <code>[Array.&lt;RecordingResponse&gt;](#RecordingResponse)</code>
Get recordings for the call.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>[Array.&lt;RecordingResponse&gt;](#RecordingResponse)</code> - A promise for the recording list  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| [callback] | <code>function</code> | Callback with the recording list |

**Example**  
```js
// Promise
client.Call.getRecordings(callId).then(function (list) {});
// Callback
client.Call.getRecordings(callId, function (err, list) {});
```
<a name="Call+getTranscriptions"></a>

### call.getTranscriptions(callId, [callback]) ⇒ <code>[Array.&lt;TranscriptionResponse&gt;](#TranscriptionResponse)</code>
Get transcriptions for the call.

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>[Array.&lt;TranscriptionResponse&gt;](#TranscriptionResponse)</code> - A promise for the transcription list  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| [callback] | <code>function</code> | Callback with the transcription list |

**Example**  
```js
// Promise
client.Call.getTranscriptions(callId).then(function (list) {});
// Callback
client.Call.getTranscriptions(callId, function (err, list) {});
```
<a name="Call+sendDtmf"></a>

### call.sendDtmf(callId, dtmfOut, [callback]) ⇒ <code>Promise</code>
Send DTMF (phone keypad digit presses).

**Kind**: instance method of <code>[Call](#Call)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| callId | <code>String</code> | The ID of the call |
| dtmfOut | <code>String</code> | String containing the DTMF characters to be sent in a call. |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
// Promise
client.Call.sendDtmf(callId, "1").then(function () {});
// Callback
client.Call.sendDtmf(callId, "1", function (err) {});
```
<a name="CallResponse"></a>

## CallResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>String</code> |  | The unique ID of the call. |
| direction | <code>String</code> |  | Call direction: values are 'in' for an incoming call, 'out' for an outgoing call |
| from | <code>String</code> |  | The phone number or SIP address that made the call. Phone numbers are in E.164 format (e.g. +15555555555) -or- SIP addresses (e.g. identify@domain.com). |
| to | <code>String</code> |  | The phone number or SIP address that received the call. Phone numbers are in E.164 format (e.g. +15555555555) -or- SIP addresses (e.g. identify@domain.com). |
| state | <code>String</code> |  | The call state. Described below, values are 'started' 'rejected' 'active' 'completed' 'transferring' |
| startTime | <code>String</code> |  | Date when the call was created. Timestamp follows the ISO8601 format. |
| activeTime | <code>String</code> |  | Date when the call was answered. Timestamp follows the ISO8601 format. |
| endTime | <code>String</code> |  | Date when the call ended. Timestamp follows the ISO8601 format. |
| callTimeout | <code>Number</code> |  | Determine how long should the platform wait for call answer before timing out in seconds |
| callbackUrl | <code>String</code> |  | The server URL where the call events related to the call will be sent. |
| callbackHttpMethod | <code>String</code> |  | Determine if the callback event should be sent via HTTP GET or HTTP POST. Values are 'get' or 'post' Default is 'post' |
| callbackTimeout | <code>Number</code> |  | Determine how long should the platform wait for callbackUrl's response before timing out (milliseconds). |
| fallbackUrl | <code>String</code> |  | The server URL used to send the call events if the request to callbackUrl fails. |
| chargeableDuration | <code>Number</code> |  | The number of seconds the call will be billed for. |
| transferTo | <code>String</code> |  | Phone number or SIP address that the call is going to be transferred to. |
| transferCallerId | <code>String</code> |  | This is the caller id that will be used when the call is transferred. This parameter is only considered in transfer state. |
| whisperAudio | <code>String</code> |  | Audio to be played to the caller that the call will be transferred to. |
| bridgeId | <code>String</code> |  | The id of the bridge where the call will be added. |
| bridge | <code>String</code> |  | The URL of the bridge, if any, that contains the call. |
| conferenceId | <code>String</code> |  | The id of the conference where the call will be added. This property is required if you want to add this call to a conference. |
| conference | <code>String</code> |  | The complete URL of the conference resource the call is associated with. |
| events | <code>String</code> |  | The URL to retrieve the events related to the call. |
| recordingEnabled | <code>String</code> | <code>false</code> | Indicates if the call should be recorded after being created. Set to 'true' to enable. Default is 'false' |
| recordingFileFormat | <code>String</code> | <code>wav</code> | The file format of the recorded call. Supported values are 'wav' (default) and 'mp3'. |
| recordingMaxDuration | <code>Number</code> | <code>3600</code> | Indicates the maximum duration of call recording in seconds. Default value is 1 hour. |
| transcriptionEnabled | <code>Boolean</code> |  | Whether all the recordings for this call should be be automatically transcribed. tag Any string, it will be included in the callback events of the call. |
| page | <code>Number</code> | <code>0</code> | Used for pagination to indicate the page requested for querying a list of calls. If no value is specified the default is 0. |
| size | <code>Number</code> | <code>25</code> | Used for pagination to indicate the size of each page requested for querying a list of calls. If no value is specified the default value is 25 (maximum value 1000). |
| sipHeaders | <code>Object</code> |  | Map of Sip headers prefixed by "X-". Up to 5 headers can be sent per call. Max length for header and value is 256 characters. |

<a name="GatherResponse"></a>

## GatherResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique ID of the gather. |
| state | <code>String</code> | The state of the gather. |
| reason | <code>String</code> | The reason of completing of the gather. |
| createdTime | <code>String</code> | Time of creation of the gather. |
| completedTime | <code>String</code> | TIme of completion of the gather. |
| digits | <code>String</code> | Gathered digits. |

<a name="EventResponse"></a>

## EventResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The call event id. |
| time | <code>String</code> | The time the event occurred. |
| name | <code>String</code> | The name of the event. |
| data | <code>String</code> | Data about event. |

<a name="RecordingResponse"></a>

## RecordingResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The recording id. |
| startTime | <code>String</code> | Date/time when the recording started. |
| endTime | <code>String</code> | Date/time when the recording ended. |
| call | <code>String</code> | The complete URL to the call resource this recording is associated with. |
| media | <code>String</code> | The complete URL to the media resource this recording is associated with. |
| state | <code>String</code> | The state of the recording |

<a name="TranscriptionResponse"></a>

## TranscriptionResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The transcription id. |
| state | <code>String</code> | The state of the transcription |
| text | <code>String</code> | The transcribed text (only first 1000 characters) |
| time | <code>String</code> | The date/time the transcription resource was created |
| chargeableDuration | <code>Number</code> | The seconds between activeTime and endTime for the recording;  this is the time that is going to be used to charge the resource. |
| textSize | <code>Number</code> | The size of the transcribed text. |
| textUrl | <code>String</code> | An url to the full text |

<a name="Conference"></a>

## Conference
**Kind**: global class  

* [Conference](#Conference)
    * [new Conference()](#new_Conference_new)
    * [.create(params, [callback])](#Conference+create) ⇒ <code>[ConferenceResponse](#ConferenceResponse)</code>
    * [.get(conferenceId, [callback])](#Conference+get) ⇒ <code>[ConferenceResponse](#ConferenceResponse)</code>
    * [.update(conferenceId, params, [callback])](#Conference+update) ⇒ <code>Promise</code>
    * [.remove(conferenceId, [callback])](#Conference+remove) ⇒ <code>Promise</code>
    * [.speakSentence(conferenceId, sentence, [callback])](#Conference+speakSentence) ⇒ <code>Promise</code>
    * [.playAudioFile(conferenceId, fileUrl, [callback])](#Conference+playAudioFile) ⇒ <code>Promise</code>
    * [.playAudioAdvanced(conferenceId, params, [callback])](#Conference+playAudioAdvanced) ⇒ <code>Promise</code>
    * [.getMembers(conferenceId, callback)](#Conference+getMembers) ⇒ <code>Promise</code>
    * [.getMember(conferenceId, memberId, callback)](#Conference+getMember) ⇒ <code>Promise</code>
    * [.createMember(params, [callback])](#Conference+createMember) ⇒ <code>[ConferenceResponse](#ConferenceResponse)</code>
    * [.updateMember(conferenceId, memberId, params, [callback])](#Conference+updateMember) ⇒ <code>Promise</code>
    * [.removeMember(conferenceId, memberId, [callback])](#Conference+removeMember) ⇒ <code>Promise</code>
    * [.speakSentenceToMember(conferenceId, memberId, sentence, [callback])](#Conference+speakSentenceToMember) ⇒ <code>Promise</code>
    * [.playAudioFileToMember(conferenceId, memberId, fileUrl, [callback])](#Conference+playAudioFileToMember) ⇒ <code>Promise</code>
    * [.playAudioAdvancedToMember(conferenceId, memberId, params, [callback])](#Conference+playAudioAdvancedToMember) ⇒ <code>Promise</code>

<a name="new_Conference_new"></a>

### new Conference()
Conference

<a name="Conference+create"></a>

### conference.create(params, [callback]) ⇒ <code>[ConferenceResponse](#ConferenceResponse)</code>
Create a new conference

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>[ConferenceResponse](#ConferenceResponse)</code> - A promise for the newly created conference  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Parameters for creating a conference |
| params.from | <code>String</code> |  | The phone number that will host the conference. |
| [params.callbackUrl] | <code>String</code> |  | The complete URL where the events related to the Conference will be sent to. |
| [params.callbackHttpMethod] | <code>String</code> | <code>post</code> | Determine if the callback event should be sent via HTTP GET or HTTP POST. |
| [params.callbackTimeout] | <code>String</code> |  | Determine how long should the platform wait for callbackUrl's response before timing out in milliseconds. |
| [params.fallbackUrl] | <code>String</code> |  | Determine how long should the platform wait for callbackUrl's response before timing out in milliseconds. |
| [params.tag] | <code>String</code> |  | A string that will be included in the callback events of the conference. |
| [callback] | <code>function</code> |  | Callback with the newly created conference |

**Example**  
```js
// Promise
client.Conference.create({from: "+1234567890"}).then(function(conference){});
// Callback
client.Conference.create({from: "+1234567890"}, function(err, conference){});
```
<a name="Conference+get"></a>

### conference.get(conferenceId, [callback]) ⇒ <code>[ConferenceResponse](#ConferenceResponse)</code>
Gets information about a conference.

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>[ConferenceResponse](#ConferenceResponse)</code> - A promise for the conference information  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference to get |
| [callback] | <code>function</code> | A callback with the conference information |

**Example**  
```js
// Promise
client.Conference.get("conferenceId").then(function(conference){});
// Callback
client.Conference.get("conferenceId", function(err, conference){});
```
<a name="Conference+update"></a>

### conference.update(conferenceId, params, [callback]) ⇒ <code>Promise</code>
Update the conference

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| conferenceId | <code>String</code> |  | The ID of the conference |
| params | <code>Object</code> |  | Changed parameters of the conference |
| [params.state] | <code>String</code> |  | Conference state. Possible state values are: "completed" to terminate the conference. |
| [params.hold] | <code>String</code> |  | If "true", all member can't hear or speak in the conference. If "false", all members can hear and speak in the conference (unless set at the member level). |
| [params.mute] | <code>String</code> |  | If "true", all member can't speak in the conference. If "false", all members can speak in the conference (unless set at the member level). |
| [params.callbackUrl] | <code>String</code> |  | The complete URL where the events related to the Conference will be sent to. |
| [params.callbackHttpMethod] | <code>String</code> | <code>post</code> | Determine if the callback event should be sent via HTTP GET or HTTP POST. |
| [params.callbackTimeout] | <code>String</code> |  | Determine how long should the platform wait for callbackUrl's response before timing out in milliseconds. |
| [params.fallbackUrl] | <code>String</code> |  | Determine how long should the platform wait for callbackUrl's response before timing out in milliseconds. |
| [params.tag] | <code>String</code> |  | A string that will be included in the callback events of the conference. |
| [callback] | <code>function</code> |  | Callback for the operation |

**Example**  
```js
// Promise
client.Conference.update("conferenceID", {mute: "true"}).then(function(){});
// Callback
client.Conference.update("conferenceID", {mute: "true"}, function(err){});
```
<a name="Conference+remove"></a>

### conference.remove(conferenceId, [callback]) ⇒ <code>Promise</code>
Remove the conference

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
// Promise
client.Conference.remove("conferenceID").then(function(){});
// Callback
client.Conference.remove("conferenceID", function(err){});
```
<a name="Conference+speakSentence"></a>

### conference.speakSentence(conferenceId, sentence, [callback]) ⇒ <code>Promise</code>
Speak sentence to the conference using default values

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference |
| sentence | <code>String</code> | A sentence to speak to the conference. |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Speak sentence in a conference

//Promise
client.Conference.speakSentence("conferenceID", "Hello From Bandwidth").then(function (res) {});

//Callback
client.Conference.speakSentence("conferenceID", "Hello From Bandwidth", function (err, res) {});
```
<a name="Conference+playAudioFile"></a>

### conference.playAudioFile(conferenceId, fileUrl, [callback]) ⇒ <code>Promise</code>
Play audio url to the conference

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference |
| fileUrl | <code>String</code> | The http location of an audio file to play (WAV and MP3 supported). |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Play Audio file on conference

//Promise
client.Conference.playAudioFile("conferenceID", "http://myurl.com/file.mp3").then(function (res) {});

//Callback
client.Conference.playAudioFile("conferenceID", "http://myurl.com/file.wav", function (err, res) {});
```
<a name="Conference+playAudioAdvanced"></a>

### conference.playAudioAdvanced(conferenceId, params, [callback]) ⇒ <code>Promise</code>
Play audio file or speak sentence in conference

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| conferenceId | <code>String</code> |  | The ID of the conference |
| params | <code>Object</code> |  | Parameters to play audio in conference. |
| [params.fileUrl] | <code>String</code> |  | The http location of an audio file to play (WAV and MP3 supported). |
| [params.sentence] | <code>String</code> |  | The sentence to speak. |
| [params.gender] | <code>String</code> | <code>female</code> | The gender of the voice used to synthesize the sentence. It will be considered only if sentence is not null. The female gender will be used by default. |
| [params.locale] | <code>String</code> | <code>en_US</code> | The locale used to get the accent of the voice used to synthesize the sentence. It will be considered only if sentence is not null/empty. The en_US will be used by default. |
| [params.voice] | <code>String</code> | <code>Susan</code> | The voice to speak the sentence. for list of supported voices It will be considered only if sentence is not null/empty. Susan's voice will be used by default. |
| [params.loopEnabled] | <code>Boolean</code> | <code>false</code> | When value is true, the audio will keep playing in a loop. Default: false. |
| [callback] | <code>function</code> |  | Callback for the operation |

**Example**  
```js
//Play Audio File on loop
var options = {
	fileUrl     : "http://myurl.com/file.mp3",
	loopEnabled : true
}
//Promise
client.Conference.playAudioAdvanced("conferenceId", options).then(function (res) {});

//Callback
client.Conference.playAudioAdvanced("conferenceId", options, function (err,res) {});
```
**Example**  
```js
//Speak sentence with options
var options = {
	sentence : "hola de Bandwidth",
	gender   : "male",
	locale   : "es",
	voice    : "Jorge"
}
//Promise
client.Conference.playAudioAdvanced("conferenceId", options).then(function (res) {});

//Callback
client.Conference.playAudioAdvanced("conferenceId", options, function (err,res) {});
```
<a name="Conference+getMembers"></a>

### conference.getMembers(conferenceId, callback) ⇒ <code>Promise</code>
Gets information about a conference members.

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for member list  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference to get memebers |
| callback | <code>function</code> | A callback with member list |

**Example**  
```js
// Promise
client.Conference.getMembers("conferenceId").then(function(members){});
// Callback
client.Conference.getMembers("conferenceId", function(err, members){});
```
<a name="Conference+getMember"></a>

### conference.getMember(conferenceId, memberId, callback) ⇒ <code>Promise</code>
Gets information about a single conference member.

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the member  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference |
| memberId | <code>String</code> | The ID of the member |
| callback | <code>function</code> | A callback with the member |

**Example**  
```js
// Promise
client.Conference.getMember("conferenceId", "memberId").then(function(member){});
// Callback
client.Conference.getMember("conferenceId", "memberId", function(err, member){});
```
<a name="Conference+createMember"></a>

### conference.createMember(params, [callback]) ⇒ <code>[ConferenceResponse](#ConferenceResponse)</code>
Add members to a conference.

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>[ConferenceResponse](#ConferenceResponse)</code> - A promise for the added member  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Parameters for new member |
| params.callId | <code>String</code> | The callId must refer to an active call that was created using this conferenceId. |
| [params.joinTone] | <code>String</code> | If "true", will play a tone when the member joins the conference. If "false", no tone is played when the member joins the conference. |
| [params.leavingTone] | <code>String</code> | If "true", will play a tone when the member leaves the conference. If "false", no tone is played when the member leaves the conference. |
| [params.mute] | <code>String</code> | If "true", member can't speak in the conference. If "false", this members can speak in the conference (unless set at the conference level). |
| [params.hold] | <code>String</code> | If "true", member can't hear or speak in the conference. If "false", member can hear and speak in the conference (unless set at the conference level). |
| [callback] | <code>function</code> | Callback with the added member |

**Example**  
```js
// Promise
client.Conference.createMember("conferenceId", {callId: "callID"}).then(function(member){});
// Callback
client.Conference.createMember("conferenceId", {callId: "callID"}, function(err, member){});
```
<a name="Conference+updateMember"></a>

### conference.updateMember(conferenceId, memberId, params, [callback]) ⇒ <code>Promise</code>
Update the conference member

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference |
| memberId | <code>String</code> | The ID of the member |
| params | <code>Object</code> | Changed parameters of the member |
| [params.joinTone] | <code>String</code> | If "true", will play a tone when the member joins the conference. If "false", no tone is played when the member joins the conference. |
| [params.leavingTone] | <code>String</code> | If "true", will play a tone when the member leaves the conference. If "false", no tone is played when the member leaves the conference. |
| [params.mute] | <code>String</code> | If "true", member can't speak in the conference. If "false", this members can speak in the conference (unless set at the conference level). |
| [params.hold] | <code>String</code> | If "true", member can't hear or speak in the conference. If "false", member can hear and speak in the conference (unless set at the conference level). |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
// Promise
client.Conference.updateMember("conferenceID", "memberId", {mute: "true"}).then(function(){});
// Callback
client.Conference.updateMember("conferenceID", "memberId", {mute: "true"}, function(err){});
```
<a name="Conference+removeMember"></a>

### conference.removeMember(conferenceId, memberId, [callback]) ⇒ <code>Promise</code>
Remove the conference member

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference |
| memberId | <code>String</code> | The ID of the member |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
// Promise
client.Conference.removeMember("conferenceID", "memberId").then(function(){});
// Callback
client.Conference.removeMember("conferenceID", "memberId", function(err){});
```
<a name="Conference+speakSentenceToMember"></a>

### conference.speakSentenceToMember(conferenceId, memberId, sentence, [callback]) ⇒ <code>Promise</code>
Speak sentence to the conference member using default values

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference |
| memberId | <code>String</code> | The ID of the member |
| sentence | <code>String</code> | A sentence to speak to the member. |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Speak sentence

//Promise
client.Conference.speakSentenceToMember("conferenceID", "memberID", Hello From Bandwidth")
  .then(function (res) {});

//Callback
client.Conference.speakSentenceToMember("conferenceID", "memberID", "Hello From Bandwidth",
  function (err, res) {});
```
<a name="Conference+playAudioFileToMember"></a>

### conference.playAudioFileToMember(conferenceId, memberId, fileUrl, [callback]) ⇒ <code>Promise</code>
Play audio url to the conference member

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| conferenceId | <code>String</code> | The ID of the conference |
| memberId | <code>String</code> | The ID of the member |
| fileUrl | <code>String</code> | The http location of an audio file to play (WAV and MP3 supported). |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
//Play Audio file

//Promise
client.Conference.playAudioFileToMember("conferenceID", "memberId", http://myurl.com/file.mp3")
  .then(function (res) {});

//Callback
client.Conference.playAudioFileToMember("conferenceID", "memberId", http://myurl.com/file.wav",
   function (err, res) {});
```
<a name="Conference+playAudioAdvancedToMember"></a>

### conference.playAudioAdvancedToMember(conferenceId, memberId, params, [callback]) ⇒ <code>Promise</code>
Play audio file or speak sentence to the conference member

**Kind**: instance method of <code>[Conference](#Conference)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| conferenceId | <code>String</code> |  | The ID of the conference |
| memberId | <code>String</code> |  | The ID of the member |
| params | <code>Object</code> |  | Parameters to play audio. |
| [params.fileUrl] | <code>String</code> |  | The http location of an audio file to play (WAV and MP3 supported). |
| [params.sentence] | <code>String</code> |  | The sentence to speak. |
| [params.gender] | <code>String</code> | <code>female</code> | The gender of the voice used to synthesize the sentence. It will be considered only if sentence is not null. The female gender will be used by default. |
| [params.locale] | <code>String</code> | <code>en_US</code> | The locale used to get the accent of the voice used to synthesize the sentence. It will be considered only if sentence is not null/empty. The en_US will be used by default. |
| [params.voice] | <code>String</code> | <code>Susan</code> | The voice to speak the sentence. It will be considered only if sentence is not null/empty. Susan's voice will be used by default. |
| [params.loopEnabled] | <code>Boolean</code> | <code>false</code> | When value is true, the audio will keep playing in a loop. Default: false. |
| [callback] | <code>function</code> |  | Callback for the operation |

**Example**  
```js
//Play Audio File on loop
var options = {
	fileUrl     : "http://myurl.com/file.mp3",
	loopEnabled : true
}
//Promise
client.Conference.playAudioAdvancedToMember("conferenceId", "memberId", options)
 .then(function (res) {});

//Callback
client.Conference.playAudioAdvancedToMember("conferenceId", "memberId", options,
  function (err,res) {});
```
**Example**  
```js
//Speak sentence with options
var options = {
	sentence : "hola de Bandwidth",
	gender   : "male",
	locale   : "es",
	voice    : "Jorge"
}
//Promise
client.Conference.playAudioAdvancedToMember("conferenceId", "memberId", options)
  .then(function (res) {});

//Callback
client.Conference.playAudioAdvanced("conferenceId", options, function (err,res) {});
```
<a name="ConferenceResponse"></a>

## ConferenceResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique ID of the conference. |
| state | <code>String</code> | Conference state. Possible state values are described here. |
| from | <code>String</code> | The phone number that will host the conference. |
| createdTime | <code>String</code> | The time that the Conference was created (UTC). |
| completedTime | <code>String</code> | The time that the Conference was completed (UTC). |
| activeMembers | <code>Number</code> | The number of active conference members. |
| hold | <code>String</code> | If "true", all member can't hear or speak in the conference. If "false", all members can hear and speak in the conference (unless set at the member level). |
| mute | <code>String</code> | If "true", all member can't speak in the conference. If "false", all members can speak in the conference (unless set at the member level). |
| callbackUrl | <code>String</code> | The complete URL where the events related to the Conference will be sent to. |
| callbackHttpMethod | <code>String</code> | Determine if the callback event should be sent via HTTP GET or HTTP POST. |
| callbackTimeout | <code>String</code> | Determine how long should the platform wait for callbackUrl's response before timing out in milliseconds. |
| fallbackUrl | <code>String</code> | Determine how long should the platform wait for callbackUrl's response before timing out in milliseconds. |
| tag | <code>String</code> | A string that will be included in the callback events of the conference. |

<a name="Domain"></a>

## Domain
**Kind**: global class  

* [Domain](#Domain)
    * [new Domain()](#new_Domain_new)
    * [.create(params, [callback])](#Domain+create) ⇒ <code>[DomainResponse](#DomainResponse)</code>
    * [.list(callback)](#Domain+list) ⇒ <code>[Array.&lt;DomainResponse&gt;](#DomainResponse)</code>
    * [.delete(domainId, [callback])](#Domain+delete) ⇒ <code>Promise</code>

<a name="new_Domain_new"></a>

### new Domain()
Domain

<a name="Domain+create"></a>

### domain.create(params, [callback]) ⇒ <code>[DomainResponse](#DomainResponse)</code>
Create a domain

**Kind**: instance method of <code>[Domain](#Domain)</code>  
**Returns**: <code>[DomainResponse](#DomainResponse)</code> - A promise for the newly created domain  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Parameters for creating a new domain |
| params.name | <code>String</code> | The name is a unique URI to be used in DNS lookups. |
| params.description | <code>String</code> | String to describe the domain. |
| [callback] | <code>function</code> | Callback with the newly created domain |

<a name="Domain+list"></a>

### domain.list(callback) ⇒ <code>[Array.&lt;DomainResponse&gt;](#DomainResponse)</code>
Gets a list of all domains.

**Kind**: instance method of <code>[Domain](#Domain)</code>  
**Returns**: <code>[Array.&lt;DomainResponse&gt;](#DomainResponse)</code> - A promise for the list of domains.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | A callback with the list of calls |
| [params.size] | <code>Number</code> | the maximum number of domains returned by the query per page (Max size: 100). |

<a name="Domain+delete"></a>

### domain.delete(domainId, [callback]) ⇒ <code>Promise</code>
Delete a domain.

**Kind**: instance method of <code>[Domain](#Domain)</code>  
**Returns**: <code>Promise</code> - A promise for current operation.  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | ID of the domain to delete. |
| [callback] | <code>function</code> | A callback for the domain. |

<a name="DomainResponse"></a>

## DomainResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique identifier for the domain. |
| name | <code>String</code> | A name you choose for this domain. |
| description | <code>String</code> | A description of this domain. |

<a name="Endpoint"></a>

## Endpoint
**Kind**: global class  

* [Endpoint](#Endpoint)
    * [new Endpoint()](#new_Endpoint_new)
    * [.create(domainId, params, [callback])](#Endpoint+create) ⇒ <code>[EndpointResponse](#EndpointResponse)</code>
    * [.list(domainId, params, [callback])](#Endpoint+list) ⇒ <code>[Array.&lt;EndpointResponse&gt;](#EndpointResponse)</code>
    * [.get(domainId, endpointId, [callback])](#Endpoint+get) ⇒ <code>[EndpointResponse](#EndpointResponse)</code>
    * [.delete(domainId, endpointId, [callback])](#Endpoint+delete) ⇒ <code>Promise</code>
    * [.update(domainId, endpointId, params, [callback])](#Endpoint+update) ⇒ <code>Promise</code>
    * [.createAuthToken(domainId, endpointId, params, [callback])](#Endpoint+createAuthToken) ⇒ <code>Promise</code>

<a name="new_Endpoint_new"></a>

### new Endpoint()
Endpoint

<a name="Endpoint+create"></a>

### endpoint.create(domainId, params, [callback]) ⇒ <code>[EndpointResponse](#EndpointResponse)</code>
Create a new endpoint for the domain

**Kind**: instance method of <code>[Endpoint](#Endpoint)</code>  
**Returns**: <code>[EndpointResponse](#EndpointResponse)</code> - A promise for the newly created endpoint  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | Id of domain |
| params | <code>Object</code> | Parameters for creating a new endpoint |
| params.name | <code>String</code> | The endpoint's name, which SIP clients use as the "address of record" . |
| params.description | <code>String</code> | String to describe the endpoint. 0param {String} params.applicationId The id of the application associated with this endpoint. |
| params.enabled | <code>Boolean</code> | Allow or not to receive and make calls. |
| params.credentials | <code>Object</code> | Auth parameters |
| [callback] | <code>function</code> | Callback with the newly created endpoint |

**Example**  
```js
// Promise
client.Endpoint.create("domainId", { name : "my-endpoint", applicationId : "appId",
credentials : { password : "123456" }}).then(function (endpoint) {});
// Callback
client.Endpoint.create("domainId", { name : "my-endpoint", applicationId : "appId",
credentials : { password : "123456" }}, function (err, endpoint) {});
```
<a name="Endpoint+list"></a>

### endpoint.list(domainId, params, [callback]) ⇒ <code>[Array.&lt;EndpointResponse&gt;](#EndpointResponse)</code>
Gets a list of all endpoints for the domain.

**Kind**: instance method of <code>[Endpoint](#Endpoint)</code>  
**Returns**: <code>[Array.&lt;EndpointResponse&gt;](#EndpointResponse)</code> - A promise for the list of endpoints.  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | Id of the domain to list the endpoints |
| params | <code>Object</code> | Parameters for listing endpoints on domain |
| [params.size] | <code>Number</code> | OPTIONAL The maximum number of endpoints returned by the query per page (Max size: 1000). |
| [callback] | <code>function</code> | A callback with the list of endpoints |

**Example**  
```js
// Default size (25) using promises
 client.Endpoint.list("domainId")
 	.then(function (res) {});
```
**Example**  
```js
// Default size (25) using callbacks
client.Endpoint.list("domainId", function (err, res) {});
```
**Example**  
```js
// Specify number of endpoints using promises
client.Endpoint.list("domainId", {size: 1000})
		.then(function (res) {});
```
**Example**  
```js
// Specify number of endpoints using callbacks
client.Endpoint.list("domainId" {size: 1000}, function (err, res) {});
```
<a name="Endpoint+get"></a>

### endpoint.get(domainId, endpointId, [callback]) ⇒ <code>[EndpointResponse](#EndpointResponse)</code>
Get a single endpoint.

**Kind**: instance method of <code>[Endpoint](#Endpoint)</code>  
**Returns**: <code>[EndpointResponse](#EndpointResponse)</code> - A promise for the endpoint.  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | Id of the domain |
| endpointId | <code>String</code> | Id of the endpoint |
| [callback] | <code>function</code> | A callback with the endpoint |

**Example**  
```js
// Promise
client.Endpoint.get(domainId, endpointId).then(function(endpoint){});

// Callback
client.Endpoint.get(domainId, endpointId, function(err, endpoint){});
```
<a name="Endpoint+delete"></a>

### endpoint.delete(domainId, endpointId, [callback]) ⇒ <code>Promise</code>
Delete an endpoint.

**Kind**: instance method of <code>[Endpoint](#Endpoint)</code>  
**Returns**: <code>Promise</code> - A promise for current operation.  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | Id of domain |
| endpointId | <code>String</code> | ID of the endpoint to delete. |
| [callback] | <code>function</code> | A callback for the operation. |

**Example**  
```js
// Promise
client.Endpoint.delete("domainId", "endpointId").then(function (endpoint) {});
// Callback
client.Endpoint.delete("domainId", "endpointId", function (err, endpoint) {});
```
<a name="Endpoint+update"></a>

### endpoint.update(domainId, endpointId, params, [callback]) ⇒ <code>Promise</code>
Update an endpoint.

**Kind**: instance method of <code>[Endpoint](#Endpoint)</code>  
**Returns**: <code>Promise</code> - A promise for current operation.  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | Id of domain |
| endpointId | <code>String</code> | ID of the endpoint to update. |
| params | <code>Object</code> | Changed parameters for the endpoint |
| params.description | <code>String</code> | String to describe the endpoint. 0param {String} params.applicationId The id of the application associated with this endpoint. |
| params.enabled | <code>Boolean</code> | Allow or not to receive and make calls. |
| params.credentials | <code>Object</code> | Auth parameters |
| [callback] | <code>function</code> | A callback for the operation. |

**Example**  
```js
// Promise
client.Endpoint.update("domainId", "endpointId", { enabled : true }).then(function (endpoint) {});
// Callback
client.Endpoint.update("domainId", "endpointId", { enabled : true }, function (err, endpoint) {});
```
<a name="Endpoint+createAuthToken"></a>

### endpoint.createAuthToken(domainId, endpointId, params, [callback]) ⇒ <code>Promise</code>
Generate auth token for the endpoint.

**Kind**: instance method of <code>[Endpoint](#Endpoint)</code>  
**Returns**: <code>Promise</code> - A promise with token value.  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | Id of domain |
| endpointId | <code>String</code> | ID of the endpoint to update. |
| params | <code>Object</code> | parameters of token. |
| params.expires | <code>Number</code> | Expiration time of token in seconds |
| [callback] | <code>function</code> | A callback with token value. |

**Example**  
```js
// Promise
client.Endpoint.createAuthToken("domainId", "endpointId", { expires : 3600 }).then(function (endpoint) {});
// Callback
client.Endpoint.createAuthToken("domainId", "endpointId", { expires : 3600 }, function (err, endpoint) {});
```
<a name="EndpointResponse"></a>

## EndpointResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique identifier for the application. |

<a name="new_EndpointResponse_new"></a>

### new EndpointResponse(name, description, enabled, credentials)

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The endpoint's name, which SIP clients use as the "address of record" . |
| description | <code>String</code> | String to describe the endpoint. 0param {String} applicationId The id of the application associated with this endpoint. |
| enabled | <code>Boolean</code> | Allow or not to receive and make calls. |
| credentials | <code>Object</code> | Auth parameters |

<a name="Error"></a>

## Error
**Kind**: global class  

* [Error](#Error)
    * [new Error()](#new_Error_new)
    * [.get(errorId, [callback])](#Error+get) ⇒ <code>[ErrorResponse](#ErrorResponse)</code>
    * [.list(params, [callback])](#Error+list) ⇒ <code>[Array.&lt;ErrorResponse&gt;](#ErrorResponse)</code>

<a name="new_Error_new"></a>

### new Error()
Error

<a name="Error+get"></a>

### error.get(errorId, [callback]) ⇒ <code>[ErrorResponse](#ErrorResponse)</code>
Gets information about a error.

**Kind**: instance method of <code>[Error](#Error)</code>  
**Returns**: <code>[ErrorResponse](#ErrorResponse)</code> - A promise for the error information  

| Param | Type | Description |
| --- | --- | --- |
| errorId | <code>String</code> | The ID of the error to get |
| [callback] | <code>function</code> | A callback with the error information |

**Example**  
```js
// Promise
client.Error.get(errorId).then(function(errorInfo){});

// Callback
client.Error.get(errorId, function(err, errorInfo){});
```
<a name="Error+list"></a>

### error.list(params, [callback]) ⇒ <code>[Array.&lt;ErrorResponse&gt;](#ErrorResponse)</code>
Gets a list of errors.

**Kind**: instance method of <code>[Error](#Error)</code>  
**Returns**: <code>[Array.&lt;ErrorResponse&gt;](#ErrorResponse)</code> - A promise for the list of errors  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Query parameters for listing errors |
| [params.size] | <code>Number</code> | <code>25</code> | Used for pagination to indicate the size of each page requested for querying a list of errors. If no value is specified the default value is 25. |
| [callback] | <code>function</code> |  | A callback with the list of errors |

**Example**  
```js
// Promise
client.Error.list({size: 1000}).then(function(errorResponse){});

// Callback
client.Error.list({size: 1000}, function(err, errorResponse){});
```
<a name="ErrorResponse"></a>

## ErrorResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique ID of the error. |
| time | <code>String</code> | The time the error occurred (UTC). |
| category | <code>String</code> | The error category. |
| code | <code>String</code> | A specific error code string that identifies the type of error |
| message | <code>String</code> | A message that describes the error condition in detail. |
| details | <code>Object</code> | A list of name/value pairs of additional details. |

<a name="CatapultClient"></a>

## CatapultClient
**Kind**: global class  
<a name="new_CatapultClient_new"></a>

### new CatapultClient(config)
Catapult API Client


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config | <code>Object</code> |  | Client configuration parameters |
| config.userId | <code>String</code> |  | Your Catapult user ID |
| config.apiToken | <code>String</code> |  | Your Catapult API token |
| config.apiSecret | <code>String</code> |  | Your Catapult API secret |
| [config.baseUrl] | <code>String</code> | <code>https://api.catapult.inetwork.com</code> | The catapult base URL. Configurable for using alternative Catapult environments. |

<a name="Media"></a>

## Media
**Kind**: global class  

* [Media](#Media)
    * [new Media()](#new_Media_new)
    * [.upload(name, data, contentType, [callback])](#Media+upload) ⇒ <code>Promise</code>
    * [.download(name, [callback])](#Media+download) ⇒ <code>[DownloadMediaFileResponse](#DownloadMediaFileResponse)</code>
    * [.list([callback])](#Media+list) ⇒ <code>[Array.&lt;MediaFileResponse&gt;](#MediaFileResponse)</code>
    * [.delete(name, [callback])](#Media+delete) ⇒ <code>Promise</code>

<a name="new_Media_new"></a>

### new Media()
Media

<a name="Media+upload"></a>

### media.upload(name, data, contentType, [callback]) ⇒ <code>Promise</code>
Upload a media file

**Kind**: instance method of <code>[Media](#Media)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of uploaded file. |
| data | <code>String</code> &#124; <code>Buffer</code> &#124; <code>Readable</code> | Data to upload. If data is string it should be path to file to upload. |
| contentType | <code>String</code> | Optional MIME type of uploaded data (default: application/octet-stream). |
| [callback] | <code>function</code> | Callback for the operation |

<a name="Media+download"></a>

### media.download(name, [callback]) ⇒ <code>[DownloadMediaFileResponse](#DownloadMediaFileResponse)</code>
Download a media file

**Kind**: instance method of <code>[Media](#Media)</code>  
**Returns**: <code>[DownloadMediaFileResponse](#DownloadMediaFileResponse)</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of downloaded file. |
| [callback] | <code>function</code> | Callback for the operation |

<a name="Media+list"></a>

### media.list([callback]) ⇒ <code>[Array.&lt;MediaFileResponse&gt;](#MediaFileResponse)</code>
Gets a list of your media files.

**Kind**: instance method of <code>[Media](#Media)</code>  
**Returns**: <code>[Array.&lt;MediaFileResponse&gt;](#MediaFileResponse)</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| [callback] | <code>function</code> | Callback for the operation |

<a name="Media+delete"></a>

### media.delete(name, [callback]) ⇒ <code>Promise</code>
Remove a media file

**Kind**: instance method of <code>[Media](#Media)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The name of file to remove. |
| [callback] | <code>function</code> | Callback for the operation |

<a name="DownloadMediaFileResponse"></a>

## DownloadMediaFileResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| contentType | <code>String</code> | MIME type of downloaded file. |
| content | <code>String</code> &#124; <code>Buffer</code> &#124; <code>Readable</code> | Content of file. |

<a name="MediaFileResponse"></a>

## MediaFileResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| mediaName | <code>String</code> | name of media file. |
| contentLength | <code>Number</code> | Length of media file. |

<a name="Message"></a>

## Message
**Kind**: global class  

* [Message](#Message)
    * [new Message(client)](#new_Message_new)
    * [.send(params, [callback])](#Message+send) ⇒ <code>[MessageResponse](#MessageResponse)</code>
    * [.sendMultiple(params, [callback])](#Message+sendMultiple) ⇒ <code>[ExtendedMessageResponse](#ExtendedMessageResponse)</code>
    * [.get(messageId, [callback])](#Message+get) ⇒ <code>[MessageResponse](#MessageResponse)</code>
    * [.list(params, [callback])](#Message+list) ⇒ <code>[MessageListResponse](#MessageListResponse)</code>

<a name="new_Message_new"></a>

### new Message(client)
SMS or MMS Message


| Param | Type | Description |
| --- | --- | --- |
| client | <code>Object</code> | Catapult client |

<a name="Message+send"></a>

### message.send(params, [callback]) ⇒ <code>[MessageResponse](#MessageResponse)</code>
Send a new SMS or MMS message

**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>[MessageResponse](#MessageResponse)</code> - A promise for the new message object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Parameters for sending a new message. |
| params.text | <code>String</code> |  | The message text to send |
| params.from | <code>String</code> |  | The message sender"s telephone number (or short code) This must be a Catapult number that you own |
| [params.to] | <code>String</code> |  | Message recipient telephone number (or short code) |
| [params.media] | <code>Array</code> |  | Json array containing list of media urls to be sent as content for an mms. Valid URLs are: https://api.catapult.inetwork.com/v1/users/<user-id>/media/ We also support media URLs that are external to Bandwidth API, http:// or https:// format: Example: http://customer-web-site.com/file.jpg |
| [params.callbackUrl] | <code>String</code> |  | The complete URL where the events related to the outgoing message will be sent |
| [params.callbackTimeout] | <code>Number</code> |  | Determine how long should the platform wait for callbackUrl"s response before timing out (milliseconds) |
| [params.fallbackUrl] | <code>String</code> |  | The server URL used to send message events if the request to callbackUrl fails |
| [params.tag] | <code>String</code> |  | A string that will be included in the callback events of the message |
| [params.receiptRequested] | <code>String</code> | <code>none</code> | Requested receipt option for outbound messages: `none` `all` `error` |
| [callback] | <code>function</code> |  | A callback for the new message object |

**Example**  
```js
client.Message.send({
  from : "+19195551212",
  to   : "+19195551213",
  text : "Thank you for susbcribing to Unicorn Enterprises!"
})
.then(function(message){
  console.log(message);
});
//{
//  from : "+19195551212",
//  to   : "+19195551213",
//  text : "Thank you for susbcribing to Unicorn Enterprises!",
//  id   : "..."
//}
```
<a name="Message+sendMultiple"></a>

### message.sendMultiple(params, [callback]) ⇒ <code>[ExtendedMessageResponse](#ExtendedMessageResponse)</code>
Send multiple SMS or MMS messages with one API call.
This is much more performant than calling `send` multiple times.

**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>[ExtendedMessageResponse](#ExtendedMessageResponse)</code> - A promise for the array of ExtendedMessageResponses  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Array</code> |  | An array of params objects, each of which represents a single text message. The returned array will be in the same order as this array, so you can iterate over it. |
| params.text | <code>String</code> |  | The message text to send |
| params.from | <code>String</code> |  | The message sender's telephone number (or short code) This must be a Catapult number that you own. |
| params.to | <code>String</code> |  | Message recipient telephone number (or short code) |
| [params.media] | <code>Array</code> |  | Json array containing list of media urls to be sent as content for an mms. Valid URLs are: https://api.catapult.inetwork.com/v1/users/<user-id>/media/ We also support media URLs that are external to Bandwidth API, http:// or https:// format: Example: http://customer-web-site.com/file.jpg |
| [params.callbackUrl] | <code>String</code> |  | The complete URL where the events related to the outgoing message will be sent |
| [params.callbackTimeout] | <code>Number</code> |  | Determine how long should the platform wait for callbackUrl's response before timing out (milliseconds) |
| [params.fallbackUrl] | <code>String</code> |  | The server URL used to send message events if the request to callbackUrl fails |
| [params.tag] | <code>String</code> |  | A string that will be included in the callback events of the message |
| [params.receiptRequested] | <code>String</code> | <code>none</code> | Requested receipt option for outbound messages: `none` `all` `error` |
| [callback] | <code>function</code> |  | A callback for the array of ExtendedMessageResponse |

**Example**  
```js
client.Message.sendMultiple({
  from : "+19195551211",
  to   : "+19195551213",
  text : "Thank you for susbcribing to Unicorn Enterprises!"
}, {
  from : "+19195151212",
  to   : "+19195551214",
  text : "Thank you for susbcribing to Unicorn Enterprises!"
})
.then(function(messages){
  console.log(messages);
});
//[{
//  result : "failed",
//  error: {
//    category : "authorization",
//    code     : "number-access-denied",
//    message  : "User ... does not have permission to use number +19195551211",
//    details  : [
//      {
//        name  : "userId",
//        value : "..."
//      },
//      {
//        name  : "number",
//        value : "+19195551211"
//      }
//    ],
//  },
//  message : {
//    from : "+19195551211",
//    to   : "+19195551213",
//    text : "Thank you for susbcribing to Unicorn Enterprises!"
//  }
//},{
//  result  : "accepted",
//  message : {
//    from : "+19195551212",
//    to   : "+19195551214",
//    text : "Thank you for susbcribing to Unicorn Enterprises!",
//    id   : "..."
//  }
//}]
```
<a name="Message+get"></a>

### message.get(messageId, [callback]) ⇒ <code>[MessageResponse](#MessageResponse)</code>
Get a message

**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>[MessageResponse](#MessageResponse)</code> - A promise for the message  

| Param | Type | Description |
| --- | --- | --- |
| messageId | <code>String</code> | The ID of the message to get |
| [callback] | <code>function</code> | A callback for the message |

<a name="Message+list"></a>

### message.list(params, [callback]) ⇒ <code>[MessageListResponse](#MessageListResponse)</code>
Gets a list of messages

**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>[MessageListResponse](#MessageListResponse)</code> - A promise for the list of messages  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Search parameters |
| [params.from] | <code>String</code> | The phone number to filter the messages that came from (must be in E.164 format, like +19195551212). |
| [params.to] | <code>String</code> | The phone number to filter the messages that was sent to (must be in E.164 format, like +19195551212). |
| [params.fromDateTime] | <code>String</code> | The starting date time to filter the messages (must be in yyyy-MM-dd hh:mm:ss format, like 2014-05-25 12:00:00. You can suppress parts of the date or time, like 2014-05-25, but the missing parameters will be filled with zeros). |
| [params.toDateTime] | <code>String</code> | The ending date time to filter the messages (must be in yyyy-MM-dd hh:mm:ss format, like 2014-05-25 12:00:00. You can suppress parts of the date or time, like 2014-05-25, but the missing parameters will be filled with zeros) |
| [params.size] | <code>Number</code> | Used for pagination to indicate the size of each page requested \ for querying a list of messages. If no value is specified the default value is 25. (Maximum value 1000) |
| [params.direction] | <code>String</code> | Filter by direction of message, in - a message that came from the telephone network to one of your numbers (an "inbound" message) or out - a message that was sent from one of your numbers to the telephone network (an "outbound" message) |
| [params.state] | <code>String</code> | The message state to filter. Values are: received, queued, sending, sent, error |
| [params.deliveryState] | <code>String</code> | The message delivery state to filter. Values are waiting, delivered, not-delivered |
| [params.sortOrder] | <code>String</code> | How to sort the messages. Values are asc or desc If no value is specified the default value is asc |
| [callback] | <code>function</code> | A callback for the list of messages |

**Example**  
```js
//Download the node sdk from ap.bandwidth.com/docs/helper-libraries/node-js
//API credentials which can be found on your account page at https://catapult.inetwork.com/pages/login.jsf
var userId = 'u-userid';  //{user_id}
var token = 't-token'; //{token}
var secret = 'secret'; //{secret}

var Bandwidth = require('node-bandwidth');

var client = new Bandwidth({
	userId: userId,
	apiToken: token,
	apiSecret: secret
});

client.Message.list()
.then(function (response) {
	console.log(response.messages);
	if(response.hasNextPage) {
		return response.getNextPage();
	}
	else {
		return {messages: []};
	}
})
.then(function(response) {
	console.log(response.messages);
});
```
<a name="MessageListResponse"></a>

## MessageListResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| messages | <code>[Array.&lt;MessageResponse&gt;](#MessageResponse)</code> | Array of messages |
| getNextPage | <code>function</code> | Calls the next page function |
| hasNextPage | <code>boolean</code> | True/False flag for next |

<a name="ExtendedMessageResponse"></a>

## ExtendedMessageResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| result | <code>String</code> | Either "accepted" or "failed". |
| The | <code>[MessageResponse](#MessageResponse)</code> | message. Will consist of the params queried with, if the query failed, or the complete message response, if the message was accepted. |
| Defined | <code>[MessageError](#MessageError)</code> | only if result is "failed". |

<a name="MessageError"></a>

## MessageError : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| category | <code>String</code> | The type of error (e.g. "authorization"). |
| code | <code>String</code> | The exact error string provided by the API. |
| message | <code>String</code> | A human-readable error message. |
| details | <code>Object</code> | Additional details on the error. |

<a name="MessageResponse"></a>

## MessageResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique ID of the message. |
| from | <code>String</code> | The message sender's telephone number (or short code). |
| to | <code>String</code> | Message recipient telephone number (or short code). |
| direction | <code>String</code> | Direction of message, in - a message that came from the telephone network to one of your numbers (an "inbound" message) or out - a message that was sent from one of your numbers to the telephone network (an "outbound" message) |
| text | <code>String</code> | The message contents. |
| media | <code>Array</code> | Json array containing list of media urls to be sent as content for an mms. |
| state | <code>String</code> | Message state, values are received, queued, sending, sent, error |
| time | <code>String</code> | The time the message resource was created (UTC, follows the ISO 8601 format). |
| callbackUrl | <code>String</code> | The complete URL where the events related to the outgoing message will be sent. |
| callbackTimeout | <code>Number</code> | Determine how long should the platform wait for callbackUrl's response before timing out. (milliseconds) |
| fallbackUrl | <code>String</code> | The server URL used to send message events if the request to callbackUrl fails. |
| size | <code>Number</code> | Used for pagination to indicate the size of each page requested for querying a list of messages. If no value is specified the default value is 25. (Maximum value 1000) |
| tag | <code>String</code> | A string that will be included in the callback events of the message. |
| receiptRequested | <code>String</code> | Requested receipt option for outbound messages: none, all, error Default is none. |
| deliveryState | <code>String</code> | One of the message delivery states: waiting, delivered, not-delivered. |
| deliveryCode | <code>Number</code> | Numeric value of deliver code. |
| deliveryDescription | <code>String</code> | Message delivery description for the respective delivery code. |

<a name="NumberInfo"></a>

## NumberInfo
**Kind**: global class  

* [NumberInfo](#NumberInfo)
    * [new NumberInfo()](#new_NumberInfo_new)
    * [.get(number, [callback])](#NumberInfo+get) ⇒ <code>[NumberInfoResponse](#NumberInfoResponse)</code>

<a name="new_NumberInfo_new"></a>

### new NumberInfo()
NumberInfo

<a name="NumberInfo+get"></a>

### numberInfo.get(number, [callback]) ⇒ <code>[NumberInfoResponse](#NumberInfoResponse)</code>
Gets information about a number.

**Kind**: instance method of <code>[NumberInfo](#NumberInfo)</code>  
**Returns**: <code>[NumberInfoResponse](#NumberInfoResponse)</code> - A promise for the number information  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>String</code> | The ID of the numberInfo to get |
| [callback] | <code>function</code> | A callback with the number information |

**Example**  
```js
// Promise
client.NumberInfo.get("+1234567890").then(function(info){});

// Callback
client.NumberInfo.get("+1234567890", function(err, info){});
```
<a name="NumberInfoResponse"></a>

## NumberInfoResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | The Caller ID name information. |
| number | <code>String</code> | Phone number in  E164 format. |
| created | <code>String</code> | The time this Caller ID information was first queried (UTC). |
| updated | <code>String</code> | The time this Caller ID information was last updated (UTC). |

<a name="PhoneNumber"></a>

## PhoneNumber
**Kind**: global class  

* [PhoneNumber](#PhoneNumber)
    * [new PhoneNumber()](#new_PhoneNumber_new)
    * [.create(params, [callback])](#PhoneNumber+create) ⇒ <code>[PhoneNumberResponse](#PhoneNumberResponse)</code>
    * [.get(phoneNumberOrId, callback)](#PhoneNumber+get) ⇒ <code>[PhoneNumberResponse](#PhoneNumberResponse)</code>
    * [.list(params, callback)](#PhoneNumber+list) ⇒ <code>[Array.&lt;PhoneNumberResponse&gt;](#PhoneNumberResponse)</code>
    * [.update(phoneNumberId, params, [callback])](#PhoneNumber+update) ⇒ <code>Promise</code>
    * [.delete(phoneNumberId, [callback])](#PhoneNumber+delete) ⇒ <code>Promise</code>

<a name="new_PhoneNumber_new"></a>

### new PhoneNumber()
Phone numbers

<a name="PhoneNumber+create"></a>

### phoneNumber.create(params, [callback]) ⇒ <code>[PhoneNumberResponse](#PhoneNumberResponse)</code>
Allocates a number

**Kind**: instance method of <code>[PhoneNumber](#PhoneNumber)</code>  
**Returns**: <code>[PhoneNumberResponse](#PhoneNumberResponse)</code> - A promise for the newly created number  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Parameters for allocating a number |
| params.number | <code>String</code> | A number to allocate. |
| [params.name] | <code>String</code> | A name you choose for this number. |
| [params.applicationId] | <code>String</code> | The unique id of an Application you want to associate with this number. |
| [params.fallbackNumber] | <code>String</code> | Number to transfer an incoming call when the callback/fallback events can't be delivered. |
| [callback] | <code>function</code> | Callback with the newly created number |

**Example**  
```js
//Allocate number +1234567980

// Promise
client.PhoneNumber.create({ number : "+1234567890" }).then(function(number){});

// Callback
client.PhoneNumber.create({ number : "+1234567890" }, function(err, number){});
```
<a name="PhoneNumber+get"></a>

### phoneNumber.get(phoneNumberOrId, callback) ⇒ <code>[PhoneNumberResponse](#PhoneNumberResponse)</code>
Gets information about a phoneNumber.

**Kind**: instance method of <code>[PhoneNumber](#PhoneNumber)</code>  
**Returns**: <code>[PhoneNumberResponse](#PhoneNumberResponse)</code> - A promise for the call information  

| Param | Type | Description |
| --- | --- | --- |
| phoneNumberOrId | <code>String</code> | The ID of the number or number in format E.164 (like +1234567980) to get |
| callback | <code>function</code> | A callback with the call information |

**Example**  
```js
// Promise
client.PhoneNumber.get(numberId).then(function(number){});
// or
client.PhoneNumber.get("+1234567890").then(function(number){});

// Callback
client.PhoneNumber.get(numberId, function(err, number){});
// or
client.PhoneNumber.get("+1234567890", function(err, number){});
```
<a name="PhoneNumber+list"></a>

### phoneNumber.list(params, callback) ⇒ <code>[Array.&lt;PhoneNumberResponse&gt;](#PhoneNumberResponse)</code>
Gets a list of allocated numbers.

**Kind**: instance method of <code>[PhoneNumber](#PhoneNumber)</code>  
**Returns**: <code>[Array.&lt;PhoneNumberResponse&gt;](#PhoneNumberResponse)</code> - A promise for the list of phone numbers  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Query parameters for listing numbers |
| [params.size] | <code>Number</code> | <code>25</code> | Used for pagination to indicate the size of each page requested for querying a list numbers. If no value is specified the default value is 25 (maximum value 1000). |
| [params.applicationId] | <code>String</code> |  | Used to filter the retrieved list of numbers by an associated application ID |
| [params.state] | <code>String</code> |  | Used to filter the retrieved list of numbers by a US state. |
| [params.name] | <code>String</code> |  | Used to filter the retrieved list of numbers by name |
| [params.city] | <code>String</code> |  | Used to filter the retrieved list of numbers by city name |
| [params.numberState] | <code>String</code> |  | Used to filter the retrieved list of numbers by number state |
| callback | <code>function</code> |  | A callback with the list of numbers |

**Example**  
```js
// Promise
client.PhoneNumber.list({size: 1000}).then(function(numbersResponse){});

// Callback
client.PhoneNumber.list({size: 1000}, function(err, numbersResponse){});
```
<a name="PhoneNumber+update"></a>

### phoneNumber.update(phoneNumberId, params, [callback]) ⇒ <code>Promise</code>
Update the number

**Kind**: instance method of <code>[PhoneNumber](#PhoneNumber)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| phoneNumberId | <code>String</code> | The ID of the number |
| params | <code>Object</code> | Changed parameters of the number |
| params.applicationId | <code>String</code> | The unique id of an Application resource you want to associate with this number for incoming calls and messages. |
| params.name | <code>String</code> | A name you choose for this number. |
| params.fallbackNumber | <code>String</code> | Number to transfer an incoming call when the callback/fallback events can't be delivered. |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
// Promise
client.PhoneNumber.update(numberId, {name: "Another Name"}).then(function(){});

// Callback
client.PhoneNumber.update(numberId, {name: "Another Name"}, function(err){});
```
<a name="PhoneNumber+delete"></a>

### phoneNumber.delete(phoneNumberId, [callback]) ⇒ <code>Promise</code>
Remove the number

**Kind**: instance method of <code>[PhoneNumber](#PhoneNumber)</code>  
**Returns**: <code>Promise</code> - A promise for the operation  

| Param | Type | Description |
| --- | --- | --- |
| phoneNumberId | <code>String</code> | The ID of the number |
| [callback] | <code>function</code> | Callback for the operation |

**Example**  
```js
// Promise
client.PhoneNumber.delete(numberId).then(function(){});

// Callback
client.PhoneNumber.delete(numberId, function(err){});
```
<a name="PhoneNumberResponse"></a>

## PhoneNumberResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique ID of the number. |
| state | <code>String</code> | Number state |
| name | <code>String</code> | Number name |
| number | <code>String</code> | Number  in E.164 format. |
| nationalNumber | <code>String</code> | Number in natinal friendly format (like  (555) 5555-5555). |
| city | <code>String</code> | Number city. |
| state | <code>String</code> | Number state. |
| applicationId | <code>String</code> | The unique id of an linked Application. |
| fallbackNumber | <code>String</code> | Number to transfer an incoming call when the callback/fallback events can't be delivered. |
| price | <code>String</code> | The monthly price for this number. |
| numberState | <code>String</code> | The phone number state, values are `enabled` or `released` |
| createdTime | <code>String</code> | Date when the number was created. |

<a name="Recording"></a>

## Recording
**Kind**: global class  

* [Recording](#Recording)
    * [new Recording()](#new_Recording_new)
    * [.get(recordingId, [callback])](#Recording+get) ⇒ <code>[RecordingResponse](#RecordingResponse)</code>
    * [.list(params, [callback])](#Recording+list) ⇒ <code>[RecordingResponse](#RecordingResponse)</code>
    * [.createTranscription(recordingId, [callback])](#Recording+createTranscription) ⇒ <code>[TranscriptionResponse](#TranscriptionResponse)</code>
    * [.getTranscription(recordingId, transcriptionId, [callback])](#Recording+getTranscription) ⇒ <code>[TranscriptionResponse](#TranscriptionResponse)</code>
    * [.getTranscriptions(recordingId, [callback])](#Recording+getTranscriptions) ⇒ <code>[TranscriptionResponse](#TranscriptionResponse)</code>

<a name="new_Recording_new"></a>

### new Recording()
Retrieve information about call recordings

<a name="Recording+get"></a>

### recording.get(recordingId, [callback]) ⇒ <code>[RecordingResponse](#RecordingResponse)</code>
Get a recording

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>[RecordingResponse](#RecordingResponse)</code> - A promise for the recording object  

| Param | Type | Description |
| --- | --- | --- |
| recordingId | <code>String</code> | The ID of the recording to retrieve |
| [callback] | <code>function</code> | Callback with the recording object |

<a name="Recording+list"></a>

### recording.list(params, [callback]) ⇒ <code>[RecordingResponse](#RecordingResponse)</code>
Get a list of recordings

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>[RecordingResponse](#RecordingResponse)</code> - A promise for the recording objects  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | [description] |
| [callback] | <code>function</code> | Callback with the recording objects |

<a name="Recording+createTranscription"></a>

### recording.createTranscription(recordingId, [callback]) ⇒ <code>[TranscriptionResponse](#TranscriptionResponse)</code>
Create a transcription

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>[TranscriptionResponse](#TranscriptionResponse)</code> - A promise for the created transcription  

| Param | Type | Description |
| --- | --- | --- |
| recordingId | <code>String</code> | The ID of the recording |
| [callback] | <code>function</code> | Callback with the create transcription |

**Example**  
```js
// Promise
client.Recording.createTranscription(recordingId).then(function(transcription){});

// Callback
client.Recording.createTranscription(recordingId, function(err, transcription){});
```
<a name="Recording+getTranscription"></a>

### recording.getTranscription(recordingId, transcriptionId, [callback]) ⇒ <code>[TranscriptionResponse](#TranscriptionResponse)</code>
Get information about the transcription

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>[TranscriptionResponse](#TranscriptionResponse)</code> - A promise for the transcription  

| Param | Type | Description |
| --- | --- | --- |
| recordingId | <code>String</code> | The ID of the recording |
| transcriptionId | <code>String</code> | The ID of the transcription |
| [callback] | <code>function</code> | Callback with the  transcription |

**Example**  
```js
// Promise
client.Recording.getTranscription(recordingId, transcriptionId).then(function(transcription){});

// Callback
client.Recording.getTranscription(recordingId, transcriptionId, function(err, transcription){});
```
<a name="Recording+getTranscriptions"></a>

### recording.getTranscriptions(recordingId, [callback]) ⇒ <code>[TranscriptionResponse](#TranscriptionResponse)</code>
Get list of all transcriptions for recording

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>[TranscriptionResponse](#TranscriptionResponse)</code> - A promise for the transcriptions  

| Param | Type | Description |
| --- | --- | --- |
| recordingId | <code>String</code> | The ID of the recording |
| [callback] | <code>function</code> | Callback with the  transcriptions |

**Example**  
```js
// Promise
client.Recording.getTranscriptions(recordingId).then(function(transcriptions){});

// Callback
client.Recording.getTranscriptions(recordingId, function(err, transcriptions){});
```
<a name="RecordingResponse"></a>

## RecordingResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique ID of the recording. |
| startTime | <code>String</code> | Date/time when the recording started. |
| endTime | <code>String</code> | Date/time when the recording ended. |
| media | <code>String</code> | The complete URL to the media resource this recording is associated with. |
| call | <code>String</code> | The complete URL to the call resource this recording is associated with. |
| state | <code>String</code> | The state of the recording, |

<a name="TranscriptionResponse"></a>

## TranscriptionResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The unique ID of the transcription. |
| text | <code>String</code> | The transcribed text (only first 1000 characters). |
| chargeableDuration | <code>Number</code> | The seconds between activeTime and endTime for the recording; this is the time that is going to be used to charge the resource. |
| textSize | <code>Number</code> | The size of the transcribed text. |
| state | <code>String</code> | The state of the transcription, |
| textUrl | <code>String</code> | A url to the full text, |

<a name="BXMLResponse"></a>

## BXMLResponse
**Kind**: global class  

* [BXMLResponse](#BXMLResponse)
    * [new BXMLResponse()](#new_BXMLResponse_new)
    * [.speakSentence(sentence, params)](#BXMLResponse+speakSentence) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
    * [.gather(params, [callback])](#BXMLResponse+gather) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
    * [.toString()](#BXMLResponse+toString) ⇒ <code>string</code>
    * [.call(params, [callback])](#BXMLResponse+call) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
    * [.conference(params)](#BXMLResponse+conference) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
    * [.hangup()](#BXMLResponse+hangup) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
    * [.playAudio(audio)](#BXMLResponse+playAudio) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
    * [.record(params)](#BXMLResponse+record) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
    * [.redirect(params)](#BXMLResponse+redirect) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
    * [.sendMessage(message, params)](#BXMLResponse+sendMessage) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
    * [.transfer(params, callback)](#BXMLResponse+transfer) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>

<a name="new_BXMLResponse_new"></a>

### new BXMLResponse()
Creates a new BXML Response object.
Call .toString() on this method to obtain the BXML string.

<a name="BXMLResponse+speakSentence"></a>

### bxmlResponse.speakSentence(sentence, params) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Create a SpeakSentence tag.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sentence | <code>string</code> |  | The sentence to have the voice say. |
| params | <code>Object</code> |  | The parameters for the API SpeakSentence call. |
| [params.gender] | <code>string</code> | <code>&quot;\&quot;female\&quot;&quot;</code> | The gender of the speaker. |
| [params.locale] | <code>string</code> | <code>&quot;\&quot;en_US\&quot;&quot;</code> | The locale for the speaker. |
| [params.voice] | <code>string</code> | <code>&quot;\&quot;julie\&quot;&quot;</code> | The voice for the speaker. |

**Example**  
```js
//This app will speak two sentences.
var Bandwidth = require("node-bandwidth");
var myApp = new Bandwidth.BXMLResponse();
myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
     .speakSentence("Someone will be with you shortly.");
myApp = myApp.toString();
```
<a name="BXMLResponse+gather"></a>

### bxmlResponse.gather(params, [callback]) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Create a Gather call, which collects pressed numbers.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | The parameters for the Gather verb. |
| params.requestURL | <code>string</code> |  | Relative or absolute URL to send events to and request new BXML. |
| [params.requestURLTimeout] | <code>number</code> | <code>3000</code> | Time to wait for requestURL response in ms. |
| [params.terminatingDigits] | <code>string</code> | <code>&quot;#&quot;</code> | Digits to stop gather. |
| [params.maxDigits] | <code>number</code> | <code>128</code> | Maximum number of digits to collect. |
| [params.integerDigitTimeout] | <code>number</code> | <code>5</code> | Timeout between digits. |
| [params.bargeable] | <code>boolean</code> | <code>true</code> | Boolean indicating if audio should stop when digit is pressed. |
| [callback] | <code>function</code> |  | A function containing the verbs to be nested inside the Gather call. |

**Example**  
```js
//This app will collect a PIN code.
var Bandwidth = require("node-bandwidth");
var myApp = new Bandwidth.BXMLResponse();
myApp.gather({
    requestUrl : 'http://unico.rn/pinApiEndpoint',
    maxDigits  : 4
}, function () {
    this.speakSentence("Please enter your PIN code.")
});
myApp = myApp.toString();
```
<a name="BXMLResponse+toString"></a>

### bxmlResponse.toString() ⇒ <code>string</code>
**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>string</code> - A string representation of the object's BXML.  
<a name="BXMLResponse+call"></a>

### bxmlResponse.call(params, [callback]) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Create a new call to another phone number.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | The parameters for the Call verb. |
| params.from | <code>string</code> | Defines the number the call will be created from. |
| params.to | <code>string</code> | Defines the number the call will be made to. |
| [params.requestUrl] | <code>string</code> | URL to send event |
| [params.timeout] | <code>number</code> | The timeout, in seconds, for the call to answer |
| [params.requestUrlTimeout] | <code>number</code> | Timeout, in ms, to request new BXML document |
| [callback] | <code>function</code> | A function containing the verbs to be nested inside the Call verb |

**Example**  
```js
//This app will create a call and tell the callee they are being called.
var Bandwidth = require("node-bandwidth");
var myApp = new Bandwidth.BXMLResponse();
myApp.call({
     from : '+19195551212',
     to   : '+19195551213'
}, function () {
     this.speakSentence("You are recieving a call from 919 555 1212.");
});
myApp = myApp.toString();
```
<a name="BXMLResponse+conference"></a>

### bxmlResponse.conference(params) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Create a new conference call.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | The parameters for the Conference verb. |
| params.from | <code>string</code> |  | The phone number that will host the conference. |
| [params.statusCallbackUrl] | <code>string</code> |  | URL to which conference callbacks will be POSTed |
| [params.joinTone] | <code>boolean</code> | <code>true</code> | Determines whether or not a tone is played on join. |
| [params.leavingTone] | <code>boolean</code> | <code>true</code> | Determines whether or not a tone is played on leave. |
| [params.tag] | <code>string</code> |  | A string that will be included in the callback events of the conference. |
| [params.mute] | <code>boolean</code> | <code>false</code> | Determines whether or not the member will join muted. |
| [params.hold] | <code>boolean</code> | <code>false</code> | Determines whether or not the member will join on hold. |

**Example**  
```js
//This app will create a conference call. Callers to (919) 555 1212 will be patched in.
var Bandwidth = require("node-bandwidth");
var myApp = new Bandwidth.BXMLResponse();
myApp.conference({
    from : '+19195551212'
});
myApp = myApp.toString();
```
<a name="BXMLResponse+hangup"></a>

### bxmlResponse.hangup() ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Terminates an outgoing call.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining.  
**Example**  
```js
//This app will speak two sentences and hang up.
var Bandwidth = require("node-bandwidth");
var myApp = new Bandwidth.BXMLResponse();
myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
     .speakSentence("We have been acquired by BigCorp.")
     .hangup();
myApp = myApp.toString();
```
<a name="BXMLResponse+playAudio"></a>

### bxmlResponse.playAudio(audio) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Plays an audio file located at a specified URL.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| audio | <code>string</code> | The URL of the audio to be played. |

**Example**  
```js
var Bandwidth = require("node-bandwidth");
var myApp = new Bandwidth.BXMLResponse();
myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
     .speakSentence("All agents are currently busy playing ping-pong. Please hold.")
     .playAudio("http://unico.rn/assets/postglamspeedfolk.mp3");
myApp = myApp.toString();
```
<a name="BXMLResponse+record"></a>

### bxmlResponse.record(params) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Records the call. At end of call, a call recording event is sent to the callback URL.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | The parameters for the Record verb. |
| [params.requestUrl] | <code>string</code> |  | URL to send event and request new BXML. |
| [params.requestUrlTimeout] | <code>number</code> |  | Timeout, in ms, to wait for requestUrl response. |
| [params.fileFormat] | <code>string</code> |  | The format in which to save the recording - mp3 or wav. |
| [params.terminatingDigits] | <code>string</code> |  | One or more digits that will finish the recording. |
| [params.maxDuration] | <code>number</code> | <code>300</code> | Time, in seconds, for max duration. Up to 3600 sec (1hr) |
| [params.transcribe] | <code>boolean</code> | <code>false</code> | Boolean to indicate transcription of the recording. |
| [params.transcribeCallbackUrl] | <code>string</code> |  | URL to send transcribed event. |

**Example**  
```js
//This app will record a message.
var Bandwidth = require("node-bandwidth");
var myApp = new Bandwidth.BXMLResponse();
myApp.speakSentence("Thanks for calling Unicorn Enterprises.")
     .speakSentence("Your call may be recorded for quality assurance.")
     .record({
           requestUrl : "http://unico.rn/recordsGetPutHere",
           fileFormat : "mp3"
		});
```
<a name="BXMLResponse+redirect"></a>

### bxmlResponse.redirect(params) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Redirects the current execution to run XML at another URL.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | The parameters for the Redirect verb. |
| params.requestUrl | <code>string</code> | The URL to send event to and request new BXML. |
| params.requestUrlTimeout | <code>number</code> | Timeout, in ms, to wait for requestUrl to respond. |

<a name="BXMLResponse+sendMessage"></a>

### bxmlResponse.sendMessage(message, params) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Sends a text message.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| message | <code>string</code> |  | The message to send. |
| params | <code>Object</code> |  | The parameters for the SendMessage verb |
| params.from | <code>string</code> |  | The number to send the message from. |
| params.to | <code>string</code> |  | The number to send the message to. |
| [params.requestUrl] | <code>string</code> |  | The URL to send events to and request new BXML from. |
| [params.requestUrlTimeout] | <code>number</code> | <code>30</code> | Timeout, in seconds, to wait for requestUrl to respond. |
| [params.statusCallbackUrl] | <code>string</code> |  | URL to send the message callback to. |

**Example**  
```js
// This app will text a customer.
var Bandwidth = require("node-bandwidth");
var myApp = new Bandwidth.BXMLResponse();
myApp.sendMessage("Get $20 off your next purchase!", {
		from : "+19195551212",
		to   : "+19195551213"
});
```
<a name="BXMLResponse+transfer"></a>

### bxmlResponse.transfer(params, callback) ⇒ <code>[BXMLResponse](#BXMLResponse)</code>
Transfers the call to another number.

**Kind**: instance method of <code>[BXMLResponse](#BXMLResponse)</code>  
**Returns**: <code>[BXMLResponse](#BXMLResponse)</code> - this, for chaining.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | The parameters for the Transfer verb. |
| params.transferTo | <code>string</code> | The number to transfer the call to. |
| [params.transferCallerId] | <code>string</code> | The caller ID to use on the transferred call. |
| [params.callTimeout] | <code>number</code> | The timeout, in seconds, for the call to be answered. |
| [params.requestUrl] | <code>string</code> | URL to send event to and request new BXML from. |
| [params.requestUrlTimeout] | <code>number</code> | Timeout, in msec, to wait for requestUrl to respond. |
| [params.tag] | <code>string</code> | A string that will be included in the callback events. |
| callback | <code>function</code> | The verbs to nest inside the Transfer verb. |

**Example**  
```js
// This app will transfer a call.
var Bandwidth = require("node-bandwidth");
var myApp = new Bandwidth.BXMLResponse();
myApp.speakSentence("Your call is somewhat important to us.")
		.speakSentence("Please wait while it is being transferred.")
		.transfer({
			transferTo: "+19195551213"
		}, function (){
			this.speakSentence("A call is being transferred to you from Customer Service.");
		});
```
<a name="getNextLink"></a>

## getNextLink(response) ⇒
getNextLink

**Kind**: global function  
**Returns**: A parsed version of the link to the subsequent page, or null if no such page exists.  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | A headers object returned from calling 'client.makeRequest' (response.headers) |

