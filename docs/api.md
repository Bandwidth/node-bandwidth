## Classes

<dl>
<dt><a href="#Account">Account</a></dt>
<dd></dd>
<dt><a href="#AccountResponse">AccountResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#TransactionResponse">TransactionResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Application">Application</a></dt>
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
<dt><a href="#BridgeResponse">BridgeResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#Call">Call</a></dt>
<dd></dd>
<dt><a href="#CallResponse">CallResponse</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GatherResponse">GatherResponse</a> : <code>Object</code></dt>
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
    * [.getTransactions(params, [toDate], [fromDate], [type], callback)](#Account+getTransactions) ⇒ <code>[Array.&lt;TransactionResponse&gt;](#TransactionResponse)</code>

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

### account.getTransactions(params, [toDate], [fromDate], [type], callback) ⇒ <code>[Array.&lt;TransactionResponse&gt;](#TransactionResponse)</code>
Gets a list of transactions from user's account.

**Kind**: instance method of <code>[Account](#Account)</code>  
**Returns**: <code>[Array.&lt;TransactionResponse&gt;](#TransactionResponse)</code> - A promise for the list of transactions  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Query parameters for listing accounts |
| [params.size] | <code>Number</code> | <code>25</code> | Used for pagination to indicate the size of each page requested for querying a list of transactions. If no value is specified the default value is 25 (maximum value 1000). |
| [params.maxItems] | <code>Number</code> |  | Limit the number of transactions that will be returned |
| [toDate] | <code>String</code> |  | Return only transactions that are newer than the parameter. |
| [fromDate] | <code>String</code> |  | Return only transactions that are older than the parameter. |
| [type] | <code>String</code> |  | Return only transactions that are this type. |
| callback | <code>function</code> |  | A callback with the list of transactions |

<a name="AccountResponse"></a>

## AccountResponse : <code>Object</code>
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| balance | <code>String</code> | User's account balance in dollars, as a string; the currency symbol is not included. |
| type | <code>String</code> | The type of account configured for your user. |

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
    * [.list(params, [callback])](#Application+list) ⇒ <code>[Array.&lt;ApplicationResponse&gt;](#ApplicationResponse)</code>
    * [.create(params, [callback])](#Application+create) ⇒ <code>[ApplicationResponse](#ApplicationResponse)</code>
    * [.get(applicationId, [callback])](#Application+get) ⇒ <code>[ApplicationResponse](#ApplicationResponse)</code>
    * [.update(applicationId, params, [callback])](#Application+update)
    * [.remove(applicationId, [callback])](#Application+remove)

<a name="new_Application_new"></a>

### new Application(client)
Application


| Param | Type | Description |
| --- | --- | --- |
| client | <code>Object</code> | Catapult client |

<a name="Application+list"></a>

### application.list(params, [callback]) ⇒ <code>[Array.&lt;ApplicationResponse&gt;](#ApplicationResponse)</code>
List the user's applications

**Kind**: instance method of <code>[Application](#Application)</code>  
**Returns**: <code>[Array.&lt;ApplicationResponse&gt;](#ApplicationResponse)</code> - A promise for the list of applications, has a getNextPage
function if the number of applications returned by the query exceeds the page size.  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | Parameters for filtering applications. |
| [params.size] | <code>Number</code> | The maximum number of applications returned by the query per page (Max size: 1000). |
| [callback] | <code>function</code> | A callback for the list of applications. |

<a name="Application+create"></a>

### application.create(params, [callback]) ⇒ <code>[ApplicationResponse](#ApplicationResponse)</code>
Create a new application

**Kind**: instance method of <code>[Application](#Application)</code>  
**Returns**: <code>[ApplicationResponse](#ApplicationResponse)</code> - A promise for the newly created application.  

| Param | Type | Description |
| --- | --- | --- |
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

<a name="Application+get"></a>

### application.get(applicationId, [callback]) ⇒ <code>[ApplicationResponse](#ApplicationResponse)</code>
Get an application.

**Kind**: instance method of <code>[Application](#Application)</code>  
**Returns**: <code>[ApplicationResponse](#ApplicationResponse)</code> - A promise for the application.  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The ID of the application to get. |
| [callback] | <code>function</code> | A callback for the application. |

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

<a name="Application+remove"></a>

### application.remove(applicationId, [callback])
Delete an application.

**Kind**: instance method of <code>[Application](#Application)</code>  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>String</code> | The ID of the application to delete. |
| [callback] | <code>function</code> | A callback for the application. |

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
client.AvailableNumber.searchAndOrder("local", { areaCode : "910", quantity : 2 }, function (err, numbers) {});
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
    * [.list(params, callback)](#Bridge+list) ⇒ <code>[Array.&lt;BridgeResponse&gt;](#BridgeResponse)</code>
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

<a name="Bridge+get"></a>

### bridge.get(bridgeId, callback) ⇒ <code>[BridgeResponse](#BridgeResponse)</code>
Gets information about a bridge.

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>[BridgeResponse](#BridgeResponse)</code> - A promise for the call information  

| Param | Type | Description |
| --- | --- | --- |
| bridgeId | <code>String</code> | The ID of the bridge to get |
| callback | <code>function</code> | A callback with the call information |

<a name="Bridge+list"></a>

### bridge.list(params, callback) ⇒ <code>[Array.&lt;BridgeResponse&gt;](#BridgeResponse)</code>
Gets a list of bridges.

**Kind**: instance method of <code>[Bridge](#Bridge)</code>  
**Returns**: <code>[Array.&lt;BridgeResponse&gt;](#BridgeResponse)</code> - A promise for the list of bridges  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Query parameters for listing bridges |
| [params.size] | <code>Number</code> | <code>25</code> | Used for pagination to indicate the size of each page requested for querying a list of bridges. If no value is specified the default value is 25 (maximum value 1000). |
| callback | <code>function</code> |  | A callback with the list of bridges |

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
    * [.transfer(params, [callback])](#Call+transfer) ⇒ <code>[CallResponse](#CallResponse)</code>
    * [.speakSentence(callId, sentence, [callback])](#Call+speakSentence) ⇒ <code>Promise</code>
    * [.playAudioFile(callId, fileUrl, [callback])](#Call+playAudioFile) ⇒ <code>Promise</code>
    * [.playAudioAdvanced(callId, params, [callback])](#Call+playAudioAdvanced) ⇒ <code>Promise</code>
    * [.createGather(callId, params, [callback])](#Call+createGather) ⇒ <code>[CallResponse](#CallResponse)</code>
    * [.getGather(callId, gatherId, [callback])](#Call+getGather) ⇒ <code>[GatherResponse](#GatherResponse)</code>
    * [.completeGather(callId, gatherId, [callback])](#Call+completeGather) ⇒ <code>Promise</code>

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
	whipserAudio     : {
		sentence : "You will be transferred to 555-555-5555",
		gender   : "female",
		voice    : "julie",
		locale   : "en"
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

<a name="Domain"></a>

## Domain
**Kind**: global class  

* [Domain](#Domain)
    * [new Domain()](#new_Domain_new)
    * [.create(params, [callback])](#Domain+create) ⇒ <code>[DomainResponse](#DomainResponse)</code>
    * [.list(callback)](#Domain+list) ⇒ <code>[Array.&lt;DomainResponse&gt;](#DomainResponse)</code>
    * [.remove(domainId, [callback])](#Domain+remove) ⇒ <code>Promise</code>

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

<a name="Domain+remove"></a>

### domain.remove(domainId, [callback]) ⇒ <code>Promise</code>
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
    * [.list(domainId, params, callback)](#Endpoint+list) ⇒ <code>[Array.&lt;EndpointResponse&gt;](#EndpointResponse)</code>
    * [.remove(domainId, endpointId, [callback])](#Endpoint+remove) ⇒ <code>Promise</code>
    * [.update(domainId, endpointId, params, [callback])](#Endpoint+update) ⇒ <code>Promise</code>
    * [.createAuthToken(domainId, endpointId, [callback])](#Endpoint+createAuthToken) ⇒ <code>Promise</code>

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

### endpoint.list(domainId, params, callback) ⇒ <code>[Array.&lt;EndpointResponse&gt;](#EndpointResponse)</code>
Gets a list of all endpoints for the domain.

**Kind**: instance method of <code>[Endpoint](#Endpoint)</code>  
**Returns**: <code>[Array.&lt;EndpointResponse&gt;](#EndpointResponse)</code> - A promise for the list of endpoints.  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | Id of the domain to list the endpoints |
| params | <code>Object</code> | Parameters for listing endpoints on domain |
| [params.size] | <code>Number</code> | OPTIONAL The maximum number of endpoints returned by the query per page (Max size: 1000). |
| callback | <code>function</code> | A callback with the list of domains |

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
<a name="Endpoint+remove"></a>

### endpoint.remove(domainId, endpointId, [callback]) ⇒ <code>Promise</code>
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

### endpoint.createAuthToken(domainId, endpointId, [callback]) ⇒ <code>Promise</code>
Generate auth token for the endpoint.

**Kind**: instance method of <code>[Endpoint](#Endpoint)</code>  
**Returns**: <code>Promise</code> - A promise with token value.  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | Id of domain |
| endpointId | <code>String</code> | ID of the endpoint to update. |
| [callback] | <code>function</code> | A callback with token value. |

**Example**  
```js
// Promise
client.Endpoint.createAuthToken("domainId", "endpointId").then(function (endpoint) {});
// Callback
client.Endpoint.createAuthToken("domainId", "endpointId", function (err, endpoint) {});
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
    * [.remove(name, [callback])](#Media+remove) ⇒ <code>Promise</code>

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

<a name="Media+remove"></a>

### media.remove(name, [callback]) ⇒ <code>Promise</code>
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
    * [.send(params, The, The, [callback])](#Message+send) ⇒ <code>[MessageResponse](#MessageResponse)</code>
    * [.get(messageId, [callback])](#Message+get) ⇒ <code>[MessageResponse](#MessageResponse)</code>
    * [.list(params, [callback])](#Message+list) ⇒ <code>Array</code>

<a name="new_Message_new"></a>

### new Message(client)
SMS or MMS Message


| Param | Type | Description |
| --- | --- | --- |
| client | <code>Object</code> | Catapult client |

<a name="Message+send"></a>

### message.send(params, The, The, [callback]) ⇒ <code>[MessageResponse](#MessageResponse)</code>
Send a new SMS or MMS message

**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>[MessageResponse](#MessageResponse)</code> - A promise for the new message object  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| params | <code>Object</code> |  | Parameters for sending a new message |
| The | <code>params.text</code> |  | message text to send |
| The | <code>params.from</code> |  | message sender"s telephone number (or short code) This must be a Catapult number that you own |
| [params.to] | <code>String</code> |  | Message recipient telephone number (or short code) |
| [params.media] | <code>Array</code> |  | Json array containing list of media urls to be sent as content for an mms. Valid URLs are: https://api.catapult.inetwork.com/v1/users/<user-id>/media/ We also support media URLs that are external to Bandwidth API, http:// or https:// format: Example: http://customer-web-site.com/file.jpg |
| [params.callbackUrl] | <code>String</code> |  | The complete URL where the events related to the outgoing message will be sent |
| [params.callbackTimeout] | <code>Number</code> |  | Determine how long should the platform wait for callbackUrl"s response before timing out (milliseconds) |
| [params.fallbackUrl] | <code>String</code> |  | The server URL used to send message events if the request to callbackUrl fails |
| [params.tag] | <code>String</code> |  | A string that will be included in the callback events of the message |
| [params.receiptRequested] | <code>String</code> | <code>none</code> | Requested receipt option for outbound messages: `none` `all` `error` |
| [callback] | <code>function</code> |  | A callback for the new message object |

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

### message.list(params, [callback]) ⇒ <code>Array</code>
Gets a list of messages

**Kind**: instance method of <code>[Message](#Message)</code>  
**Returns**: <code>Array</code> - A promise for the list of messages  

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
    * [.remove(phoneNumberId, [callback])](#PhoneNumber+remove) ⇒ <code>Promise</code>

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
<a name="PhoneNumber+remove"></a>

### phoneNumber.remove(phoneNumberId, [callback]) ⇒ <code>Promise</code>
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
client.PhoneNumber.remove(numberId).then(function(){});

// Callback
client.PhoneNumber.remove(numberId, function(err){});
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
    * [.get(recordingId, [callback])](#Recording+get) ⇒ <code>RecordingResponse</code>
    * [.list(params, [callback])](#Recording+list) ⇒ <code>RecordingResponse</code>
    * [.createTranscription(recordingId, [callback])](#Recording+createTranscription) ⇒ <code>TranscriptionResponse</code>
    * [.getTranscription(recordingId, transcriptionId, [callback])](#Recording+getTranscription) ⇒ <code>TranscriptionResponse</code>
    * [.getTranscriptions(recordingId, [callback])](#Recording+getTranscriptions) ⇒ <code>TranscriptionResponse</code>

<a name="new_Recording_new"></a>

### new Recording()
Retrieve information about call recordings

<a name="Recording+get"></a>

### recording.get(recordingId, [callback]) ⇒ <code>RecordingResponse</code>
Get a recording

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>RecordingResponse</code> - A promise for the recording object  

| Param | Type | Description |
| --- | --- | --- |
| recordingId | <code>String</code> | The ID of the recording to retrieve |
| [callback] | <code>function</code> | Callback with the recording object |

<a name="Recording+list"></a>

### recording.list(params, [callback]) ⇒ <code>RecordingResponse</code>
Get a list of recordings

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>RecordingResponse</code> - A promise for the recording objects  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | [description] |
| [callback] | <code>function</code> | Callback with the recording objects |

<a name="Recording+createTranscription"></a>

### recording.createTranscription(recordingId, [callback]) ⇒ <code>TranscriptionResponse</code>
Create a transcription

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>TranscriptionResponse</code> - A promise for the created transcription  

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

### recording.getTranscription(recordingId, transcriptionId, [callback]) ⇒ <code>TranscriptionResponse</code>
Get information about the transcription

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>TranscriptionResponse</code> - A promise for the transcription  

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

### recording.getTranscriptions(recordingId, [callback]) ⇒ <code>TranscriptionResponse</code>
Get list of all transcriptions for recording

**Kind**: instance method of <code>[Recording](#Recording)</code>  
**Returns**: <code>TranscriptionResponse</code> - A promise for the transcriptions  

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
<a name="getNextLink"></a>

## getNextLink(response) ⇒
getNextLink

**Kind**: global function  
**Returns**: A parsed version of the link to the subsequent page, or null if no such page exists.  

| Param | Type | Description |
| --- | --- | --- |
| response | <code>Object</code> | A headers object returned from calling 'client.makeRequest' (response.headers) |

