## Classes

<dl>
<dt><a href="#Account">Account</a></dt>
<dd><p>The Account API allows you to retrieve your current balance, transaction list, account type and all elements related to your platform account.</p>
</dd>
<dt><a href="#Applications">Applications</a></dt>
<dd><p>Applications allow you to receive incoming call and messaging events.</p>
</dd>
<dt><a href="#Media">Media</a></dt>
<dd><p>The Media resource lets you upload your media files to Bandwidth API servers so they can be used in applications without requiring a separate hosting provider.</p>
</dd>
<dt><a href="#AvailableNumbers">AvailableNumbers</a></dt>
<dd><p>The Available Numbers resource lets you search for numbers that are available for use with your application.</p>
</dd>
<dt><a href="#Bridges">Bridges</a></dt>
<dd><p>The Bridges resource allows you to bridge two calls together allowing for two way audio between them.</p>
</dd>
<dt><a href="#Calls">Calls</a></dt>
<dd><p>The Calls resource lets you make phone calls and view information about previous inbound and outbound calls.</p>
</dd>
<dt><a href="#Conferences">Conferences</a></dt>
<dd><p>The Conference resource allows you create conferences, add members to it, play audio, speak text, mute/unmute members, hold/unhold members and other things related to conferencing.</p>
</dd>
<dt><a href="#Domains">Domains</a></dt>
<dd><p>A domain is a way to logically group endpoints.</p>
</dd>
<dt><a href="#Errors">Errors</a></dt>
<dd><p>The Errors resource lets you see information about errors that happened in your API calls and during applications callbacks.</p>
</dd>
<dt><a href="#NumberInfo">NumberInfo</a></dt>
<dd><p>This resource provides a CNAM number info.</p>
</dd>
<dt><a href="#Messages">Messages</a></dt>
<dd><p>The Messages resource lets you send SMS/MMS messages and view messages that were previously sent or received.</p>
</dd>
<dt><a href="#MessagesV2">MessagesV2</a></dt>
<dd><p>The next version of Messages resource lets you send SMS/MMS messages and view messages that were previously sent or received.</p>
</dd>
<dt><a href="#PhoneNumbers">PhoneNumbers</a></dt>
<dd><p>The Phone Numbers resource lets you get phone numbers for use with your programs and manage numbers you already have.</p>
</dd>
<dt><a href="#Recordings">Recordings</a></dt>
<dd><p>Retrieve information about call recordings.</p>
</dd>
<dt><a href="#BandwidthApi">BandwidthApi</a></dt>
<dd><p>Bandwidth Api (internal class)</p>
</dd>
<dt><a href="#UnexpectedResponseError">UnexpectedResponseError</a></dt>
<dd><p>Bandwidth API request error</p>
</dd>
<dt><a href="#RateLimitError">RateLimitError</a></dt>
<dd><p>Bandwidth API rate limit error</p>
</dd>
<dt><a href="#BandwidthXml">BandwidthXml</a></dt>
<dd><p>Bandwidth XML (internal class)</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#bandwidthXml">bandwidthXml</a> : <code><a href="#BandwidthXml">BandwidthXml</a></code></dt>
<dd><p>Bandwidth Xml</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getBandwidthApi">getBandwidthApi(options)</a> ⇒ <code><a href="#BandwidthApi">BandwidthApi</a></code></dt>
<dd><p>Return Bandwidth API instance</p>
</dd>
</dl>

<a name="Account"></a>

## Account

The Account API allows you to retrieve your current balance, transaction list, account type and all elements related to your platform account.

**Kind**: global class

