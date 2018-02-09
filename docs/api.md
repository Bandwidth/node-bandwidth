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
<dd><p>Bandwidth Api</p>
</dd>
<dt><a href="#UnexpectedResponseError">UnexpectedResponseError</a></dt>
<dd><p>Bandwidth API request error</p>
</dd>
<dt><a href="#RateLimitError">RateLimitError</a></dt>
<dd><p>Bandwidth API rate limit error</p>
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

<a name="Applications"></a>

## Applications

Applications allow you to receive incoming call and messaging events.

**Kind**: global class

* [Applications](#Applications)
  * [.list([options], [cancelToken])](#Applications+list) ⇒ <code>Promise</code>
  * [.create(options, [cancelToken])](#Applications+create) ⇒ <code>Promise</code>
  * [.get(options, [cancelToken])](#Applications+get) ⇒ <code>Promise</code>
  * [.update(options, [cancelToken])](#Applications+update) ⇒ <code>Promise</code>
  * [.delete(options, [cancelToken])](#Applications+delete) ⇒ <code>Promise</code>

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

<a name="Applications+get"></a>

### applications.get(options, [cancelToken]) ⇒ <code>Promise</code>

Gets information about one of your applications.

**Kind**: instance method of [<code>Applications</code>](#Applications)  
**Returns**: <code>Promise</code> - Application's data

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Applications+update"></a>

### applications.update(options, [cancelToken]) ⇒ <code>Promise</code>

Makes changes to an application.

**Kind**: instance method of [<code>Applications</code>](#Applications)  
**Returns**: <code>Promise</code> - Done

| Param                                       | Type                           | Description                                                                                                                                                                                        |
| ------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                                     | <code>object</code>            | Options                                                                                                                                                                                            |
| [options.name]                              | <code>string</code>            | A name you choose for this application.                                                                                                                                                            |
| [options.incomingCallUrl]                   | <code>string</code>            | A URL where call events will be sent for an inbound call. This is the endpoint where the Application Platform will send all call events. Either incomingCallUrl or incomingMessageUrl is required. |
| [options.incomingCallUrlCallbackTimeout]    | <code>number</code>            | Determine how long should the platform wait for incomingCallUrl's response before timing out in milliseconds.                                                                                      |
| [options.incomingCallFallbackUrl]           | <code>string</code>            | The URL used to send the callback event if the request to incomingCallUrl fails.                                                                                                                   |
| [options.incomingMessageUrl]                | <code>string</code>            | The unique identifier for the application                                                                                                                                                          |
| [options.incomingMessageUrlCallbackTimeout] | <code>number</code>            | The unique identifier for the application                                                                                                                                                          |
| [options.incomingMessageFallbackUrl]        | <code>string</code>            | The unique identifier for the application                                                                                                                                                          |
| [options.callbackHttpMethod]                | <code>string</code>            | Determine if the callback event should be sent via HTTP GET or HTTP POST. Values are "get" or "post", default: "post".                                                                             |
| [options.autoAnswer]                        | <code>boolean</code>           | Determines whether or not an incoming call should be automatically answered.                                                                                                                       |
| [options.id]                                | <code>string</code>            | id                                                                                                                                                                                                 |
| [cancelToken]                               | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                                                 |

<a name="Applications+delete"></a>

### applications.delete(options, [cancelToken]) ⇒ <code>Promise</code>

Permanently deletes an application.

**Kind**: instance method of [<code>Applications</code>](#Applications)  
**Returns**: <code>Promise</code> - Done

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Media"></a>

## Media

The Media resource lets you upload your media files to Bandwidth API servers so they can be used in applications without requiring a separate hosting provider.

**Kind**: global class

* [Media](#Media)
  * [.list([cancelToken])](#Media+list) ⇒ <code>Promise</code>
  * [.download(options, [cancelToken])](#Media+download) ⇒ <code>Promise</code>
  * [.upload(options, [cancelToken])](#Media+upload) ⇒ <code>Promise</code>
  * [.delete(options, [cancelToken])](#Media+delete) ⇒ <code>Promise</code>

<a name="Media+list"></a>

### media.list([cancelToken]) ⇒ <code>Promise</code>

Gets a list of your media files.

**Kind**: instance method of [<code>Media</code>](#Media)  
**Returns**: <code>Promise</code> - list of media files data

| Param         | Type                           | Default       | Description                                                                        |
| ------------- | ------------------------------ | ------------- | ---------------------------------------------------------------------------------- |
| [cancelToken] | <code>axios.CancelToken</code> | <code></code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Media+download"></a>

### media.download(options, [cancelToken]) ⇒ <code>Promise</code>

Downloads a media file you previously uploaded.

**Kind**: instance method of [<code>Media</code>](#Media)  
**Returns**: <code>Promise</code> - Content of file

| Param                  | Type                           | Description                                                                               |
| ---------------------- | ------------------------------ | ----------------------------------------------------------------------------------------- |
| options                | <code>object</code>            | Options                                                                                   |
| [options.mediaName]    | <code>string</code>            | mediaName                                                                                 |
| [options.responseType] | <code>string</code>            | responseType Valid values are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream' |
| [cancelToken]          | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)        |

<a name="Media+upload"></a>

### media.upload(options, [cancelToken]) ⇒ <code>Promise</code>

Uploads a file the normal HTTP way.

**Kind**: instance method of [<code>Media</code>](#Media)  
**Returns**: <code>Promise</code> - Success

| Param                 | Type                           | Description                                                                        |
| --------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options               | <code>object</code>            | Options                                                                            |
| [options.mediaName]   | <code>string</code>            | mediaName                                                                          |
| [options.content]     | <code>\*</code>                | content                                                                            |
| [options.contentType] | <code>string</code>            | contentType                                                                        |
| [cancelToken]         | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Media+delete"></a>

### media.delete(options, [cancelToken]) ⇒ <code>Promise</code>

Deletes a media file from Bandwidth API server.

**Kind**: instance method of [<code>Media</code>](#Media)  
**Returns**: <code>Promise</code> - Success

| Param               | Type                           | Description                                                                        |
| ------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options             | <code>object</code>            | Options                                                                            |
| [options.mediaName] | <code>string</code>            | mediaName                                                                          |
| [cancelToken]       | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

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

<a name="Bridges"></a>

## Bridges

The Bridges resource allows you to bridge two calls together allowing for two way audio between them.

**Kind**: global class

* [Bridges](#Bridges)
  * [.list(options, [cancelToken])](#Bridges+list) ⇒ <code>Promise</code>
  * [.create([options], [cancelToken])](#Bridges+create) ⇒ <code>Promise</code>
  * [.get(options, [cancelToken])](#Bridges+get) ⇒ <code>Promise</code>
  * [.update(options, [cancelToken])](#Bridges+update) ⇒ <code>Promise</code>
  * [.playAudio(options, [cancelToken])](#Bridges+playAudio) ⇒ <code>Promise</code>

<a name="Bridges+list"></a>

### bridges.list(options, [cancelToken]) ⇒ <code>Promise</code>

Get the list of calls that are on the bridge.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - list of bridge's calls

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

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

<a name="Bridges+get"></a>

### bridges.get(options, [cancelToken]) ⇒ <code>Promise</code>

Gets information about a specific bridge.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Bridge's data

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Bridges+update"></a>

### bridges.update(options, [cancelToken]) ⇒ <code>Promise</code>

Change calls in a bridge and bridge/unbridge the audio.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Done

| Param                 | Type                             | Description                                                                        |
| --------------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| options               | <code>object</code>              | Options                                                                            |
| [options.callIds]     | <code>Array.&lt;array&gt;</code> | List of call Ids that will be in the bridge.                                       |
| [options.bridgeAudio] | <code>string</code>              | Enable/Disable two way audio path.                                                 |
| [options.id]          | <code>string</code>              | id                                                                                 |
| [cancelToken]         | <code>axios.CancelToken</code>   | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Bridges+playAudio"></a>

### bridges.playAudio(options, [cancelToken]) ⇒ <code>Promise</code>

Play an audio file or speak a sentence in a bridge.

**Kind**: instance method of [<code>Bridges</code>](#Bridges)  
**Returns**: <code>Promise</code> - Done

| Param              | Type                           | Description                                                                                        |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| options            | <code>object</code>            | Options                                                                                            |
| [options.fileUrl]  | <code>string</code>            | The location of an audio file to play (WAV and MP3 supported).                                     |
| [options.sentence] | <code>string</code>            | The sentence to speak.                                                                             |
| [options.gender]   | <code>string</code>            | The gender of the voice used to synthesize the sentence.                                           |
| [options.locale]   | <code>string</code>            | The sentence to speak.                                                                             |
| [options.voice]    | <code>string</code>            | The voice to speak the sentence                                                                    |
| [options.tag]      | <code>string</code>            | A string that will be included in the events delivered when the audio playback starts or finishes. |
| [options.id]       | <code>string</code>            | id                                                                                                 |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                 |

<a name="Calls"></a>

## Calls

The Calls resource lets you make phone calls and view information about previous inbound and outbound calls.

**Kind**: global class

* [Calls](#Calls)
  * [.list([options], [cancelToken])](#Calls+list) ⇒ <code>Promise</code>
  * [.create(options, [cancelToken])](#Calls+create) ⇒ <code>Promise</code>
  * [.get(options, [cancelToken])](#Calls+get) ⇒ <code>Promise</code>
  * [.update(options, [cancelToken])](#Calls+update) ⇒ <code>Promise</code>
  * [.playAudio(options, [cancelToken])](#Calls+playAudio) ⇒ <code>Promise</code>
  * [.sendDtmf(options, [cancelToken])](#Calls+sendDtmf) ⇒ <code>Promise</code>
  * [.getEvents(options, [cancelToken])](#Calls+getEvents) ⇒ <code>Promise</code>
  * [.getEvent(options, [cancelToken])](#Calls+getEvent) ⇒ <code>Promise</code>
  * [.getRecordings(options, [cancelToken])](#Calls+getRecordings) ⇒ <code>Promise</code>
  * [.getTranscriptions(options, [cancelToken])](#Calls+getTranscriptions) ⇒ <code>Promise</code>
  * [.createGather(options, [cancelToken])](#Calls+createGather) ⇒ <code>Promise</code>
  * [.getGather(options, [cancelToken])](#Calls+getGather) ⇒ <code>Promise</code>
  * [.updateGather(options, [cancelToken])](#Calls+updateGather) ⇒ <code>Promise</code>

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

<a name="Calls+get"></a>

### calls.get(options, [cancelToken]) ⇒ <code>Promise</code>

Gets information about an active or completed call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Call's data

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Calls+update"></a>

### calls.update(options, [cancelToken]) ⇒ <code>Promise</code>

Update properties of an active phone call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Done

| Param                          | Type                           | Description                                                                                               |
| ------------------------------ | ------------------------------ | --------------------------------------------------------------------------------------------------------- |
| options                        | <code>object</code>            | Options                                                                                                   |
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
| [options.id]                   | <code>string</code>            | id                                                                                                        |
| [cancelToken]                  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                        |

<a name="Calls+playAudio"></a>

### calls.playAudio(options, [cancelToken]) ⇒ <code>Promise</code>

Play an audio file or speak a sentence in a call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Done

| Param              | Type                           | Description                                                                                        |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| options            | <code>object</code>            | Options                                                                                            |
| [options.fileUrl]  | <code>string</code>            | The location of an audio file to play (WAV and MP3 supported).                                     |
| [options.sentence] | <code>string</code>            | The sentence to speak.                                                                             |
| [options.gender]   | <code>string</code>            | The gender of the voice used to synthesize the sentence.                                           |
| [options.locale]   | <code>string</code>            | The sentence to speak.                                                                             |
| [options.voice]    | <code>string</code>            | The voice to speak the sentence                                                                    |
| [options.tag]      | <code>string</code>            | A string that will be included in the events delivered when the audio playback starts or finishes. |
| [options.id]       | <code>string</code>            | id                                                                                                 |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                 |

<a name="Calls+sendDtmf"></a>

### calls.sendDtmf(options, [cancelToken]) ⇒ <code>Promise</code>

Send DTMF (phone keypad digit presses).

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Done

| Param             | Type                           | Description                                                                                    |
| ----------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| options           | <code>object</code>            | Options                                                                                        |
| [options.dtmfOut] | <code>string</code>            | String containing the DTMF characters to be sent in a call. Allows a maximum of 92 characters. |
| [options.id]      | <code>string</code>            | id                                                                                             |
| [cancelToken]     | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)             |

<a name="Calls+getEvents"></a>

### calls.getEvents(options, [cancelToken]) ⇒ <code>Promise</code>

Gets the events that occurred during the call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - list of call's events

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Calls+getEvent"></a>

### calls.getEvent(options, [cancelToken]) ⇒ <code>Promise</code>

Gets information about one call event.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - information about call event

| Param             | Type                           | Description                                                                        |
| ----------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options           | <code>object</code>            | Options                                                                            |
| [options.id]      | <code>string</code>            | id                                                                                 |
| [options.eventId] | <code>string</code>            | eventId                                                                            |
| [cancelToken]     | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Calls+getRecordings"></a>

### calls.getRecordings(options, [cancelToken]) ⇒ <code>Promise</code>

Retrieve all recordings related to the call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - list of call's recordings

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Calls+getTranscriptions"></a>

### calls.getTranscriptions(options, [cancelToken]) ⇒ <code>Promise</code>

Retrieve all transcriptions related to the call.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - list of call's transcriptions

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Calls+createGather"></a>

### calls.createGather(options, [cancelToken]) ⇒ <code>Promise</code>

Collects a series of DTMF digits from a phone call with an optional prompt.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                        | Type                           | Description                                                                                                                                                                            |
| ---------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                      | <code>object</code>            | Options                                                                                                                                                                                |
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
| [options.id]                 | <code>string</code>            | id                                                                                                                                                                                     |
| [cancelToken]                | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                                     |

<a name="Calls+getGather"></a>

### calls.getGather(options, [cancelToken]) ⇒ <code>Promise</code>

Get the gather DTMF parameters and results.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Gather information

| Param              | Type                           | Description                                                                        |
| ------------------ | ------------------------------ | ---------------------------------------------------------------------------------- |
| options            | <code>object</code>            | Options                                                                            |
| [options.id]       | <code>string</code>            | id                                                                                 |
| [options.gatherId] | <code>string</code>            | gatherId                                                                           |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Calls+updateGather"></a>

### calls.updateGather(options, [cancelToken]) ⇒ <code>Promise</code>

Update the gather.

**Kind**: instance method of [<code>Calls</code>](#Calls)  
**Returns**: <code>Promise</code> - Done

| Param              | Type                           | Description                                                                        |
| ------------------ | ------------------------------ | ---------------------------------------------------------------------------------- |
| options            | <code>object</code>            | Options                                                                            |
| [options.state]    | <code>string</code>            | Update the gather.                                                                 |
| [options.id]       | <code>string</code>            | id                                                                                 |
| [options.gatherId] | <code>string</code>            | gatherId                                                                           |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences"></a>

## Conferences

The Conference resource allows you create conferences, add members to it, play audio, speak text, mute/unmute members, hold/unhold members and other things related to conferencing.

**Kind**: global class

* [Conferences](#Conferences)
  * [.create([options], [cancelToken])](#Conferences+create) ⇒ <code>Promise</code>
  * [.get(options, [cancelToken])](#Conferences+get) ⇒ <code>Promise</code>
  * [.update(options, [cancelToken])](#Conferences+update) ⇒ <code>Promise</code>
  * [.playAudio(options, [cancelToken])](#Conferences+playAudio) ⇒ <code>Promise</code>
  * [.getMembers(options, [cancelToken])](#Conferences+getMembers) ⇒ <code>Promise</code>
  * [.addMember(options, [cancelToken])](#Conferences+addMember) ⇒ <code>Promise</code>
  * [.getMember(options, [cancelToken])](#Conferences+getMember) ⇒ <code>Promise</code>
  * [.updateMember(options, [cancelToken])](#Conferences+updateMember) ⇒ <code>Promise</code>
  * [.playAudioToMember(options, [cancelToken])](#Conferences+playAudioToMember) ⇒ <code>Promise</code>

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

<a name="Conferences+get"></a>

### conferences.get(options, [cancelToken]) ⇒ <code>Promise</code>

Gets information about a conference.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Conference's data

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+update"></a>

### conferences.update(options, [cancelToken]) ⇒ <code>Promise</code>

Update properties of an active conference.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - information about call event

| Param                        | Type                           | Description                                                                                                                                             |
| ---------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                      | <code>object</code>            | Options                                                                                                                                                 |
| [options.state]              | <code>string</code>            | Conference state.                                                                                                                                       |
| [options.hold]               | <code>boolean</code>           | If true, all member can’t hear or speak in the conference. If false, all members can hear and speak in the conference (unless set at the member level). |
| [options.mute]               | <code>boolean</code>           | If true, all member can’t speak in the conference. If false, all members can speak in the conference (unless set at the member level).                  |
| [options.callbackTimeout]    | <code>number</code>            | Determine how long should the platform wait for callbackUrl’s response before timing out in milliseconds.                                               |
| [options.callbackUrl]        | <code>string</code>            | The server URL where the call events related to the call will be sent.                                                                                  |
| [options.callbackHttpMethod] | <code>string</code>            | Determine if the callback event should be sent via HTTP GET or HTTP POST                                                                                |
| [options.fallbackUrl]        | <code>string</code>            | he full server URL used to send the callback event if the request to callbackUrl fails.                                                                 |
| [options.tag]                | <code>string</code>            | A string that will be included in the callback events of the conference.                                                                                |
| [options.id]                 | <code>string</code>            | id                                                                                                                                                      |
| [cancelToken]                | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                      |

<a name="Conferences+playAudio"></a>

### conferences.playAudio(options, [cancelToken]) ⇒ <code>Promise</code>

Play an audio file or speak a sentence in a conference.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Done

| Param              | Type                           | Description                                                                                        |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| options            | <code>object</code>            | Options                                                                                            |
| [options.fileUrl]  | <code>string</code>            | The location of an audio file to play (WAV and MP3 supported).                                     |
| [options.sentence] | <code>string</code>            | The sentence to speak.                                                                             |
| [options.gender]   | <code>string</code>            | The gender of the voice used to synthesize the sentence.                                           |
| [options.locale]   | <code>string</code>            | The sentence to speak.                                                                             |
| [options.voice]    | <code>string</code>            | The voice to speak the sentence                                                                    |
| [options.tag]      | <code>string</code>            | A string that will be included in the events delivered when the audio playback starts or finishes. |
| [options.id]       | <code>string</code>            | id                                                                                                 |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                 |

<a name="Conferences+getMembers"></a>

### conferences.getMembers(options, [cancelToken]) ⇒ <code>Promise</code>

Get information about a conference members.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Conference members data

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+addMember"></a>

### conferences.addMember(options, [cancelToken]) ⇒ <code>Promise</code>

Add members to a conference.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                 | Type                           | Description                                                                                                                                        |
| --------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| options               | <code>object</code>            | Options                                                                                                                                            |
| options.callId        | <code>string</code>            | The callId must refer to an active call that was created using this conferenceId.                                                                  |
| [options.joinTone]    | <code>boolean</code>           | If true, will play a tone when the member joins the conference. If false, no tone is played when the member joins the conference.                  |
| [options.leavingTone] | <code>boolean</code>           | If true, will play a tone when the member leaves the conference. If false, no tone is played when the member leaves the conference.                |
| [options.mute]        | <code>boolean</code>           | If true, member can’t speak in the conference. If false, this members can speak in the conference (unless set at the conference level).            |
| [options.hold]        | <code>boolean</code>           | If true, member can’t hear or speak in the conference. If false, member can hear and speak in the conference (unless set at the conference level). |
| [options.id]          | <code>string</code>            | id                                                                                                                                                 |
| [cancelToken]         | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                 |

<a name="Conferences+getMember"></a>

### conferences.getMember(options, [cancelToken]) ⇒ <code>Promise</code>

Retrieve a conference member properties.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - information about conference

| Param              | Type                           | Description                                                                        |
| ------------------ | ------------------------------ | ---------------------------------------------------------------------------------- |
| options            | <code>object</code>            | Options                                                                            |
| [options.id]       | <code>string</code>            | id                                                                                 |
| [options.memberId] | <code>string</code>            | memberId                                                                           |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Conferences+updateMember"></a>

### conferences.updateMember(options, [cancelToken]) ⇒ <code>Promise</code>

Update a member status/properties.

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Done

| Param                 | Type                           | Description                                                                                                                                        |
| --------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| options               | <code>object</code>            | Options                                                                                                                                            |
| [options.state]       | <code>string</code>            | If `completed`, member will be removed from the conference.                                                                                        |
| [options.joinTone]    | <code>boolean</code>           | If true, will play a tone when the member joins the conference. If false, no tone is played when the member joins the conference.                  |
| [options.leavingTone] | <code>boolean</code>           | If true, will play a tone when the member leaves the conference. If false, no tone is played when the member leaves the conference.                |
| [options.mute]        | <code>boolean</code>           | If true, member can’t speak in the conference. If false, this members can speak in the conference (unless set at the conference level).            |
| [options.hold]        | <code>boolean</code>           | If true, member can’t hear or speak in the conference. If false, member can hear and speak in the conference (unless set at the conference level). |
| [options.id]          | <code>string</code>            | id                                                                                                                                                 |
| [options.memberId]    | <code>string</code>            | memberId                                                                                                                                           |
| [cancelToken]         | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                 |

<a name="Conferences+playAudioToMember"></a>

### conferences.playAudioToMember(options, [cancelToken]) ⇒ <code>Promise</code>

Speak text or play audio to only a single conference member

**Kind**: instance method of [<code>Conferences</code>](#Conferences)  
**Returns**: <code>Promise</code> - Done

| Param              | Type                           | Description                                                                                        |
| ------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- |
| options            | <code>object</code>            | Options                                                                                            |
| [options.fileUrl]  | <code>string</code>            | The location of an audio file to play (WAV and MP3 supported).                                     |
| [options.sentence] | <code>string</code>            | The sentence to speak.                                                                             |
| [options.gender]   | <code>string</code>            | The gender of the voice used to synthesize the sentence.                                           |
| [options.locale]   | <code>string</code>            | The sentence to speak.                                                                             |
| [options.voice]    | <code>string</code>            | The voice to speak the sentence                                                                    |
| [options.tag]      | <code>string</code>            | A string that will be included in the events delivered when the audio playback starts or finishes. |
| [options.id]       | <code>string</code>            | id                                                                                                 |
| [options.memberId] | <code>string</code>            | memberId                                                                                           |
| [cancelToken]      | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                 |

<a name="Domains"></a>

## Domains

A domain is a way to logically group endpoints.

**Kind**: global class

* [Domains](#Domains)
  * [.list([options], [cancelToken])](#Domains+list) ⇒ <code>Promise</code>
  * [.create(options, [cancelToken])](#Domains+create) ⇒ <code>Promise</code>
  * [.delete(options, [cancelToken])](#Domains+delete) ⇒ <code>Promise</code>
  * [.getEndpoints(options, [cancelToken])](#Domains+getEndpoints) ⇒ <code>Promise</code>
  * [.createEndpoint(options, [cancelToken])](#Domains+createEndpoint) ⇒ <code>Promise</code>
  * [.getEndpoint(options, [cancelToken])](#Domains+getEndpoint) ⇒ <code>Promise</code>
  * [.updateEndpoint(options, [cancelToken])](#Domains+updateEndpoint) ⇒ <code>Promise</code>
  * [.deleteEndpoint(options, [cancelToken])](#Domains+deleteEndpoint) ⇒ <code>Promise</code>

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

<a name="Domains+delete"></a>

### domains.delete(options, [cancelToken]) ⇒ <code>Promise</code>

This will delete a domain

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Done

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Domains+getEndpoints"></a>

### domains.getEndpoints(options, [cancelToken]) ⇒ <code>Promise</code>

This returns a list of all endpoints associated with a domain.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - List of endpoints

| Param          | Type                           | Description                                                                                       |
| -------------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| options        | <code>object</code>            | Options                                                                                           |
| [options.page] | <code>number</code>            | Used for pagination to indicate the page requested for querying a list of endpoints.              |
| [options.size] | <code>number</code>            | Used for pagination to indicate the size of each page requested for querying a list of endpoints. |
| [options.id]   | <code>string</code>            | id                                                                                                |
| [cancelToken]  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                |

<a name="Domains+createEndpoint"></a>

### domains.createEndpoint(options, [cancelToken]) ⇒ <code>Promise</code>

This creates an endpoint.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Id of created instance

| Param                          | Type                           | Description                                                                                                                                                                                  |
| ------------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                        | <code>object</code>            | Options                                                                                                                                                                                      |
| options.name                   | <code>string</code>            | The endpoint’s name, which SIP clients use as the address of record                                                                                                                          |
| [options.description]          | <code>string</code>            | String to describe endpoint                                                                                                                                                                  |
| [options.applicationId]        | <code>string</code>            | The id of the application associated with this endpoint. Application_id is used to determine the callback URL to be used when a client associated with the endpoint attempts to make a call. |
| [options.enabled]              | <code>boolean</code>           | When set to true, SIP clients can register as this device to receive and make calls. When set to false, registration, inbound, and outbound calling will not succeed.                        |
| [options.credentials.password] | <code>string</code>            | Password                                                                                                                                                                                     |
| [options.id]                   | <code>string</code>            | id                                                                                                                                                                                           |
| [cancelToken]                  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                                           |

<a name="Domains+getEndpoint"></a>

### domains.getEndpoint(options, [cancelToken]) ⇒ <code>Promise</code>

This returns a single endpoint.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Endpoint data

| Param                | Type                           | Description                                                                        |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options              | <code>object</code>            | Options                                                                            |
| [options.id]         | <code>string</code>            | id                                                                                 |
| [options.endpointId] | <code>string</code>            | endpointId                                                                         |
| [cancelToken]        | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Domains+updateEndpoint"></a>

### domains.updateEndpoint(options, [cancelToken]) ⇒ <code>Promise</code>

This will update an endpoint.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Done

| Param                          | Type                           | Description                                                                                                                                                                                  |
| ------------------------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options                        | <code>object</code>            | Options                                                                                                                                                                                      |
| [options.description]          | <code>string</code>            | String to describe endpoint                                                                                                                                                                  |
| [options.applicationId]        | <code>string</code>            | The id of the application associated with this endpoint. Application_id is used to determine the callback URL to be used when a client associated with the endpoint attempts to make a call. |
| [options.enabled]              | <code>boolean</code>           | When set to true, SIP clients can register as this device to receive and make calls. When set to false, registration, inbound, and outbound calling will not succeed.                        |
| [options.credentials.password] | <code>string</code>            | Password                                                                                                                                                                                     |
| [options.id]                   | <code>string</code>            | id                                                                                                                                                                                           |
| [options.endpointId]           | <code>string</code>            | endpointId                                                                                                                                                                                   |
| [cancelToken]                  | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)                                                                                                           |

<a name="Domains+deleteEndpoint"></a>

### domains.deleteEndpoint(options, [cancelToken]) ⇒ <code>Promise</code>

Remove endpoint from domain.

**Kind**: instance method of [<code>Domains</code>](#Domains)  
**Returns**: <code>Promise</code> - Done

| Param                | Type                           | Description                                                                        |
| -------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options              | <code>object</code>            | Options                                                                            |
| [options.id]         | <code>string</code>            | id                                                                                 |
| [options.endpointId] | <code>string</code>            | endpointId                                                                         |
| [cancelToken]        | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Errors"></a>

## Errors

The Errors resource lets you see information about errors that happened in your API calls and during applications callbacks.

**Kind**: global class

* [Errors](#Errors)
  * [.list([options], [cancelToken])](#Errors+list) ⇒ <code>Promise</code>
  * [.get(options, [cancelToken])](#Errors+get) ⇒ <code>Promise</code>

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

<a name="Errors+get"></a>

### errors.get(options, [cancelToken]) ⇒ <code>Promise</code>

Gets information about one error.

**Kind**: instance method of [<code>Errors</code>](#Errors)  
**Returns**: <code>Promise</code> - Error information

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="NumberInfo"></a>

## NumberInfo

This resource provides a CNAM number info.

**Kind**: global class  
<a name="NumberInfo+get"></a>

### numberInfo.get(options, [cancelToken]) ⇒ <code>Promise</code>

Gets CNAM number info.

**Kind**: instance method of [<code>NumberInfo</code>](#NumberInfo)  
**Returns**: <code>Promise</code> - Promise

| Param            | Type                           | Description                                                                        |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options          | <code>object</code>            | Options                                                                            |
| [options.number] | <code>string</code>            | number                                                                             |
| [cancelToken]    | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Messages"></a>

## Messages

The Messages resource lets you send SMS/MMS messages and view messages that were previously sent or received.

**Kind**: global class

* [Messages](#Messages)
  * [.list([options], [cancelToken])](#Messages+list) ⇒ <code>Promise</code>
  * [.send(options, [cancelToken])](#Messages+send) ⇒ <code>Promise</code>
  * [.get(options, [cancelToken])](#Messages+get) ⇒ <code>Promise</code>

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

<a name="Messages+get"></a>

### messages.get(options, [cancelToken]) ⇒ <code>Promise</code>

Gets information about a previously sent or received message

**Kind**: instance method of [<code>Messages</code>](#Messages)  
**Returns**: <code>Promise</code> - Message's data

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

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

<a name="PhoneNumbers"></a>

## PhoneNumbers

The Phone Numbers resource lets you get phone numbers for use with your programs and manage numbers you already have.

**Kind**: global class

* [PhoneNumbers](#PhoneNumbers)
  * [.list([options], [cancelToken])](#PhoneNumbers+list) ⇒ <code>Promise</code>
  * [.create(options, [cancelToken])](#PhoneNumbers+create) ⇒ <code>Promise</code>
  * [.get(options, [cancelToken])](#PhoneNumbers+get) ⇒ <code>Promise</code>
  * [.update(options, [cancelToken])](#PhoneNumbers+update) ⇒ <code>Promise</code>
  * [.remove(options, [cancelToken])](#PhoneNumbers+remove) ⇒ <code>Promise</code>

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

<a name="PhoneNumbers+get"></a>

### phoneNumbers.get(options, [cancelToken]) ⇒ <code>Promise</code>

Gets information about one of your numbers using the number's ID or E.164 number string, like "+19195551212"

**Kind**: instance method of [<code>PhoneNumbers</code>](#PhoneNumbers)  
**Returns**: <code>Promise</code> - Number information

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="PhoneNumbers+update"></a>

### phoneNumbers.update(options, [cancelToken]) ⇒ <code>Promise</code>

Makes changes to a number user has.

**Kind**: instance method of [<code>PhoneNumbers</code>](#PhoneNumbers)  
**Returns**: <code>Promise</code> - Done

| Param                    | Type                           | Description                                                                               |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------- |
| options                  | <code>object</code>            | Options                                                                                   |
| [options.name]           | <code>string</code>            | A name you choose for this number.                                                        |
| [options.applicationId]  | <code>string</code>            | The unique id of an Application you want to associate with this number.                   |
| [options.fallbackNumber] | <code>string</code>            | Number to transfer an incoming call when the callback/fallback events can’t be delivered. |
| [options.id]             | <code>string</code>            | id                                                                                        |
| [cancelToken]            | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation)        |

<a name="PhoneNumbers+remove"></a>

### phoneNumbers.remove(options, [cancelToken]) ⇒ <code>Promise</code>

Removes a number from your account so you can no longer make or receive calls, or send or receive messages with it.

**Kind**: instance method of [<code>PhoneNumbers</code>](#PhoneNumbers)  
**Returns**: <code>Promise</code> - Done

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Recordings"></a>

## Recordings

Retrieve information about call recordings.

**Kind**: global class

* [Recordings](#Recordings)
  * [.list([options], [cancelToken])](#Recordings+list) ⇒ <code>Promise</code>
  * [.get(options, [cancelToken])](#Recordings+get) ⇒ <code>Promise</code>
  * [.getTranscriptions(options, [cancelToken])](#Recordings+getTranscriptions) ⇒ <code>Promise</code>
  * [.createTranscription(options, [cancelToken])](#Recordings+createTranscription) ⇒ <code>Promise</code>
  * [.getTranscription(options, [cancelToken])](#Recordings+getTranscription) ⇒ <code>Promise</code>

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

<a name="Recordings+get"></a>

### recordings.get(options, [cancelToken]) ⇒ <code>Promise</code>

Retrieve a specific call recording information

**Kind**: instance method of [<code>Recordings</code>](#Recordings)  
**Returns**: <code>Promise</code> - Recording information

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Recordings+getTranscriptions"></a>

### recordings.getTranscriptions(options, [cancelToken]) ⇒ <code>Promise</code>

Get all the transcriptions that were made for the given recoding

**Kind**: instance method of [<code>Recordings</code>](#Recordings)  
**Returns**: <code>Promise</code> - List of transcriptions

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Recordings+createTranscription"></a>

### recordings.createTranscription(options, [cancelToken]) ⇒ <code>Promise</code>

Request the transcription process to be started for the given recording id.

**Kind**: instance method of [<code>Recordings</code>](#Recordings)  
**Returns**: <code>Promise</code> - Id of created instance

| Param         | Type                           | Description                                                                        |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options       | <code>object</code>            | Options                                                                            |
| [options.id]  | <code>string</code>            | id                                                                                 |
| [cancelToken] | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="Recordings+getTranscription"></a>

### recordings.getTranscription(options, [cancelToken]) ⇒ <code>Promise</code>

Get information about the transcription, regardless its state.

**Kind**: instance method of [<code>Recordings</code>](#Recordings)  
**Returns**: <code>Promise</code> - Done

| Param                     | Type                           | Description                                                                        |
| ------------------------- | ------------------------------ | ---------------------------------------------------------------------------------- |
| options                   | <code>object</code>            | Options                                                                            |
| [options.id]              | <code>string</code>            | id                                                                                 |
| [options.transcriptionId] | <code>string</code>            | transcriptionId                                                                    |
| [cancelToken]             | <code>axios.CancelToken</code> | Optional cancel token (read more here https://github.com/axios/axios#cancellation) |

<a name="BandwidthApi"></a>

## BandwidthApi

Bandwidth Api

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