* [Account](#Account)
  * [.get([cancelToken])](#Account+get) ⇒ <code>Promise</code>
  * [.getTransactions([options], [cancelToken])](#Account+getTransactions) ⇒ <code>Promise</code>

<a name="Account+get"></a>

### account.get([cancelToken]) ⇒ <code>Promise</code>

Get information about user account.

**Kind**: instance method of [<code>Account</code>](#Account)  
**Returns**: <code>Promise</code> - information about user account

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const balance = await api.Account.get();
```

<a name="Account+getTransactions"></a>

### account.getTransactions([options], [cancelToken]) ⇒ <code>Promise</code>

Get the transactions from the user's account.

**Kind**: instance method of [<code>Account</code>](#Account)  
**Returns**: <code>Promise</code> - information about user's account transactions

| Param              | Type                           | Description                                                                                          |
| ------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| [options]          | <code>object</code>            | Options                                                                                              |
| [options.maxItems] | <code>number</code>            | Limit the number of transactions that will be returned                                               |
| [options.toDate]   | <code>string</code>            | Return only transactions that are newer than the parameter                                           |
| [options.fromDate] | <code>string</code>            | Return only transactions that are older than the parameter                                           |
| [options.type]     | <code>string</code>            | Return only transactions that are this type.                                                         |
| [options.page]     | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of transactions.              |
| [options.size]     | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of transactions. |
| [options.number]   | <code>string</code>            | Return only transactions that are from the specified number.                                         |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                   |

**Example**

```js
for await (const transaction of await api.Account.getTransactions()) {console.log(transaction);}
```

<a name="Applications"></a>

## Applications

Applications allow you to receive incoming call and messaging events.

**Kind**: global class

* [Applications](#Applications)
  * [.list([options], [cancelToken])](#Applications+list) ⇒ <code>Promise</code>
  * [.create(options, [cancelToken])](#Applications+create) ⇒ <code>Promise</code>
  * [.get(id, [cancelToken])](#Applications+get) ⇒ <code>Promise</code>
  * [.update(id, [options], [cancelToken])](#Applications+update) ⇒ <code>Promise</code>
  * [.delete(id, [cancelToken])](#Applications+delete) ⇒ <code>Promise</code>

<a name="Applications+list"></a>

### applications.list([options], [cancelToken]) ⇒ <code>Promise</code>

Get a list of your applications.

**Kind**: instance method of [<code>Applications</code>](#Applications)  
**Returns**: <code>Promise</code> - list of user's applications

| Param          | Type                           | Description                                                                                          |
| -------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| [options]      | <code>object</code>            | Options                                                                                              |
| [options.page] | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of applications.              |
| [options.size] | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of applications. |
| [cancelToken]  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                   |

**Example**

```js
for await (const app of await api.Application.list()) {console.log(app);}
```

<a name="Applications+create"></a>

### applications.create(options, [cancelToken]) ⇒ <code>Promise</code>

Creates an application that can handle calls and messages for one of your phone number.

**Kind**: instance method of [<code>Applications</code>](#Applications)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                                       | Type                           | Description                                                                                                                                                                                        |
| ------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                                     | <code>object</code>            | Options                                                                                                                                                                                            |
| options.name                                | <code>string</code>            | A name you choose for this application.                                                                                                                                                            |
| [options.incomingCallUrl]                   | <code>string</code>            | A URL where call events will be sent for an inbound call. This is the endpoint where the Application Platform will send all call events. Either incomingCallUrl or incomingMessageUrl is required. |
| [options.incomingCallUrlCallbackTimeout]    | <code>number</code>            | Determine how long should the platform wait for incomingCallUrl's response before timing out in milliseconds.                                                                                      |
| [options.incomingCallFallbackUrl]           | <code>string</code>            | The URL used to send the callback event if the request to incomingCallUrl fails.                                                                                                                   |
| [options.incomingMessageUrl]                | <code>string</code>            | The unique identifier for the application                                                                                                                                                          |
| [options.incomingMessageUrlCallbackTimeout] | <code>number</code>            | The unique identifier for the application                                                                                                                                                          |
| [options.incomingMessageFallbackUrl]        | <code>string</code>            | The unique identifier for the application                                                                                                                                                          |
| [options.callbackHttpMethod]                | <code>string</code>            | Determine if the callback event should be sent via HTTP GET or HTTP POST. Values are "get" or "post", default: "post".                                                                             |
| [options.autoAnswer]                        | <code>boolean</code>           | Determines whether or not an incoming call should be automatically answered.                                                                                                                       |
| [cancelToken]                               | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                                                 |

**Example**

```js
const appId = await api.Application.create({name: "test"});
```

<a name="Applications+get"></a>

### applications.get(id, [cancelToken]) ⇒ <code>Promise</code>

Gets information about one of your applications.

**Kind**: instance method of [<code>Applications</code>](#Applications)  
**Returns**: <code>Promise</code> - Application's data

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const app = await api.Application.get("appId");
```

<a name="Applications+update"></a>

### applications.update(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Makes changes to an application.

**Kind**: instance method of [<code>Applications</code>](#Applications)  
**Returns**: <code>Promise</code> - Done

| Param                                       | Type                           | Description                                                                                                                                                                                        |
| ------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                          | <code>string</code>            | id                                                                                                                                                                                                 |
| [options]                                   | <code>object</code>            | Options                                                                                                                                                                                            |
| [options.name]                              | <code>string</code>            | A name you choose for this application.                                                                                                                                                            |
| [options.incomingCallUrl]                   | <code>string</code>            | A URL where call events will be sent for an inbound call. This is the endpoint where the Application Platform will send all call events. Either incomingCallUrl or incomingMessageUrl is required. |
| [options.incomingCallUrlCallbackTimeout]    | <code>number</code>            | Determine how long should the platform wait for incomingCallUrl's response before timing out in milliseconds.                                                                                      |
| [options.incomingCallFallbackUrl]           | <code>string</code>            | The URL used to send the callback event if the request to incomingCallUrl fails.                                                                                                                   |
| [options.incomingMessageUrl]                | <code>string</code>            | The unique identifier for the application                                                                                                                                                          |
| [options.incomingMessageUrlCallbackTimeout] | <code>number</code>            | The unique identifier for the application                                                                                                                                                          |
| [options.incomingMessageFallbackUrl]        | <code>string</code>            | The unique identifier for the application                                                                                                                                                          |
| [options.callbackHttpMethod]                | <code>string</code>            | Determine if the callback event should be sent via HTTP GET or HTTP POST. Values are "get" or "post", default: "post".                                                                             |
| [options.autoAnswer]                        | <code>boolean</code>           | Determines whether or not an incoming call should be automatically answered.                                                                                                                       |
| [cancelToken]                               | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                                                 |

**Example**

```js
await api.Application.update("appId", {name: "newName"});
```

<a name="Applications+delete"></a>

### applications.delete(id, [cancelToken]) ⇒ <code>Promise</code>

Permanently deletes an application.

**Kind**: instance method of [<code>Applications</code>](#Applications)  
**Returns**: <code>Promise</code> - Done

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Application.delete("appId");
```

<a name="Media"></a>

## Media

The Media resource lets you upload your media files to Bandwidth API servers so they can be used in applications without requiring a separate hosting provider.

**Kind**: global class

* [Media](#Media)
  * [.list([cancelToken])](#Media+list) ⇒ <code>Promise</code>
  * [.download(mediaName, [options], [cancelToken])](#Media+download) ⇒ <code>Promise</code>
  * [.upload(mediaName, [options], [cancelToken])](#Media+upload) ⇒ <code>Promise</code>
  * [.delete(mediaName, [cancelToken])](#Media+delete) ⇒ <code>Promise</code>

<a name="Media+list"></a>

### media.list([cancelToken]) ⇒ <code>Promise</code>

Gets a list of your media files.

**Kind**: instance method of [<code>Media</code>](#Media)  
**Returns**: <code>Promise</code> - list of media files data

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const files = await api.Media.list();
```

<a name="Media+download"></a>

### media.download(mediaName, [options], [cancelToken]) ⇒ <code>Promise</code>

Downloads a media file you previously uploaded.

**Kind**: instance method of [<code>Media</code>](#Media)  
**Returns**: <code>Promise</code> - Content of file

| Param                  | Type                           | Description                                                                               |
| ---------------------- | ------------------------------ | ----------------------------------------------------------------------------------------- |
| mediaName              | <code>string</code>            | mediaName                                                                                 |
| [options]              | <code>object</code>            | Options                                                                                   |
| [options.responseType] | <code>string</code>            | responseType Valid values are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream' |
| [cancelToken]          | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)        |

**Example**

```js
const result = await api.Media.download("image.jpg");
```

<a name="Media+upload"></a>

### media.upload(mediaName, [options], [cancelToken]) ⇒ <code>Promise</code>

Uploads a file the normal HTTP way.

**Kind**: instance method of [<code>Media</code>](#Media)  
**Returns**: <code>Promise</code> - Success

| Param                 | Type                           | Description                                                                        |
| --------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| mediaName             | <code>string</code>            | mediaName                                                                          |
| [options]             | <code>object</code>            | Options                                                                            |
| [options.content]     | <code>\*</code>                | content                                                                            |
| [options.contentType] | <code>string</code>            | contentType                                                                        |
| [cancelToken]         | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Media.upload("file.jpg", {content: bufferOrStream, contentType: "image/jpeg"});
```

<a name="Media+delete"></a>

### media.delete(mediaName, [cancelToken]) ⇒ <code>Promise</code>

Deletes a media file from Bandwidth API server.

**Kind**: instance method of [<code>Media</code>](#Media)  
**Returns**: <code>Promise</code> - Success

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| mediaName     | <code>string</code>            |               | mediaName                                                                          |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Media.delete("file.jpg");
```

<a name="AvailableNumbers"></a>

## AvailableNumbers

The Available Numbers resource lets you search for numbers that are available for use with your application.

**Kind**: global class

* [AvailableNumbers](#AvailableNumbers)
  * [.searchLocalNumbers([options], [cancelToken])](#AvailableNumbers+searchLocalNumbers) ⇒ <code>Promise</code>
  * [.searchAndOrderLocalNumbers([options], [cancelToken])](#AvailableNumbers+searchAndOrderLocalNumbers) ⇒ <code>Promise</code>
  * [.searchTollFreeNumbers([options], [cancelToken])](#AvailableNumbers+searchTollFreeNumbers) ⇒ <code>Promise</code>
  * [.searchAndOrderTollFreeNumbers([options], [cancelToken])](#AvailableNumbers+searchAndOrderTollFreeNumbers) ⇒ <code>Promise</code>

<a name="AvailableNumbers+searchLocalNumbers"></a>

### availableNumbers.searchLocalNumbers([options], [cancelToken]) ⇒ <code>Promise</code>

Search for available local numbers

**Kind**: instance method of [<code>AvailableNumbers</code>](#AvailableNumbers)  
**Returns**: <code>Promise</code> - list of found numbers

| Param                        | Type                           | Description                                                                                                                                              |
| ---------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [options]                    | <code>object</code>            | Options                                                                                                                                                  |
| [options.city]               | <code>string</code>            | A city name.                                                                                                                                             |
| [options.state]              | <code>string</code>            | A two-letter US state abbreviation ("CA" for California).                                                                                                |
| [options.zip]                | <code>number</code>            | A 5-digit US ZIP code.                                                                                                                                   |
| [options.areaCode]           | <code>string</code>            | A 3-digit telephone area code.                                                                                                                           |
| [options.inLocalCallingArea] | <code>boolean</code>           | Boolean value to indicate that the search for available numbers must consider overlayed areas. Only applied for localNumber searching.                   |
| [options.quantity]           | <code>number</code>            | The maximum number of numbers to return                                                                                                                  |
| [options.pattern]            | <code>string</code>            | A number pattern that may include letters, digits, and the following wildcard characters: ? - matches any single digit, \* - matches zero or more digits |
| [cancelToken]                | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                       |

**Example**

```js
const numbers = await api.AvailableNumbers.searchLocalNumbers({areaCode: "910"});
```

<a name="AvailableNumbers+searchAndOrderLocalNumbers"></a>

### availableNumbers.searchAndOrderLocalNumbers([options], [cancelToken]) ⇒ <code>Promise</code>

Searches and order available local numbers.

**Kind**: instance method of [<code>AvailableNumbers</code>](#AvailableNumbers)  
**Returns**: <code>Promise</code> - list of ordered numbers

| Param                        | Type                           | Description                                                                                                                                                                 |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [options]                    | <code>object</code>            | Options                                                                                                                                                                     |
| [options.city]               | <code>string</code>            | A city name.                                                                                                                                                                |
| [options.state]              | <code>string</code>            | A two-letter US state abbreviation ("CA" for California).                                                                                                                   |
| [options.zip]                | <code>number</code>            | A 5-digit US ZIP code.                                                                                                                                                      |
| [options.areaCode]           | <code>string</code>            | A 3-digit telephone area code.                                                                                                                                              |
| [options.inLocalCallingArea] | <code>boolean</code>           | Boolean value to indicate that the search for available numbers must consider overlayed areas. Only applied for localNumber searching.                                      |
| [options.localNumber]        | <code>string</code>            | It is defined as the first digits of a telephone number inside an area code for filtering the results. It must have at least 3 digits and the areaCode field must be filled |
| [options.quantity]           | <code>number</code>            | The maximum number of numbers to return                                                                                                                                     |
| [options.pattern]            | <code>string</code>            | A number pattern that may include letters, digits, and the following wildcard characters: ? - matches any single digit, \* - matches zero or more digits                    |
| [cancelToken]                | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                          |

**Example**

```js
const results = await api.AvailableNumbers.searchAndOrderLocalNumbers({areaCode: "910"});
```

<a name="AvailableNumbers+searchTollFreeNumbers"></a>

### availableNumbers.searchTollFreeNumbers([options], [cancelToken]) ⇒ <code>Promise</code>

Search for available toll free numbers

**Kind**: instance method of [<code>AvailableNumbers</code>](#AvailableNumbers)  
**Returns**: <code>Promise</code> - list of found numbers

| Param              | Type                           | Description                                                                                                                                              |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [options]          | <code>object</code>            | Options                                                                                                                                                  |
| [options.quantity] | <code>number</code>            | The maximum number of numbers to return                                                                                                                  |
| [options.pattern]  | <code>string</code>            | A number pattern that may include letters, digits, and the following wildcard characters: ? - matches any single digit, \* - matches zero or more digits |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                       |

**Example**

```js
const numbers = await api.AvailableNumbers.searchTollFreeNumbers({quantity: 3});
```

<a name="AvailableNumbers+searchAndOrderTollFreeNumbers"></a>

### availableNumbers.searchAndOrderTollFreeNumbers([options], [cancelToken]) ⇒ <code>Promise</code>

Searches and order available toll free numbers.

**Kind**: instance method of [<code>AvailableNumbers</code>](#AvailableNumbers)  
**Returns**: <code>Promise</code> - list of ordered numbers

| Param              | Type                           | Description                                                                        |
| ------------------ | ------------------------------ | ---------------------------------------------------------------------------------- |
| [options]          | <code>object</code>            | Options                                                                            |
| [options.quantity] | <code>number</code>            | The maximum number of numbers to return                                            |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const results = await api.AvailableNumbers.searchAndOrderTollFreeNumbers({quantity: 3});
```

<a name="Bridges"></a>

## Bridges

The Bridges resource allows you to bridge two calls together allowing for two way audio between them.

**Kind**: global class

* [Bridges](#Bridges)
  * [.list([options], [cancelToken])](#Bridges+list) ⇒ <code>Promise</code>
  * [.create([options], [cancelToken])](#Bridges+create) ⇒ <code>Promise</code>
  * [.get(id, [cancelToken])](#Bridges+get) ⇒ <code>Promise</code>
  * [.update(id, [options], [cancelToken])](#Bridges+update) ⇒ <code>Promise</code>
  * [.playAudio(id, [options], [cancelToken])](#Bridges+playAudio) ⇒ <code>Promise</code>
  * [.getCalls(id, [cancelToken])](#Bridges+getCalls) ⇒ <code>Promise</code>
  * [.speakSentence(id, sentence, options, [cancelToken])](#Bridges+speakSentence) ⇒ <code>Promise</code>
  * [.playFileUrl(id, fileUrl, options, [cancelToken])](#Bridges+playFileUrl) ⇒ <code>Promise</code>
  * [.stopPlayFileUrl(id, [cancelToken])](#Bridges+stopPlayFileUrl) ⇒ <code>Promise</code>

<a name="Bridges+list"></a>

### bridges.list([options], [cancelToken]) ⇒ <code>Promise</code>

Get a list of your bridges.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - list of user's bridges

| Param          | Type                           | Description                                                                                     |
| -------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| [options]      | <code>object</code>            | Options                                                                                         |
| [options.page] | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of bridges.              |
| [options.size] | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of bridges. |
| [cancelToken]  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)              |

**Example**

```js
for await(const bridge of await api.Bridges.list()) {}
```

<a name="Bridges+create"></a>

### bridges.create([options], [cancelToken]) ⇒ <code>Promise</code>

Create a new bridge.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                 | Type                             | Description                                                                        |
| --------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| [options]             | <code>object</code>              | Options                                                                            |
| [options.callIds]     | <code>Array.&lt;array&gt;</code> | List of call Ids that will be in the bridge.                                       |
| [options.bridgeAudio] | <code>string</code>              | Enable/Disable two way audio path.                                                 |
| [cancelToken]         | <code>axios.CancelToken</code>   | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const bridgeId = await api.Bridges.create({callIds: ["callId"]});
```

<a name="Bridges+get"></a>

### bridges.get(id, [cancelToken]) ⇒ <code>Promise</code>

Gets information about a specific bridge.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Bridge's data

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const bridge = await api.Bridges.get("bridgeId");
```

<a name="Bridges+update"></a>

### bridges.update(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Change calls in a bridge and bridge/unbridge the audio.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Done

| Param                 | Type                             | Description                                                                        |
| --------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| id                    | <code>string</code>              | id                                                                                 |
| [options]             | <code>object</code>              | Options                                                                            |
| [options.callIds]     | <code>Array.&lt;array&gt;</code> | List of call Ids that will be in the bridge.                                       |
| [options.bridgeAudio] | <code>string</code>              | Enable/Disable two way audio path.                                                 |
| [cancelToken]         | <code>axios.CancelToken</code>   | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Bridges.update("bridgeId", {bridgeAudio: false});
```

<a name="Bridges+playAudio"></a>

### bridges.playAudio(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Play an audio file or speak a sentence in a bridge.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Done

| Param              | Type                           | Description                                                                                        |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| id                 | <code>string</code>            | id                                                                                                 |
| [options]          | <code>object</code>            | Options                                                                                            |
| [options.fileUrl]  | <code>string</code>            | The location of an audio file to play (WAV and MP3 supported).                                     |
| [options.sentence] | <code>string</code>            | The sentence to speak.                                                                             |
| [options.gender]   | <code>string</code>            | The gender of the voice used to synthesize the sentence.                                           |
| [options.locale]   | <code>string</code>            | The sentence to speak.                                                                             |
| [options.voice]    | <code>string</code>            | The voice to speak the sentence                                                                    |
| [options.tag]      | <code>string</code>            | A string that will be included in the events delivered when the audio playback starts or finishes. |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                 |

**Example**

```js
await api.Bridges.playAudio("bridgeId", {fileUrl: "url"});
```

<a name="Bridges+getCalls"></a>

### bridges.getCalls(id, [cancelToken]) ⇒ <code>Promise</code>

Get the list of calls that are on the bridge.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - list of bridge's calls

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const calls = await api.Bridges.getCalls("id");
```

<a name="Bridges+speakSentence"></a>

### bridges.speakSentence(id, sentence, options, [cancelToken]) ⇒ <code>Promise</code>

Speak a sentence to the bridge

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Promise

| Param            | Type                           | Description                                                                        |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id               | <code>string</code>            | Bridge Id                                                                          |
| sentence         | <code>string</code>            | Sentence to speak                                                                  |
| options          | <code>object</code>            | Optional options                                                                   |
| [options.gender] | <code>string</code>            | A gender of voice to speak a sentence                                              |
| [options.locale] | <code>string</code>            | A locale of voice to speak a sentence                                              |
| [options.voice]  | <code>string</code>            | A voice name to speak a sentence                                                   |
| [options.tag]    | <code>string</code>            | Additional data for callback                                                       |
| [cancelToken]    | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Bridges.speakSententence('bridgeId', 'Hello');
```

<a name="Bridges+playFileUrl"></a>

### bridges.playFileUrl(id, fileUrl, options, [cancelToken]) ⇒ <code>Promise</code>

Play audio file to the bridge

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Bridge Id                                                                          |
| fileUrl       | <code>string</code>            | Url to media file                                                                  |
| options       | <code>object</code>            | Optional options                                                                   |
| [options.tag] | <code>string</code>            | Additional data for callback                                                       |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Bridges.playFileUrl('callId', 'https://url/to/file');
```

<a name="Bridges+stopPlayFileUrl"></a>

### bridges.stopPlayFileUrl(id, [cancelToken]) ⇒ <code>Promise</code>

Stop playing of audio file to the bridge

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Bridge Id                                                                          |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Bridges.stopPlayFileUrl('callId');
```

<a name="Calls"></a>

## Calls

The Calls resource lets you make phone calls and view information about previous inbound and outbound calls.

**Kind**: global class

* [Calls](#Calls)
  * [.list([options], [cancelToken])](#Calls+list) ⇒ <code>Promise</code>
  * [.create(options, [cancelToken])](#Calls+create) ⇒ <code>Promise</code>
  * [.get(id, [cancelToken])](#Calls+get) ⇒ <code>Promise</code>
  * [.update(id, [options], [cancelToken])](#Calls+update) ⇒ <code>Promise</code>
  * [.playAudio(id, [options], [cancelToken])](#Calls+playAudio) ⇒ <code>Promise</code>
  * [.sendDtmf(id, [options], [cancelToken])](#Calls+sendDtmf) ⇒ <code>Promise</code>
  * [.getEvents(id, [cancelToken])](#Calls+getEvents) ⇒ <code>Promise</code>
  * [.getEvent(id, eventId, [cancelToken])](#Calls+getEvent) ⇒ <code>Promise</code>
  * [.getRecordings(id, [cancelToken])](#Calls+getRecordings) ⇒ <code>Promise</code>
  * [.getTranscriptions(id, [cancelToken])](#Calls+getTranscriptions) ⇒ <code>Promise</code>
  * [.createGather(id, [options], [cancelToken])](#Calls+createGather) ⇒ <code>Promise</code>
  * [.getGather(id, gatherId, [cancelToken])](#Calls+getGather) ⇒ <code>Promise</code>
  * [.updateGather(id, gatherId, [options], [cancelToken])](#Calls+updateGather) ⇒ <code>Promise</code>
  * [.answer(id, [cancelToken])](#Calls+answer) ⇒ <code>Promise</code>
  * [.terminate(id, [cancelToken])](#Calls+terminate) ⇒ <code>Promise</code>
  * [.hangup(id, [cancelToken])](#Calls+hangup) ⇒ <code>Promise</code>
  * [.transfer(id, transferTo, options, [cancelToken])](#Calls+transfer) ⇒ <code>Promise</code>
  * [.stopGather(id, gatherId, [cancelToken])](#Calls+stopGather) ⇒ <code>Promise</code>
  * [.speakSentence(id, sentence, options, [cancelToken])](#Calls+speakSentence) ⇒ <code>Promise</code>
  * [.playFileUrl(id, fileUrl, options, [cancelToken])](#Calls+playFileUrl) ⇒ <code>Promise</code>
  * [.stopPlayFileUrl(id, [cancelToken])](#Calls+stopPlayFileUrl) ⇒ <code>Promise</code>

<a name="Calls+list"></a>

### calls.list([options], [cancelToken]) ⇒ <code>Promise</code>

Get a list of your calls.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - list of user's calls

| Param                  | Type                           | Description                                                                                                                                                      |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [options]              | <code>object</code>            | Options                                                                                                                                                          |
| [options.bridgeId]     | <code>string</code>            | The id of the bridge for querying a list of calls history                                                                                                        |
| [options.conferenceId] | <code>string</code>            | The id of the conference for querying a list of calls history                                                                                                    |
| [options.from]         | <code>string</code>            | The number to filter calls that came from (must be either an E.164 formatted number, like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com).     |
| [options.to]           | <code>string</code>            | The number to filter calls that was called to (must be either an E.164 formatted number, like +19195551212, or a valid SIP URI, like sip:someone@somewhere.com). |
| [options.sortOrder]    | <code>string</code>            | How to sort the calls.                                                                                                                                           |
| [options.page]         | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of calls.                                                                                 |
| [options.size]         | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of calls.                                                                    |
| [cancelToken]          | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                               |

**Example**

```js
for await(const call of await api.Calls.list()){}
```

<a name="Calls+create"></a>

### calls.create(options, [cancelToken]) ⇒ <code>Promise</code>

Create a new call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                          | Type                           | Description                                                                                                                                                  |
| ------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| options                        | <code>object</code>            | Options                                                                                                                                                      |
| options.from                   | <code>string</code>            | The phone number or SIP address that made the call. Phone numbers are in E.164 format (e.g. +15555555555) -or- SIP addresses (e.g. identify@domain.com).     |
| options.to                     | <code>string</code>            | The phone number or SIP address that received the call. Phone numbers are in E.164 format (e.g. +15555555555) -or- SIP addresses (e.g. identify@domain.com). |
| [options.callTimeout]          | <code>number</code>            | Determine how long should the platform wait for call answer before timing out in seconds.                                                                    |
| [options.callbackTimeout]      | <code>number</code>            | Determine how long should the platform wait for callbackUrl’s response before timing out in milliseconds.                                                    |
| [options.callbackUrl]          | <code>string</code>            | The server URL where the call events related to the call will be sent.                                                                                       |
| [options.callbackHttpMethod]   | <code>string</code>            | Determine if the callback event should be sent via HTTP GET or HTTP POST                                                                                     |
| [options.fallbackUrl]          | <code>string</code>            | he full server URL used to send the callback event if the request to callbackUrl fails.                                                                      |
| [options.bridgeId]             | <code>string</code>            | The id of the bridge where the call will be added.                                                                                                           |
| [options.conferenceId]         | <code>string</code>            | Id of the conference where the call will be added. This property is required if you want to add this call to a conference.                                   |
| [options.recordingEnabled]     | <code>boolean</code>           | Indicates if the call was recorded.                                                                                                                          |
| [options.recordingFileFormat]  | <code>string</code>            | The file format of the recorded call.                                                                                                                        |
| [options.recordingMaxDuration] | <code>number</code>            | Indicates the maximum duration of call recording in seconds.                                                                                                 |
| [options.transcriptionEnabled] | <code>boolean</code>           | Whether all the recordings for this call was automatically transcribed.                                                                                      |
| [options.tag]                  | <code>string</code>            | Any string, it will be included in the callback events of the call.                                                                                          |
| [cancelToken]                  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                           |

**Example**

```js
const callId = await api.Calls.create({from: "from1", to: "to1"});
```

<a name="Calls+get"></a>

### calls.get(id, [cancelToken]) ⇒ <code>Promise</code>

Gets information about an active or completed call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Call's data

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const call = await api.Calls.get("callId");
```

<a name="Calls+update"></a>

### calls.update(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Update properties of an active phone call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Done

| Param                          | Type                           | Description                                                                                               |
| ------------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| id                             | <code>string</code>            | id                                                                                                        |
| [options]                      | <code>object</code>            | Options                                                                                                   |
| [options.state]                | <code>string</code>            | The call state                                                                                            |
| [options.callTimeout]          | <code>number</code>            | Determine how long should the platform wait for call answer before timing out in seconds.                 |
| [options.callbackTimeout]      | <code>number</code>            | Determine how long should the platform wait for callbackUrl’s response before timing out in milliseconds. |
| [options.callbackUrl]          | <code>string</code>            | The server URL where the call events related to the call will be sent.                                    |
| [options.callbackHttpMethod]   | <code>string</code>            | Determine if the callback event should be sent via HTTP GET or HTTP POST                                  |
| [options.fallbackUrl]          | <code>string</code>            | he full server URL used to send the callback event if the request to callbackUrl fails.                   |
| [options.recordingEnabled]     | <code>boolean</code>           | Indicates if the call was recorded.                                                                       |
| [options.recordingFileFormat]  | <code>string</code>            | The file format of the recorded call.                                                                     |
| [options.recordingMaxDuration] | <code>number</code>            | Indicates the maximum duration of call recording in seconds.                                              |
| [options.transcriptionEnabled] | <code>boolean</code>           | Whether all the recordings for this call was automatically transcribed.                                   |
| [options.transferTo]           | <code>string</code>            | transferTo                                                                                                |
| [options.transferCallerId]     | <code>string</code>            | transferCallerId                                                                                          |
| [options.whisperAudio]         | <code>\*</code>                | whisperAudio                                                                                              |
| [cancelToken]                  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                        |

**Example**

```js
await api.Calls.update("callId", {state: "answer"});
```

<a name="Calls+playAudio"></a>

### calls.playAudio(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Play an audio file or speak a sentence in a call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Done

| Param              | Type                           | Description                                                                                        |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| id                 | <code>string</code>            | id                                                                                                 |
| [options]          | <code>object</code>            | Options                                                                                            |
| [options.fileUrl]  | <code>string</code>            | The location of an audio file to play (WAV and MP3 supported).                                     |
| [options.sentence] | <code>string</code>            | The sentence to speak.                                                                             |
| [options.gender]   | <code>string</code>            | The gender of the voice used to synthesize the sentence.                                           |
| [options.locale]   | <code>string</code>            | The sentence to speak.                                                                             |
| [options.voice]    | <code>string</code>            | The voice to speak the sentence                                                                    |
| [options.tag]      | <code>string</code>            | A string that will be included in the events delivered when the audio playback starts or finishes. |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                 |

**Example**

```js
await api.Calls.playAudio("callId", {fileUrl: "url"});
```

<a name="Calls+sendDtmf"></a>

### calls.sendDtmf(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Send DTMF (phone keypad digit presses).

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Done

| Param             | Type                           | Description                                                                                    |
| ----------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| id                | <code>string</code>            | id                                                                                             |
| [options]         | <code>object</code>            | Options                                                                                        |
| [options.dtmfOut] | <code>string</code>            | String containing the DTMF characters to be sent in a call. Allows a maximum of 92 characters. |
| [cancelToken]     | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)             |

**Example**

```js
await api.Calls.sendDtmf("callId", {dtmfOut: "1"});
```

<a name="Calls+getEvents"></a>

### calls.getEvents(id, [cancelToken]) ⇒ <code>Promise</code>

Gets the events that occurred during the call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - list of call's events

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const events = await api.Calls.getEvents("callId");
```

<a name="Calls+getEvent"></a>

### calls.getEvent(id, eventId, [cancelToken]) ⇒ <code>Promise</code>

Gets information about one call event.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - information about call event

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| eventId       | <code>string</code>            |               | eventId                                                                            |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const ev = await api.Calls.getEvent("callId", "eventId");
```

<a name="Calls+getRecordings"></a>

### calls.getRecordings(id, [cancelToken]) ⇒ <code>Promise</code>

Retrieve all recordings related to the call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - list of call's recordings

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const recordings = await api.Calls.getRecordings("callId");
```

<a name="Calls+getTranscriptions"></a>

### calls.getTranscriptions(id, [cancelToken]) ⇒ <code>Promise</code>

Retrieve all transcriptions related to the call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - list of call's transcriptions

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const transcriptions = await api.Calls.getTranscriptions("callId");
```

<a name="Calls+createGather"></a>

### calls.createGather(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Collects a series of DTMF digits from a phone call with an optional prompt.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                        | Type                           | Description                                                                                                                                                                            |
| ---------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                           | <code>string</code>            | id                                                                                                                                                                                     |
| [options]                    | <code>object</code>            | Options                                                                                                                                                                                |
| [options.maxDigits]          | <code>number</code>            | The maximum number of digits to collect, not including terminating digits                                                                                                              |
| [options.interDigitTimeout]  | <code>number</code>            | Stop gathering if a DTMF digit is not detected in this many seconds                                                                                                                    |
| [options.terminatingDigits]  | <code>string</code>            | A string of DTMF digits that end the gather operation immediately if any one of them is detected (default “#”; an empty string means collect all DTMF until maxDigits or the timeout). |
| [options.tag]                | <code>string</code>            | A string you choose that will be included with the response and events for this gather operation.                                                                                      |
| [options.prompt.sentence]    | <code>string</code>            | The text to speak for the prompt                                                                                                                                                       |
| [options.prompt.gender]      | <code>string</code>            | The gender to use for the voice reading the prompt sentence                                                                                                                            |
| [options.prompt.locale]      | <code>string</code>            | The language and region to use for the voice reading the prompt sentence                                                                                                               |
| [options.prompt.loopEnabled] | <code>boolean</code>           | When value is true, the audio will keep playing in a loop.                                                                                                                             |
| [options.prompt.bargeable]   | <code>boolean</code>           | Make the prompt (audio or sentence) bargeable                                                                                                                                          |
| [options.prompt.fileUrl]     | <code>string</code>            | The location of an audio file to play (WAV and MP3 supported).                                                                                                                         |
| [cancelToken]                | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                                     |

**Example**

```js
const gatherId = await api.Calls.createGather("callId", {maxDigits: 1});
```

<a name="Calls+getGather"></a>

### calls.getGather(id, gatherId, [cancelToken]) ⇒ <code>Promise</code>

Get the gather DTMF parameters and results.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Gather information

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| gatherId      | <code>string</code>            |               | gatherId                                                                           |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const gather = await api.Calls.getGather("callId", "gatherId");
```

<a name="Calls+updateGather"></a>

### calls.updateGather(id, gatherId, [options], [cancelToken]) ⇒ <code>Promise</code>

Update the gather.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Done

| Param           | Type                           | Description                                                                        |
| --------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id              | <code>string</code>            | id                                                                                 |
| gatherId        | <code>string</code>            | gatherId                                                                           |
| [options]       | <code>object</code>            | Options                                                                            |
| [options.state] | <code>string</code>            | Update the gather.                                                                 |
| [cancelToken]   | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Calls.updateGather("callId", "gatherId", {state: "completed"});
```

<a name="Calls+answer"></a>

### calls.answer(id, [cancelToken]) ⇒ <code>Promise</code>

Answer incoming call

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Call Id                                                                            |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Calls.answer('callId');
```

<a name="Calls+terminate"></a>

### calls.terminate(id, [cancelToken]) ⇒ <code>Promise</code>

Cancel incoming call

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Call Id                                                                            |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Calls.terminate('callId');
```

<a name="Calls+hangup"></a>

### calls.hangup(id, [cancelToken]) ⇒ <code>Promise</code>

Complete the active call

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Call Id                                                                            |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Calls.hangup('callId');
```

<a name="Calls+transfer"></a>

### calls.transfer(id, transferTo, options, [cancelToken]) ⇒ <code>Promise</code>

Transfer the call

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Id of created call

| Param                          | Type                           | Description                                                                                                                                  |
| ------------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| id                             | <code>string</code>            | Call Id                                                                                                                                      |
| transferTo                     | <code>string</code>            | Phone number to transfer the call                                                                                                            |
| options                        | <code>object</code>            | Optional options                                                                                                                             |
| [options.callbackUrl]          | <code>string</code>            | The server URL where the call events for the new call will be sent upon transferring.                                                        |
| [options.recordingEnabled]     | <code>boolean</code>           | Indicates if the call should be recorded. Values true or false. You can turn recording on/off and have multiple recordings on a single call. |
| [options.recordingFileFormat]  | <code>string</code>            | The file format of the recorded call. Supported values are wav (default) and mp3.                                                            |
| [options.transferCallerId]     | <code>string</code>            | This is the caller id that will be used when the call is transferred.                                                                        |
| [options.whisperAudio]         | <code>object</code>            | Audio to be played to the caller that the call will be transferred to.                                                                       |
| [options.whisperAudio.gender]  | <code>string</code>            | A gender of voice to speak a sentence                                                                                                        |
| [options.whisperAudio.locale]  | <code>string</code>            | A locale of voice to speak a sentence                                                                                                        |
| [options.whisperAudio.voice]   | <code>string</code>            | A voice name to speak a sentence                                                                                                             |
| [options.whisperAudio.tag]     | <code>string</code>            | Additional data for callback                                                                                                                 |
| [options.whisperAudio.fileUrl] | <code>string</code>            | Url to media file                                                                                                                            |
| [cancelToken]                  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                           |

**Example**

```js
const transferedCallId = await api.Calls.transfer('callId', '+12345678901');
```

<a name="Calls+stopGather"></a>

### calls.stopGather(id, gatherId, [cancelToken]) ⇒ <code>Promise</code>

Stop collection of gather data

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Call Id                                                                            |
| gatherId      | <code>string</code>            | Gather Id                                                                          |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Calls.stopGather('callId', 'gatherId');
```

<a name="Calls+speakSentence"></a>

### calls.speakSentence(id, sentence, options, [cancelToken]) ⇒ <code>Promise</code>

Speak a sentence to the call

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Promise

| Param            | Type                           | Description                                                                        |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id               | <code>string</code>            | Call Id                                                                            |
| sentence         | <code>string</code>            | Sentence to speak                                                                  |
| options          | <code>object</code>            | Optional options                                                                   |
| [options.gender] | <code>string</code>            | A gender of voice to speak a sentence                                              |
| [options.locale] | <code>string</code>            | A locale of voice to speak a sentence                                              |
| [options.voice]  | <code>string</code>            | A voice name to speak a sentence                                                   |
| [options.tag]    | <code>string</code>            | Additional data for callback                                                       |
| [cancelToken]    | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Calls.speakSententence('callId', 'Hello');
```

<a name="Calls+playFileUrl"></a>

### calls.playFileUrl(id, fileUrl, options, [cancelToken]) ⇒ <code>Promise</code>

Play audio file to the call

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Call Id                                                                            |
| fileUrl       | <code>string</code>            | Url to media file                                                                  |
| options       | <code>object</code>            | Optional options                                                                   |
| [options.tag] | <code>string</code>            | Additional data for callback                                                       |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Calls.playFileUrl('callId', 'https://url/to/file');
```

<a name="Calls+stopPlayFileUrl"></a>

### calls.stopPlayFileUrl(id, [cancelToken]) ⇒ <code>Promise</code>

Stop playing of audio file to the call

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Bridge Id                                                                          |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Calls.stopPlayFileUrl('callId');
```

<a name="Conferences"></a>

## Conferences

The Conference resource allows you create conferences, add members to it, play audio, speak text, mute/unmute members, hold/unhold members and other things related to conferencing.

**Kind**: global class

* [Conferences](#Conferences)
  * [.create([options], [cancelToken])](#Conferences+create) ⇒ <code>Promise</code>
  * [.get(id, [cancelToken])](#Conferences+get) ⇒ <code>Promise</code>
  * [.update(id, [options], [cancelToken])](#Conferences+update) ⇒ <code>Promise</code>
  * [.playAudio(id, [options], [cancelToken])](#Conferences+playAudio) ⇒ <code>Promise</code>
  * [.getMembers(id, [cancelToken])](#Conferences+getMembers) ⇒ <code>Promise</code>
  * [.addMember(id, options, [cancelToken])](#Conferences+addMember) ⇒ <code>Promise</code>
  * [.getMember(id, memberId, [cancelToken])](#Conferences+getMember) ⇒ <code>Promise</code>
  * [.updateMember(id, memberId, [options], [cancelToken])](#Conferences+updateMember) ⇒ <code>Promise</code>
  * [.playAudioToMember(id, memberId, [options], [cancelToken])](#Conferences+playAudioToMember) ⇒ <code>Promise</code>
  * [.stop(id, [cancelToken])](#Conferences+stop) ⇒ <code>Promise</code>
  * [.mute(id, [mute], [cancelToken])](#Conferences+mute) ⇒ <code>Promise</code>
  * [.hold(id, [hold], [cancelToken])](#Conferences+hold) ⇒ <code>Promise</code>
  * [.deleteMember(id, memberId, [cancelToken])](#Conferences+deleteMember) ⇒ <code>Promise</code>
  * [.muteMember(id, memberId, [mute], [cancelToken])](#Conferences+muteMember) ⇒ <code>Promise</code>
  * [.holdMember(id, memberId, [hold], [cancelToken])](#Conferences+holdMember) ⇒ <code>Promise</code>
  * [.speakSentence(id, sentence, options, [cancelToken])](#Conferences+speakSentence) ⇒ <code>Promise</code>
  * [.playFileUrl(id, fileUrl, options, [cancelToken])](#Conferences+playFileUrl) ⇒ <code>Promise</code>
  * [.stopPlayFileUrl(id, [cancelToken])](#Conferences+stopPlayFileUrl) ⇒ <code>Promise</code>
  * [.speakSentenceToMember(id, memberId, sentence, options, [cancelToken])](#Conferences+speakSentenceToMember) ⇒ <code>Promise</code>
  * [.playFileUrlToMember(id, memberId, fileUrl, options, [cancelToken])](#Conferences+playFileUrlToMember) ⇒ <code>Promise</code>
  * [.stopPlayFileUrlToMember(id, memberId, [cancelToken])](#Conferences+stopPlayFileUrlToMember) ⇒ <code>Promise</code>

<a name="Conferences+create"></a>

### conferences.create([options], [cancelToken]) ⇒ <code>Promise</code>

Create a new conference

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                        | Type                           | Description                                                                                               |
| ---------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| [options]                    | <code>object</code>            | Options                                                                                                   |
| [options.from]               | <code>string</code>            | The phone number that will host the conference.                                                           |
| [options.callbackTimeout]    | <code>number</code>            | Determine how long should the platform wait for callbackUrl’s response before timing out in milliseconds. |
| [options.callbackUrl]        | <code>string</code>            | The server URL where the call events related to the call will be sent.                                    |
| [options.callbackHttpMethod] | <code>string</code>            | Determine if the callback event should be sent via HTTP GET or HTTP POST                                  |
| [options.fallbackUrl]        | <code>string</code>            | he full server URL used to send the callback event if the request to callbackUrl fails.                   |
| [options.profile]            | <code>string</code>            | The conference profile that determines how DTMF is used                                                   |
| [options.tag]                | <code>string</code>            | A string that will be included in the callback events of the conference.                                  |
| [cancelToken]                | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                        |

**Example**

```js
const conferenceId = await api.Conferences.create({from: "number"});
```

<a name="Conferences+get"></a>

### conferences.get(id, [cancelToken]) ⇒ <code>Promise</code>

Gets information about a conference.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Conference's data

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const conference = await api.Conferences.get("conferenceId");
```

<a name="Conferences+update"></a>

### conferences.update(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Update properties of an active conference.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - information about call event

| Param                        | Type                           | Description                                                                                                                                             |
| ---------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                           | <code>string</code>            | id                                                                                                                                                      |
| [options]                    | <code>object</code>            | Options                                                                                                                                                 |
| [options.state]              | <code>string</code>            | Conference state.                                                                                                                                       |
| [options.hold]               | <code>boolean</code>           | If true, all member can’t hear or speak in the conference. If false, all members can hear and speak in the conference (unless set at the member level). |
| [options.mute]               | <code>boolean</code>           | If true, all member can’t speak in the conference. If false, all members can speak in the conference (unless set at the member level).                  |
| [options.callbackTimeout]    | <code>number</code>            | Determine how long should the platform wait for callbackUrl’s response before timing out in milliseconds.                                               |
| [options.callbackUrl]        | <code>string</code>            | The server URL where the call events related to the call will be sent.                                                                                  |
| [options.callbackHttpMethod] | <code>string</code>            | Determine if the callback event should be sent via HTTP GET or HTTP POST                                                                                |
| [options.fallbackUrl]        | <code>string</code>            | he full server URL used to send the callback event if the request to callbackUrl fails.                                                                 |
| [options.tag]                | <code>string</code>            | A string that will be included in the callback events of the conference.                                                                                |
| [cancelToken]                | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                      |

**Example**

```js
await api.Conferences.update("conferenceId", {mute: true});
```

<a name="Conferences+playAudio"></a>

### conferences.playAudio(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Play an audio file or speak a sentence in a conference.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Done

| Param              | Type                           | Description                                                                                        |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| id                 | <code>string</code>            | id                                                                                                 |
| [options]          | <code>object</code>            | Options                                                                                            |
| [options.fileUrl]  | <code>string</code>            | The location of an audio file to play (WAV and MP3 supported).                                     |
| [options.sentence] | <code>string</code>            | The sentence to speak.                                                                             |
| [options.gender]   | <code>string</code>            | The gender of the voice used to synthesize the sentence.                                           |
| [options.locale]   | <code>string</code>            | The sentence to speak.                                                                             |
| [options.voice]    | <code>string</code>            | The voice to speak the sentence                                                                    |
| [options.tag]      | <code>string</code>            | A string that will be included in the events delivered when the audio playback starts or finishes. |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                 |

**Example**

```js
await api.Conferences.playAudio("conferenceId", {fileUrl: "url"});
```

<a name="Conferences+getMembers"></a>

### conferences.getMembers(id, [cancelToken]) ⇒ <code>Promise</code>

Get information about a conference members.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Conference members data

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const members = await api.Conferences.getMembers("conferenceId");
```

<a name="Conferences+addMember"></a>

### conferences.addMember(id, options, [cancelToken]) ⇒ <code>Promise</code>

Add members to a conference.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                 | Type                           | Description                                                                                                                                        |
| --------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | <code>string</code>            | id                                                                                                                                                 |
| options               | <code>object</code>            | Options                                                                                                                                            |
| options.callId        | <code>string</code>            | The callId must refer to an active call that was created using this conferenceId.                                                                  |
| [options.joinTone]    | <code>boolean</code>           | If true, will play a tone when the member joins the conference. If false, no tone is played when the member joins the conference.                  |
| [options.leavingTone] | <code>boolean</code>           | If true, will play a tone when the member leaves the conference. If false, no tone is played when the member leaves the conference.                |
| [options.mute]        | <code>boolean</code>           | If true, member can’t speak in the conference. If false, this members can speak in the conference (unless set at the conference level).            |
| [options.hold]        | <code>boolean</code>           | If true, member can’t hear or speak in the conference. If false, member can hear and speak in the conference (unless set at the conference level). |
| [cancelToken]         | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                 |

**Example**

```js
const memberId = await api.Conferences.addMember("conferenceId", {callId: "callId"});
```

<a name="Conferences+getMember"></a>

### conferences.getMember(id, memberId, [cancelToken]) ⇒ <code>Promise</code>

Retrieve a conference member properties.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - information about conference

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| memberId      | <code>string</code>            |               | memberId                                                                           |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const member = await api.Conferences.getMember("conferenceId", "memberId");
```

<a name="Conferences+updateMember"></a>

### conferences.updateMember(id, memberId, [options], [cancelToken]) ⇒ <code>Promise</code>

Update a member status/properties.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Done

| Param                 | Type                           | Description                                                                                                                                        |
| --------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                    | <code>string</code>            | id                                                                                                                                                 |
| memberId              | <code>string</code>            | memberId                                                                                                                                           |
| [options]             | <code>object</code>            | Options                                                                                                                                            |
| [options.state]       | <code>string</code>            | If `completed`, member will be removed from the conference.                                                                                        |
| [options.joinTone]    | <code>boolean</code>           | If true, will play a tone when the member joins the conference. If false, no tone is played when the member joins the conference.                  |
| [options.leavingTone] | <code>boolean</code>           | If true, will play a tone when the member leaves the conference. If false, no tone is played when the member leaves the conference.                |
| [options.mute]        | <code>boolean</code>           | If true, member can’t speak in the conference. If false, this members can speak in the conference (unless set at the conference level).            |
| [options.hold]        | <code>boolean</code>           | If true, member can’t hear or speak in the conference. If false, member can hear and speak in the conference (unless set at the conference level). |
| [cancelToken]         | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                 |

**Example**

```js
await api.Conferences.updateMember("conferenceId", "memberId", {mute: true});
```

<a name="Conferences+playAudioToMember"></a>

### conferences.playAudioToMember(id, memberId, [options], [cancelToken]) ⇒ <code>Promise</code>

Speak text or play audio to only a single conference member

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Done

| Param              | Type                           | Description                                                                                        |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| id                 | <code>string</code>            | id                                                                                                 |
| memberId           | <code>string</code>            | memberId                                                                                           |
| [options]          | <code>object</code>            | Options                                                                                            |
| [options.fileUrl]  | <code>string</code>            | The location of an audio file to play (WAV and MP3 supported).                                     |
| [options.sentence] | <code>string</code>            | The sentence to speak.                                                                             |
| [options.gender]   | <code>string</code>            | The gender of the voice used to synthesize the sentence.                                           |
| [options.locale]   | <code>string</code>            | The sentence to speak.                                                                             |
| [options.voice]    | <code>string</code>            | The voice to speak the sentence                                                                    |
| [options.tag]      | <code>string</code>            | A string that will be included in the events delivered when the audio playback starts or finishes. |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                 |

**Example**

```js
await api.Conferences.playAudioToMember("conferenceId", "memberId", {fileUrl: "url"});
```

<a name="Conferences+stop"></a>

### conferences.stop(id, [cancelToken]) ⇒ <code>Promise</code>

Stop the conference

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+mute"></a>

### conferences.mute(id, [mute], [cancelToken]) ⇒ <code>Promise</code>

Mute or unmute the conference

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| [mute]        | <code>boolean</code>           | true if mute and false if unmute, default: true                                    |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+hold"></a>

### conferences.hold(id, [hold], [cancelToken]) ⇒ <code>Promise</code>

Hold or unhold the conference

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| [hold]        | <code>boolean</code>           | true if hold and false if unhold, default: true                                    |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+deleteMember"></a>

### conferences.deleteMember(id, memberId, [cancelToken]) ⇒ <code>Promise</code>

Remove a member from the conference

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| memberId      | <code>string</code>            | Confernece member id                                                               |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+muteMember"></a>

### conferences.muteMember(id, memberId, [mute], [cancelToken]) ⇒ <code>Promise</code>

Mute or unmute the conference member

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| memberId      | <code>string</code>            | Confernece member id                                                               |
| [mute]        | <code>boolean</code>           | true if mute and false if unmute, default: true                                    |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+holdMember"></a>

### conferences.holdMember(id, memberId, [hold], [cancelToken]) ⇒ <code>Promise</code>

Hold or unhold the conference member

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| memberId      | <code>string</code>            | Confernece member id                                                               |
| [hold]        | <code>boolean</code>           | true if hold and false if unhold, default: true                                    |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+speakSentence"></a>

### conferences.speakSentence(id, sentence, options, [cancelToken]) ⇒ <code>Promise</code>

Speak a sentence to the conference

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param            | Type                           | Description                                                                        |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id               | <code>string</code>            | Conference Id                                                                      |
| sentence         | <code>string</code>            | Sentence to speak                                                                  |
| options          | <code>object</code>            | Optional options                                                                   |
| [options.gender] | <code>string</code>            | A gender of voice to speak a sentence                                              |
| [options.locale] | <code>string</code>            | A locale of voice to speak a sentence                                              |
| [options.voice]  | <code>string</code>            | A voice name to speak a sentence                                                   |
| [options.tag]    | <code>string</code>            | Additional data for callback                                                       |
| [cancelToken]    | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+playFileUrl"></a>

### conferences.playFileUrl(id, fileUrl, options, [cancelToken]) ⇒ <code>Promise</code>

Play audio file to the conference

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| fileUrl       | <code>string</code>            | Url to media file                                                                  |
| options       | <code>object</code>            | Optional options                                                                   |
| [options.tag] | <code>string</code>            | Additional data for callback                                                       |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+stopPlayFileUrl"></a>

### conferences.stopPlayFileUrl(id, [cancelToken]) ⇒ <code>Promise</code>

Stop playing of audio file to the conference

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+speakSentenceToMember"></a>

### conferences.speakSentenceToMember(id, memberId, sentence, options, [cancelToken]) ⇒ <code>Promise</code>

Speak a sentence to the conference member

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param            | Type                           | Description                                                                        |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id               | <code>string</code>            | Conference Id                                                                      |
| memberId         | <code>string</code>            | Conference member Id                                                               |
| sentence         | <code>string</code>            | Sentence to speak                                                                  |
| options          | <code>object</code>            | Optional options                                                                   |
| [options.gender] | <code>string</code>            | A gender of voice to speak a sentence                                              |
| [options.locale] | <code>string</code>            | A locale of voice to speak a sentence                                              |
| [options.voice]  | <code>string</code>            | A voice name to speak a sentence                                                   |
| [options.tag]    | <code>string</code>            | Additional data for callback                                                       |
| [cancelToken]    | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+playFileUrlToMember"></a>

### conferences.playFileUrlToMember(id, memberId, fileUrl, options, [cancelToken]) ⇒ <code>Promise</code>

Play audio file to the conference member

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| memberId      | <code>string</code>            | Conference member Id                                                               |
| fileUrl       | <code>string</code>            | Url to media file                                                                  |
| options       | <code>object</code>            | Optional options                                                                   |
| [options.tag] | <code>string</code>            | Additional data for callback                                                       |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+stopPlayFileUrlToMember"></a>

### conferences.stopPlayFileUrlToMember(id, memberId, [cancelToken]) ⇒ <code>Promise</code>

Stop playing of audio file to the conference member

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            | Conference Id                                                                      |
| memberId      | <code>string</code>            | Conference member Id                                                               |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Domains"></a>

## Domains

A domain is a way to logically group endpoints.

**Kind**: global class

* [Domains](#Domains)
  * [.list([options], [cancelToken])](#Domains+list) ⇒ <code>Promise</code>
  * [.create(options, [cancelToken])](#Domains+create) ⇒ <code>Promise</code>
  * [.delete(id, [cancelToken])](#Domains+delete) ⇒ <code>Promise</code>
  * [.getEndpoints(id, [options], [cancelToken])](#Domains+getEndpoints) ⇒ <code>Promise</code>
  * [.createEndpoint(id, options, [cancelToken])](#Domains+createEndpoint) ⇒ <code>Promise</code>
  * [.getEndpoint(id, endpointId, [cancelToken])](#Domains+getEndpoint) ⇒ <code>Promise</code>
  * [.updateEndpoint(id, endpointId, [options], [cancelToken])](#Domains+updateEndpoint) ⇒ <code>Promise</code>
  * [.deleteEndpoint(id, endpointId, [cancelToken])](#Domains+deleteEndpoint) ⇒ <code>Promise</code>

<a name="Domains+list"></a>

### domains.list([options], [cancelToken]) ⇒ <code>Promise</code>

This returns a list of the domains that have been created

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - List of domains

| Param          | Type                           | Description                                                                                     |
| -------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| [options]      | <code>object</code>            | Options                                                                                         |
| [options.page] | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of domains.              |
| [options.size] | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of domains. |
| [cancelToken]  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)              |

**Example**

```js
for await(const domain of await api.Domains.list()){}
```

<a name="Domains+create"></a>

### domains.create(options, [cancelToken]) ⇒ <code>Promise</code>

This will create a domain.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                 | Type                           | Description                                                                        |
| --------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options               | <code>object</code>            | Options                                                                            |
| options.name          | <code>string</code>            | The name is a unique URI to be used in DNS lookups                                 |
| [options.description] | <code>string</code>            | String to describe the domain                                                      |
| [cancelToken]         | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const domainId = await api.Domains.create({name: "domain1"});
```

<a name="Domains+delete"></a>

### domains.delete(id, [cancelToken]) ⇒ <code>Promise</code>

This will delete a domain

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Done

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Domains.delete("domainId");
```

<a name="Domains+getEndpoints"></a>

### domains.getEndpoints(id, [options], [cancelToken]) ⇒ <code>Promise</code>

This returns a list of all endpoints associated with a domain.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - List of endpoints

| Param          | Type                           | Description                                                                                       |
| -------------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| id             | <code>string</code>            | id                                                                                                |
| [options]      | <code>object</code>            | Options                                                                                           |
| [options.page] | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of endpoints.              |
| [options.size] | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of endpoints. |
| [cancelToken]  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                |

**Example**

```js
for await(const endpoint of await api.Domains.getEndpoints("domainId")){}
```

<a name="Domains+createEndpoint"></a>

### domains.createEndpoint(id, options, [cancelToken]) ⇒ <code>Promise</code>

This creates an endpoint.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                          | Type                           | Description                                                                                                                                                                                  |
| ------------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                             | <code>string</code>            | id                                                                                                                                                                                           |
| options                        | <code>object</code>            | Options                                                                                                                                                                                      |
| options.name                   | <code>string</code>            | The endpoint’s name, which SIP clients use as the address of record                                                                                                                          |
| [options.description]          | <code>string</code>            | String to describe endpoint                                                                                                                                                                  |
| [options.applicationId]        | <code>string</code>            | The id of the application associated with this endpoint. Application_id is used to determine the callback URL to be used when a client associated with the endpoint attempts to make a call. |
| [options.enabled]              | <code>boolean</code>           | When set to true, SIP clients can register as this device to receive and make calls. When set to false, registration, inbound, and outbound calling will not succeed.                        |
| [options.credentials.password] | <code>string</code>            | Password                                                                                                                                                                                     |
| [cancelToken]                  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                                           |

**Example**

```js
const enpointId = await api.Domains.createEndpoint("domainId", {name: "user1", applicationId: "appId", credentials: {password: "1234567890"}});
```

<a name="Domains+getEndpoint"></a>

### domains.getEndpoint(id, endpointId, [cancelToken]) ⇒ <code>Promise</code>

This returns a single endpoint.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Endpoint data

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| endpointId    | <code>string</code>            |               | endpointId                                                                         |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const endpoint = await api.Domains.getEndpoint("domainId", "enpointId");
```

<a name="Domains+updateEndpoint"></a>

### domains.updateEndpoint(id, endpointId, [options], [cancelToken]) ⇒ <code>Promise</code>

This will update an endpoint.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Done

| Param                          | Type                           | Description                                                                                                                                                                                  |
| ------------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                             | <code>string</code>            | id                                                                                                                                                                                           |
| endpointId                     | <code>string</code>            | endpointId                                                                                                                                                                                   |
| [options]                      | <code>object</code>            | Options                                                                                                                                                                                      |
| [options.description]          | <code>string</code>            | String to describe endpoint                                                                                                                                                                  |
| [options.applicationId]        | <code>string</code>            | The id of the application associated with this endpoint. Application_id is used to determine the callback URL to be used when a client associated with the endpoint attempts to make a call. |
| [options.enabled]              | <code>boolean</code>           | When set to true, SIP clients can register as this device to receive and make calls. When set to false, registration, inbound, and outbound calling will not succeed.                        |
| [options.credentials.password] | <code>string</code>            | Password                                                                                                                                                                                     |
| [cancelToken]                  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                                           |

**Example**

```js
await api.Domains.updateEndpoint("domainId", "enpointId", {enabled: false});
```

<a name="Domains+deleteEndpoint"></a>

### domains.deleteEndpoint(id, endpointId, [cancelToken]) ⇒ <code>Promise</code>

Remove endpoint from domain.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Done

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| endpointId    | <code>string</code>            |               | endpointId                                                                         |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.Domains.deleteEndpoint("domainId", "enpointId");
```

<a name="Errors"></a>

## Errors

The Errors resource lets you see information about errors that happened in your API calls and during applications callbacks.

**Kind**: global class

* [Errors](#Errors)
  * [.list([options], [cancelToken])](#Errors+list) ⇒ <code>Promise</code>
  * [.get(id, [cancelToken])](#Errors+get) ⇒ <code>Promise</code>

<a name="Errors+list"></a>

### errors.list([options], [cancelToken]) ⇒ <code>Promise</code>

Gets the most recent user errors for the user

**Kind**: instance method of [<code>Errors</code>](#Errors)  
**Returns**: <code>Promise</code> - list of user's errors

| Param          | Type                           | Description                                                                                    |
| -------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| [options]      | <code>object</code>            | Options                                                                                        |
| [options.page] | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of errors.              |
| [options.size] | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of errors. |
| [cancelToken]  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)             |

**Example**

```js
for await(const error of await api.Errors.list()) {}
```

<a name="Errors+get"></a>

### errors.get(id, [cancelToken]) ⇒ <code>Promise</code>

Gets information about one error.

**Kind**: instance method of [<code>Errors</code>](#Errors)  
**Returns**: <code>Promise</code> - Error information

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const error = await api.Errors.get("errorId");
```

<a name="NumberInfo"></a>

## NumberInfo

This resource provides a CNAM number info.

**Kind**: global class  
<a name="NumberInfo+get"></a>

### numberInfo.get(number, [cancelToken]) ⇒ <code>Promise</code>

Gets CNAM number info.

**Kind**: instance method of [<code>NumberInfo</code>](#NumberInfo)  
**Returns**: <code>Promise</code> - Promise

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| number        | <code>string</code>            |               | number                                                                             |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const numberInfo = await api.NumberInfo.get("number");
```

<a name="Messages"></a>

## Messages

The Messages resource lets you send SMS/MMS messages and view messages that were previously sent or received.

**Kind**: global class

* [Messages](#Messages)
  * [.list([options], [cancelToken])](#Messages+list) ⇒ <code>Promise</code>
  * [.send(options, [cancelToken])](#Messages+send) ⇒ <code>Promise</code>
  * [.get(id, [cancelToken])](#Messages+get) ⇒ <code>Promise</code>

<a name="Messages+list"></a>

### messages.list([options], [cancelToken]) ⇒ <code>Promise</code>

Gets a list of your messages.

**Kind**: instance method of [<code>Messages</code>](#Messages)  
**Returns**: <code>Promise</code> - List of messages

| Param                   | Type                           | Description                                                                                            |
| ----------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| [options]               | <code>object</code>            | Options                                                                                                |
| [options.from]          | <code>string</code>            | The phone number to filter the messages that came from (must be in E.164 format, like +19195551212).   |
| [options.to]            | <code>string</code>            | The phone number to filter the messages that was sent to (must be in E.164 format, like +19195551212). |
| [options.fromDateTime]  | <code>string</code>            | The starting date time to filter the messages                                                          |
| [options.toDateTime]    | <code>string</code>            | The ending date time to filter the messages                                                            |
| [options.direction]     | <code>string</code>            | Filter by direction of message                                                                         |
| [options.state]         | <code>string</code>            | The message state to filter.                                                                           |
| [options.deliveryState] | <code>string</code>            | The message delivery state to filter                                                                   |
| [options.sortOrder]     | <code>string</code>            | How to sort the messages.                                                                              |
| [options.page]          | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of numbers.                     |
| [options.size]          | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of numbers.        |
| [cancelToken]           | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                     |

**Example**

```js
for await(const message = await api.Messages.list()){}
```

<a name="Messages+send"></a>

### messages.send(options, [cancelToken]) ⇒ <code>Promise</code>

Sends one or more messages.

**Kind**: instance method of [<code>Messages</code>](#Messages)  
**Returns**: <code>Promise</code> - Created

| Param                        | Type                             | Description                                                                                                    |
| ---------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| options                      | <code>object</code>              | Options                                                                                                        |
| options.from                 | <code>string</code>              | One of your telephone numbers the message should come from (must be in E.164 format, like +19195551212).       |
| options.to                   | <code>string</code>              | The phone number the message should be sent to (must be in E.164 format, like +19195551212).                   |
| [options.text]               | <code>string</code>              | The contents of the text message (must be 2048 characters or less).                                            |
| [options.media]              | <code>Array.&lt;array&gt;</code> | For MMS messages, a media url to the location of the media or list of medias to be sent send with the message. |
| [options.receiptRequested]   | <code>string</code>              | Requested receipt option                                                                                       |
| [options.callbackUrl]        | <code>string</code>              | The server URL where the events related to the outgoing message will be sent to.                               |
| [options.callbackHttpMethod] | <code>string</code>              | Determine if the callback event should be sent                                                                 |
| [options.callbackTimeout]    | <code>number</code>              | Determine how long should the platform wait for callbackUrl’s response before timing out (milliseconds).       |
| [options.fallbackUrl]        | <code>string</code>              | The server URL used to send the message events if the request to callbackUrl fails.                            |
| [options.tag]                | <code>string</code>              | Any string, it will be included in the callback events of the message.                                         |
| [cancelToken]                | <code>axios.CancelToken</code>   | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                             |

**Example**

```js
const messageId = await api.Messages.send({from: "from1", to: "to1", text: "text1"});
```

<a name="Messages+get"></a>

### messages.get(id, [cancelToken]) ⇒ <code>Promise</code>

Gets information about a previously sent or received message

**Kind**: instance method of [<code>Messages</code>](#Messages)  
**Returns**: <code>Promise</code> - Message's data

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const message = await api.Messages.get("messageId");
```

<a name="MessagesV2"></a>

## MessagesV2

The next version of Messages resource lets you send SMS/MMS messages and view messages that were previously sent or received.

**Kind**: global class  
<a name="MessagesV2+send"></a>

### messagesV2.send(options, [cancelToken]) ⇒ <code>Promise</code>

Sends one or more messages.

**Kind**: instance method of [<code>MessagesV2</code>](#MessagesV2)  
**Returns**: <code>Promise</code> - Results of multiple message sending

| Param                 | Type                             | Description                                                                                              |
| --------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| options               | <code>object</code>              | Options                                                                                                  |
| options.from          | <code>string</code>              | One of your telephone numbers the message should come from (must be in E.164 format, like +19195551212). |
| options.to            | <code>\*</code>                  | The phone number the message should be sent                                                              |
| options.text          | <code>string</code>              | The contents of the text message                                                                         |
| options.applicationId | <code>string</code>              | The ID of the Application your from number is associated with in the Bandwidth Phone Number Dashboard.   |
| [options.media]       | <code>Array.&lt;array&gt;</code> | A list of URLs to include as media attachments as part of the message.                                   |
| [options.tag]         | <code>string</code>              | Any string which will be included in the callback events of the message.                                 |
| [cancelToken]         | <code>axios.CancelToken</code>   | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                       |

**Example**

```js
const result = await api.MessagesV2.send({from: "from1" to: "to1", text: "text1"});
```

<a name="PhoneNumbers"></a>

## PhoneNumbers

The Phone Numbers resource lets you get phone numbers for use with your programs and manage numbers you already have.

**Kind**: global class

* [PhoneNumbers](#PhoneNumbers)
  * [.list([options], [cancelToken])](#PhoneNumbers+list) ⇒ <code>Promise</code>
  * [.create(options, [cancelToken])](#PhoneNumbers+create) ⇒ <code>Promise</code>
  * [.get(id, [cancelToken])](#PhoneNumbers+get) ⇒ <code>Promise</code>
  * [.update(id, [options], [cancelToken])](#PhoneNumbers+update) ⇒ <code>Promise</code>
  * [.remove(id, [cancelToken])](#PhoneNumbers+remove) ⇒ <code>Promise</code>

<a name="PhoneNumbers+list"></a>

### phoneNumbers.list([options], [cancelToken]) ⇒ <code>Promise</code>

Gets a list of your numbers.

**Kind**: instance method of [<code>PhoneNumbers</code>](#PhoneNumbers)  
**Returns**: <code>Promise</code> - List of numbers

| Param                   | Type                           | Description                                                                                            |
| ----------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------ |
| [options]               | <code>object</code>            | Options                                                                                                |
| [options.applicationId] | <code>string</code>            | Used to filter the retrieved list of numbers by an associated application ID.                          |
| [options.state]         | <code>string</code>            | Used to filter the retrieved list of numbers allocated for the authenticated user by a US state.       |
| [options.name]          | <code>string</code>            | Used to filter the retrieved list of numbers allocated for the authenticated user by it’s name.        |
| [options.city]          | <code>string</code>            | Used to filter the retrieved list of numbers allocated for the authenticated user by it’s city.        |
| [options.numberState]   | <code>string</code>            | Used to filter the retrieved list of numbers allocated for the authenticated user by the number state. |
| [options.page]          | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of numbers.                     |
| [options.size]          | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of numbers.        |
| [cancelToken]           | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                     |

**Example**

```js
for await(const phoneNumber of await api.PhoneNumbers.list()) {}
```

<a name="PhoneNumbers+create"></a>

### phoneNumbers.create(options, [cancelToken]) ⇒ <code>Promise</code>

Allocates a number so you can use it to make and receive calls and send and receive messages.

**Kind**: instance method of [<code>PhoneNumbers</code>](#PhoneNumbers)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                    | Type                           | Description                                                                               |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------- |
| options                  | <code>object</code>            | Options                                                                                   |
| [options.name]           | <code>string</code>            | A name you choose for this number.                                                        |
| options.number           | <code>string</code>            | The telephone number in E.164 format.                                                     |
| [options.applicationId]  | <code>string</code>            | The unique id of an Application you want to associate with this number.                   |
| [options.fallbackNumber] | <code>string</code>            | Number to transfer an incoming call when the callback/fallback events can’t be delivered. |
| [cancelToken]            | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)        |

**Example**

```js
const id = await api.PhoneNumbers.create({number: "+12345678900"});
```

<a name="PhoneNumbers+get"></a>

### phoneNumbers.get(id, [cancelToken]) ⇒ <code>Promise</code>

Gets information about one of your numbers using the number's ID or E.164 number string, like "+19195551212"

**Kind**: instance method of [<code>PhoneNumbers</code>](#PhoneNumbers)  
**Returns**: <code>Promise</code> - Number information

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const phoneNumber = await api.PhoneNumbers.get("numberId");
```

<a name="PhoneNumbers+update"></a>

### phoneNumbers.update(id, [options], [cancelToken]) ⇒ <code>Promise</code>

Makes changes to a number user has.

**Kind**: instance method of [<code>PhoneNumbers</code>](#PhoneNumbers)  
**Returns**: <code>Promise</code> - Done

| Param                    | Type                           | Description                                                                               |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------- |
| id                       | <code>string</code>            | id                                                                                        |
| [options]                | <code>object</code>            | Options                                                                                   |
| [options.name]           | <code>string</code>            | A name you choose for this number.                                                        |
| [options.applicationId]  | <code>string</code>            | The unique id of an Application you want to associate with this number.                   |
| [options.fallbackNumber] | <code>string</code>            | Number to transfer an incoming call when the callback/fallback events can’t be delivered. |
| [cancelToken]            | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)        |

**Example**

```js
await api.PhoneNumbers.update("numberId", {applicationId: "appId"});
```

<a name="PhoneNumbers+remove"></a>

### phoneNumbers.remove(id, [cancelToken]) ⇒ <code>Promise</code>

Removes a number from your account so you can no longer make or receive calls, or send or receive messages with it.

**Kind**: instance method of [<code>PhoneNumbers</code>](#PhoneNumbers)  
**Returns**: <code>Promise</code> - Done

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
await api.PhoneNumbers.delete("numberId");
```

<a name="Recordings"></a>

## Recordings

Retrieve information about call recordings.

**Kind**: global class

* [Recordings](#Recordings)
  * [.list([options], [cancelToken])](#Recordings+list) ⇒ <code>Promise</code>
  * [.get(id, [cancelToken])](#Recordings+get) ⇒ <code>Promise</code>
  * [.getTranscriptions(id, [cancelToken])](#Recordings+getTranscriptions) ⇒ <code>Promise</code>
  * [.createTranscription(id, [cancelToken])](#Recordings+createTranscription) ⇒ <code>Promise</code>
  * [.getTranscription(id, transcriptionId, [cancelToken])](#Recordings+getTranscription) ⇒ <code>Promise</code>

<a name="Recordings+list"></a>

### recordings.list([options], [cancelToken]) ⇒ <code>Promise</code>

List all users' call recordings.

**Kind**: instance method of [<code>Recordings</code>](#Recordings)  
**Returns**: <code>Promise</code> - List of recordings

| Param          | Type                           | Description                                                                                        |
| -------------- | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| [options]      | <code>object</code>            | Options                                                                                            |
| [options.page] | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of recordings.              |
| [options.size] | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of recordings. |
| [cancelToken]  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                 |

**Example**

```js
for await(const recording of await api.Recordings.list()) {}
```

<a name="Recordings+get"></a>

### recordings.get(id, [cancelToken]) ⇒ <code>Promise</code>

Retrieve a specific call recording information

**Kind**: instance method of [<code>Recordings</code>](#Recordings)  
**Returns**: <code>Promise</code> - Recording information

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const recording = await api.Recordings.get("recordingId");
```

<a name="Recordings+getTranscriptions"></a>

### recordings.getTranscriptions(id, [cancelToken]) ⇒ <code>Promise</code>

Get all the transcriptions that were made for the given recoding

**Kind**: instance method of [<code>Recordings</code>](#Recordings)  
**Returns**: <code>Promise</code> - List of transcriptions

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const list = await api.Recordings.getTranscriptions();
```

<a name="Recordings+createTranscription"></a>

### recordings.createTranscription(id, [cancelToken]) ⇒ <code>Promise</code>

Request the transcription process to be started for the given recording id.

**Kind**: instance method of [<code>Recordings</code>](#Recordings)  
**Returns**: <code>Promise</code> - Id of created instance

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id            | <code>string</code>            |               | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const transcriptionId = await api.Recordings.createTranscription("recordingId");
```

<a name="Recordings+getTranscription"></a>

### recordings.getTranscription(id, transcriptionId, [cancelToken]) ⇒ <code>Promise</code>

Get information about the transcription, regardless its state.

**Kind**: instance method of [<code>Recordings</code>](#Recordings)  
**Returns**: <code>Promise</code> - Done

| Param           | Type                           | Default       | Description                                                                        |
| --------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| id              | <code>string</code>            |               | id                                                                                 |
| transcriptionId | <code>string</code>            |               | transcriptionId                                                                    |
| [cancelToken]   | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

**Example**

```js
const transcription = await api.Recordings.get("recordingId", "transcriptionId");
```

<a name="BandwidthApi"></a>

## BandwidthApi

Bandwidth Api (internal class)

**Kind**: global class

* [BandwidthApi](#BandwidthApi)
  * [.Account](#BandwidthApi+Account) : [<code>Account</code>](#Account)
  * [.Applications](#BandwidthApi+Applications) : [<code>Applications</code>](#Applications)
  * [.Media](#BandwidthApi+Media) : [<code>Media</code>](#Media)
  * [.AvailableNumbers](#BandwidthApi+AvailableNumbers) : [<code>AvailableNumbers</code>](#AvailableNumbers)
  * [.Bridges](#BandwidthApi+Bridges) : [<code>Bridges</code>](#Bridges)
  * [.Calls](#BandwidthApi+Calls) : [<code>Calls</code>](#Calls)
  * [.Conferences](#BandwidthApi+Conferences) : [<code>Conferences</code>](#Conferences)
  * [.Domains](#BandwidthApi+Domains) : [<code>Domains</code>](#Domains)
  * [.Errors](#BandwidthApi+Errors) : [<code>Errors</code>](#Errors)
  * [.NumberInfo](#BandwidthApi+NumberInfo) : [<code>NumberInfo</code>](#NumberInfo)
  * [.Messages](#BandwidthApi+Messages) : [<code>Messages</code>](#Messages)
  * [.MessagesV2](#BandwidthApi+MessagesV2) : [<code>MessagesV2</code>](#MessagesV2)
  * [.PhoneNumbers](#BandwidthApi+PhoneNumbers) : [<code>PhoneNumbers</code>](#PhoneNumbers)
  * [.Recordings](#BandwidthApi+Recordings) : [<code>Recordings</code>](#Recordings)

<a name="BandwidthApi+Account"></a>

### bandwidthApi.Account : [<code>Account</code>](#Account)

The Account API allows you to retrieve your current balance, transaction list, account type and all elements related to your platform account.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+Applications"></a>

### bandwidthApi.Applications : [<code>Applications</code>](#Applications)

Applications allow you to receive incoming call and messaging events.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+Media"></a>

### bandwidthApi.Media : [<code>Media</code>](#Media)

The Media resource lets you upload your media files to Bandwidth API servers so they can be used in applications without requiring a separate hosting provider.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+AvailableNumbers"></a>

### bandwidthApi.AvailableNumbers : [<code>AvailableNumbers</code>](#AvailableNumbers)

The Available Numbers resource lets you search for numbers that are available for use with your application.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+Bridges"></a>

### bandwidthApi.Bridges : [<code>Bridges</code>](#Bridges)

The Bridges resource allows you to bridge two calls together allowing for two way audio between them.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+Calls"></a>

### bandwidthApi.Calls : [<code>Calls</code>](#Calls)

The Calls resource lets you make phone calls and view information about previous inbound and outbound calls.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+Conferences"></a>

### bandwidthApi.Conferences : [<code>Conferences</code>](#Conferences)

The Conference resource allows you create conferences, add members to it, play audio, speak text, mute/unmute members, hold/unhold members and other things related to conferencing.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+Domains"></a>

### bandwidthApi.Domains : [<code>Domains</code>](#Domains)

A domain is a way to logically group endpoints.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+Errors"></a>

### bandwidthApi.Errors : [<code>Errors</code>](#Errors)

The Errors resource lets you see information about errors that happened in your API calls and during applications callbacks.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+NumberInfo"></a>

### bandwidthApi.NumberInfo : [<code>NumberInfo</code>](#NumberInfo)

This resource provides a CNAM number info.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+Messages"></a>

### bandwidthApi.Messages : [<code>Messages</code>](#Messages)

The Messages resource lets you send SMS/MMS messages and view messages that were previously sent or received.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+MessagesV2"></a>

### bandwidthApi.MessagesV2 : [<code>MessagesV2</code>](#MessagesV2)

The next version of Messages resource lets you send SMS/MMS messages and view messages that were previously sent or received.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+PhoneNumbers"></a>

### bandwidthApi.PhoneNumbers : [<code>PhoneNumbers</code>](#PhoneNumbers)

The Phone Numbers resource lets you get phone numbers for use with your programs and manage numbers you already have.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="BandwidthApi+Recordings"></a>

### bandwidthApi.Recordings : [<code>Recordings</code>](#Recordings)

Retrieve information about call recordings.

**Kind**: instance property of [<code>BandwidthApi</code>](#BandwidthApi)  
<a name="UnexpectedResponseError"></a>

## UnexpectedResponseError

Bandwidth API request error

**Kind**: global class  
<a name="RateLimitError"></a>

## RateLimitError

Bandwidth API rate limit error

**Kind**: global class  
<a name="BandwidthXml"></a>

## BandwidthXml

Bandwidth XML (internal class)

**Kind**: global class

* [BandwidthXml](#BandwidthXml)
  * [.response(verbs)](#BandwidthXml+response) ⇒ <code>string</code>
  * [.gather(requestUrl, verbs, options)](#BandwidthXml+gather) ⇒ <code>string</code>
  * [.hangup()](#BandwidthXml+hangup) ⇒ <code>string</code>
  * [.playAudio(url)](#BandwidthXml+playAudio) ⇒ <code>string</code>
  * [.redirect(requestUrl, requestUrlTimeout)](#BandwidthXml+redirect) ⇒ <code>string</code>
  * [.speakSentence(sentence, options)](#BandwidthXml+speakSentence) ⇒ <code>string</code>
  * [.transfer(transferTo, verbs, options)](#BandwidthXml+transfer) ⇒ <code>string</code>
  * [.record(options)](#BandwidthXml+record) ⇒ <code>string</code>

<a name="BandwidthXml+response"></a>

### bandwidthXml.response(verbs) ⇒ <code>string</code>

Response

**Kind**: instance method of [<code>BandwidthXml</code>](#BandwidthXml)  
**Returns**: <code>string</code> - Bandwidth XML response string

| Param | Type                                                     | Description                     |
| ----- | -------------------------------------------------------- | ------------------------------- |
| verbs | <code>string</code> \| <code>Array.&lt;string&gt;</code> | One on more Bandwidth XML verbs |

**Example**

```js
const xml = bandwidthXml.response(bandwidthXml.hangup());
```

<a name="BandwidthXml+gather"></a>

### bandwidthXml.gather(requestUrl, verbs, options) ⇒ <code>string</code>

Verb 'Gather'

**Kind**: instance method of [<code>BandwidthXml</code>](#BandwidthXml)  
**Returns**: <code>string</code> - verb's xml

| Param                       | Type                              | Description                                                                                                                        |
| --------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| requestUrl                  | <code>string</code>               | Absolute URL to send events to and request new BXML                                                                                |
| verbs                       | <code>Array.&lt;string&gt;</code> | Nestable Verbs                                                                                                                     |
| options                     | <code>object</code>               | Optional options                                                                                                                   |
| [options.requestUrlTimeout] | <code>number</code>               | Integer time in milliseconds to wait for requestUrl response (Default value is 30000).                                             |
| [options.terminatingDigits] | <code>string</code>               | Digits to stop gather                                                                                                              |
| [options.maxDigits]         | <code>number</code>               | Quantity of digits to collect                                                                                                      |
| [options.interDigitTimeout] | <code>number</code>               | Integer time indicating the timeout between digits (Default value is 5 seconds).                                                   |
| [options.bargeable]         | <code>boolean</code>              | Always considered 'true'. Boolean to indicate if audio playback should be stopped when digit is pressed (Default value is ‘true’). |
| [options.tag]               | <code>string</code>               | A string that will be included in the callback events of the gather.                                                               |

<a name="BandwidthXml+hangup"></a>

### bandwidthXml.hangup() ⇒ <code>string</code>

Verb 'Hangup'

**Kind**: instance method of [<code>BandwidthXml</code>](#BandwidthXml)  
**Returns**: <code>string</code> - verb's xml  
<a name="BandwidthXml+playAudio"></a>

### bandwidthXml.playAudio(url) ⇒ <code>string</code>

Verb 'PlayAudio'

**Kind**: instance method of [<code>BandwidthXml</code>](#BandwidthXml)  
**Returns**: <code>string</code> - verb's xml

| Param | Type                | Description       |
| ----- | ------------------- | ----------------- |
| url   | <code>string</code> | Url to media file |

<a name="BandwidthXml+redirect"></a>

### bandwidthXml.redirect(requestUrl, requestUrlTimeout) ⇒ <code>string</code>

Verb 'Redirect'

**Kind**: instance method of [<code>BandwidthXml</code>](#BandwidthXml)  
**Returns**: <code>string</code> - verb's xml

| Param             | Type                | Description                                          |
| ----------------- | ------------------- | ---------------------------------------------------- |
| requestUrl        | <code>string</code> | Absolute URL to send event and request new BXML.     |
| requestUrlTimeout | <code>number</code> | Time (milliseconds) to wait for requestUrl response. |

<a name="BandwidthXml+speakSentence"></a>

### bandwidthXml.speakSentence(sentence, options) ⇒ <code>string</code>

Verb 'SpeakSentence'

**Kind**: instance method of [<code>BandwidthXml</code>](#BandwidthXml)  
**Returns**: <code>string</code> - verb's xml

| Param            | Type                | Description                                         |
| ---------------- | ------------------- | --------------------------------------------------- |
| sentence         | <code>string</code> | Sentence to say                                     |
| options          | <code>object</code> | Optional options                                    |
| [options.gender] | <code>string</code> | Select the gender of the speaker                    |
| [options.locale] | <code>string</code> | Select the accent of the speaker                    |
| [options.voice]  | <code>string</code> | Select the voice of the speaker, limited by gender. |

<a name="BandwidthXml+transfer"></a>

### bandwidthXml.transfer(transferTo, verbs, options) ⇒ <code>string</code>

Verb 'Transfer'

**Kind**: instance method of [<code>BandwidthXml</code>](#BandwidthXml)  
**Returns**: <code>string</code> - verb's xml

| Param                       | Type                                                     | Description                                                                                 |
| --------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| transferTo                  | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Defines the number the call will be transferred to.                                         |
| verbs                       | <code>Array.&lt;string&gt;</code>                        | Nestable Verbs                                                                              |
| options                     | <code>object</code>                                      | Optional options                                                                            |
| [options.transferCallerId]  | <code>string</code>                                      | This is the caller id that will be used when the call is transferred.                       |
| [options.callTimeout]       | <code>number</code>                                      | This is the timeout (seconds) for the callee to answer the call.                            |
| [options.requestUrl]        | <code>string</code>                                      | Relative or absolute URL to send event and request new BXML when transferred call hangs up. |
| [options.requestUrlTimeout] | <code>number</code>                                      | Timeout (milliseconds) to request new BXML.                                                 |
| [options.tag]               | <code>string</code>                                      | A string that will be included in the callback events of the transfer.                      |

<a name="BandwidthXml+record"></a>

### bandwidthXml.record(options) ⇒ <code>string</code>

Verb 'Record'

**Kind**: instance method of [<code>BandwidthXml</code>](#BandwidthXml)  
**Returns**: <code>string</code> - verb's xml

| Param                           | Type                 | Description                                                                                                                              |
| ------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| options                         | <code>object</code>  | Optional options                                                                                                                         |
| [options.requestUrl]            | <code>string</code>  | Relative or absolute URL to send event                                                                                                   |
| [options.requestUrlTimeout]     | <code>number</code>  | Timeout (milliseconds) to request new BXML.                                                                                              |
| [options.fileFormat]            | <code>string</code>  | The format that the recording will be saved                                                                                              |
| [options.transcribe]            | <code>boolean</code> | A boolean value to indicate that recording must be transcribed.                                                                          |
| [options.transcribeCallbackUrl] | <code>string</code>  | Absolute URL to send transcribed event.                                                                                                  |
| [options.multiChannel]          | <code>boolean</code> | Record the caller and called party voices on 2 separate channels in the same file.                                                       |
| [options.maxDuration]           | <code>number</code>  | Number of seconds to record the caller’s voice. Default 60.                                                                              |
| [options.silenceTimeout]        | <code>number</code>  | Number of seconds of silence detected before ending the recording.                                                                       |
| [options.silenceThreshold]      | <code>number</code>  | This setting controls when the silence timeout is effective. Set this number higher in noisy environments to detect voice and “silence”. |
| [options.terminatingDigits]     | <code>string</code>  | Digit that the caller presses to indicate that the recording can be stopped. It can be any one of 0-9\*#.                                |

<a name="bandwidthXml"></a>

## bandwidthXml : [<code>BandwidthXml</code>](#BandwidthXml)

Bandwidth Xml

**Kind**: global constant  
<a name="getBandwidthApi"></a>

## getBandwidthApi(options) ⇒ [<code>BandwidthApi</code>](#BandwidthApi)

Return Bandwidth API instance

**Kind**: global function  
**Returns**: [<code>BandwidthApi</code>](#BandwidthApi) - instance of BandwidthAPI

| Param             | Type                | Description                            |
| ----------------- | ------------------- | -------------------------------------- |
| options           | <code>object</code> | Options                                |
| options.userId    | <code>string</code> | Your Bandwidth user ID (not user name) |
| options.apiToken  | <code>string</code> | Your API Token                         |
| options.apiSecret | <code>string</code> | Your API Secret                        |
| [options.baseUrl] | <code>string</code> | The Bandwidth API base URL             |
