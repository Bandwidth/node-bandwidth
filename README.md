# node-bandwidth

[![npm version](https://badge.fury.io/js/node-bandwidth.svg)](https://badge.fury.io/js/node-bandwidth)
[![Build Status](https://travis-ci.org/bandwidthcom/node-bandwidth.svg?branch=master)](https://travis-ci.org/bandwidthcom/node-bandwidth)
[![dependencies](https://david-dm.org/bandwidthcom/node-bandwidth.svg)](https://david-dm.org/bandwidthcom/node-bandwidth)
[![Known Vulnerabilities](https://snyk.io/package/npm/node-bandwidth/badge.svg)](https://snyk.io/package/npm/node-bandwidth)

A Node.js client library for the [Bandwidth Application Platform](http://bandwidth.com/products/application-platform?utm_medium=social&utm_source=github&utm_campaign=dtolb&utm_content=_)

## Full API Reference

The Full API Reference is available either as an interactive site or as a single Markdown file:

* [Site](http://dev.bandwidth.com/node-bandwidth/index.html).
* [Single MD file](docs/api.md)

## Installing the SDK

`node-bandwidth` is available on NPM:

```bash
    npm install --save node-bandwidth@pre
	# or
	yarn add node-bandwidth@pre
```

Also you can use it directly in tag `script`

```html
    <!-- dependencies -->
    <script src="https://unpkg.com/axios@0.17.1/dist/axios.min.js"></script>
    <script src="https://unpkg.com/joi-browser@13.0.1/dist/joi-browser.min.js"></script>

    <!-- node-bandwidth browser script -->
    <script src="https://unpkg.com/node-bandwidth@pre/dist/node-bandwidth.min.js"></script>
```

You can use any favorite build tool like `webpack`, `browserify`, `jspm`, etc with this library.

If you use AMD module loader you can use script from `dist/node-bandwidth.amd.js` (or load it as https://unpkg.com/node-bandwidth@pre/dist/node-bandwidth.amd.js).

If you use CommonJS module loader you can use script from `dist/node-bandwidth.common.js/index.js` (or load it as https://unpkg.com/node-bandwidth@pre/dist/node-bandwidth.common.js/index.js).

For SystemJS module loader you can use script from `dist/node-bandwidth.system.js` (or load it as https://unpkg.com/node-bandwidth@pre/dist/node-bandwidth.system.js).

## Initialization

All interaction with the API is done through a `api` Object. The api factory function takes an Object containing configuration options. The following options are supported:

| Field name  | Description            | Default value                       | Required |
| :---------- | :--------------------- | :---------------------------------- | :------- |
| `userId`    | Your Bandwidth user ID | `undefined`                         | Yes      |
| `apiToken`  | Your API token         | `undefined`                         | Yes      |
| `apiSecret` | Your API secret        | `undefined`                         | Yes      |
| `baseUrl`   | The Bandwidth API URL  | `https://api.catapult.inetwork.com` | No       |

To initialize the api object, provide your credentials which can be found on your account page in [the portal](https://catapult.inetwork.com/pages/catapult.jsf).

```javascript
import getBandwidthApi from 'node-bandwidth';

const api = getBandwidthApi({
	userId: 'YOUR_USER_ID', // <-- note, this is not the same as the username you used to login to the portal
	apiToken: 'YOUR_API_TOKEN',
	apiSecret: 'YOUR_API_SECRET'
});
```

## Making API calls

Created api object contains next properties (subsystems):
`Account`, `Applications`, `AvailableNumbers`, `Bridges`, `Calls`, `Conferences`, `Domains`, `Errors`, `Media`, `Media`, `Messages`, `MessagesV2`, `NumberInfo`, `PhoneNumbers`, `Recordings`.

Each subsystem contains methods which make a simple http request to Bandwidth API server. Each such method returns `Promise` with results.

For example next code

```javascript
const callId = await api.Calls.create({from: '+12345678900', to: '+12345678901'});
```

will make a POST-request to `/v1/users/{userId}/calls`. `callId` will be extracted from response header `Location`.

Next code will return account balance data

```javascript
const call = await api.Calls.get({id: 'callId'}); // GET /users/{userId}/calls/{id}
```

### Lazy lists

Some Bandwidth API calls support pagination. Using query parameters `page` and `size` user can manipulate which portion and amount of data to load.

This library wraps such calls to async iterators to support loading addiotional data on demand. For example next code

```javascript
for await (const message of await api.Messages.list()) {
    console.log(`${message.from} -> ${message.to}: ${message.text}`);
}
```

will make addional http requests to load additional messages on demand. As result all user's messages will be shown.

_Warning:_ to use `for await` feature you should:

* for Node 9.X: run `node` with flag `--harmony`
* for Node 10.X +: do nothing
* other: use transpilers like `babel`, `typescript`, etc

But if you add parameter `page` to such methods only simple http request will be executed

```javascript
const messages =  await api.Messages.list({page: 0}); // only first 25 messages will be returned
```

### Cancelation of request

Each api method supports optional `cancelToken` as last parameter. Look at [here](https://github.com/axios/axios#cancellation) for more details.

```javascript
import {CancelToken} from 'axios';

const cancelTokenSource = CancelToken.source();

setTimeout(() => {
    cancelTokenSource.cancel('Timeout'); // cancel a request if it is executed more than 5 second
}, 5000);

const numbers =  await api.AvailableNumbers.searchAndOrderLocalNumbers({areaCode: '910', quantity: 100}, cancelTokenSource.token);
```

### Parameters validation

Before make http request each api method validates passed data to avoid ignoring of required parameters, invalid parameters types, etc.

```javascript
await api.Message.create({to: '+12345678901', text: 'Hello'}); // will throw validation error: field 'from' is required

await api.Message.create({from: '+12345678900', to: null, text: 'Hello'}); // will throw validation error: field 'to' is required

await api.Message.create({from: '+12345678900', to: '+12345687901', text: 'Hello', test: true}); // will throw validation error: extra field 'test'

await api.Message.create({from: 123456, to: '+12345687901', text: 'Hello'}); // will throw validation error: field 'from' should be string
```

### Helpers

There are also some additional methods for `Calls`, `Conferences`, `Bridges` for more comfortable coding.

Calls

```javascript
// next methods are wrappers for update()
	answer(id[, cancelToken]);
	terminate(id[, cancelToken]);
	hangup(id[, cancelToken]);
	transfer(id, transferTo[, options, cancelToken]);

// next method is wrapper for updateGather()
	stopGather(id, gatherId[, cancelToken]);

// next methods are wrappers for playAudio()
	speakSententence(id[, options, cancelToken]);
	playFileUrl(id, fileUrl[, options, cancelToken]);
	stopPlayFileUrl(id[, cancelToken]);
```

Bridges

```javascript
// next methods are wrappers for playAudio()
	speakSententence(id[, options, cancelToken]);
	playFileUrl(id, fileUrl[, options, cancelToken]);
	stopPlayFileUrl(id[, cancelToken]);
```

Conferences

```javascript
// next methods are wrappers for update()
	stop(id[, cancelToken]);
	mute(id, mute = true[, cancelToken]);
	hold(id, hold = true[, cancelToken]);

// next methods are wrappers for updateMember()
	deleteMember(id, memberId[, cancelToken]);
	muteMember(id, memberId, mute = true[, cancelToken]);
	holdMember(id, memberId, hold = true[, cancelToken]);

// next methods are wrappers for playAudio()
	speakSententence(id[, options, cancelToken]);
	playFileUrl(id, fileUrl[, options, cancelToken]);
	stopPlayFileUrl(id[, cancelToken]);


// next methods are wrappers for playAudioToMember()
	speakSententenceToMember(id, memberId[, options, cancelToken]);
	playFileUrlToMember(id, memberId, fileUrl[, options, cancelToken]);
	stopPlayFileUrlToMember(id, memberId[, cancelToken]);
```

Example

```javascript
await api.Calls.hangup('callId'); // it will call api.Calls.update({id: 'callId', state: 'completed'})

await api.Conferences.mute('conferenceId', false); // it will call api.Conferences.update({id: 'conferenceId', mute: false})
```

### Bandwidth XML

The library contains some functions to build Bandwidth XML more easy.

```javascript
import {bandwidthXml} from 'node-bandwidth';

const xml = bandwidthXml.response(bandwidthXml.playAudio('http://url/to/media/file')),
// xml contains now <?xml version="1.0" encoding="UTF-8"?><Response><PlayAudio>http://url/to/media/file</PlayAudio></Response>
```

## Examples

Making a call

```javascript
const callId = await api.Calls.create({from: '+12345678900', to: '+12345678901'});
```

Looking for available local phone numbers

```javascript
const numbers = await api.AvailableNumbers.searchLocalNumbers({areaCode: '910'});
```

Allocating of phone number

```javascript
const numberId = await api.PhoneNumbers.create({number: '+1234567890', applicationId: 'appId'});
```

Sending a SMS

```javascript
const messageId = await api.Message.create({from: '+12345678900', to: '+12345678901', text: 'message'});
```

Sending a MMS

```javascript
const messageId = await api.Message.create({from: '+12345678900', to: '+12345678901', text: 'message', media: ['http://url/to/media/file']});
```

Sending some SMSes

```javascript
const results = await api.Message.create([
    {from: '+12345678900', to: '+12345678901', text: 'message1'},
    {from: '+12345678900', to: '+12345678902', text: 'message2'},
    {from: '+12345678900', to: '+12345678903', text: 'message3'}
]);

// results is list which items contain ids of created messages (property 'id')
```

Sending a SMS (via Messaging API v2)

```javascript
const result = await api.MessagesV2.create({from: '+12345678900', to: '+12345678901', text: 'message', applicationId: 'dashboardAppId'});
// 'applicationId' is NOT id of application which you can find via api.Applications.list(). You should get this application id via Dasboard API calls. Look at http://dev.bandwidth.com/v2-messaging/applications/about.html for more details.
```

Download media file

```javascript
const result = await api.Media.download({mediaName: 'file.jpg'});
// result.content will be contain buffer with file content
// result.contentType will be contain MIME-type of content
```

```javascript
const result = await api.Media.download({mediaName: 'file.jpg' responseType: 'stream'});
// result.content will be contain file content as stream (node js only)
```

Upload media file

```javascript
await api.Media.upload({mediaName: 'file.jpg', content: bufferOrStream, contentType: 'image/jpeg'});
```

Update a call

```javascript
await api.Call.update({id: 'callId', state: 'active'});
```

## Providing feedback

For current discussions on 3.0-pre please see the [3.0-pre issues section on GitHub](https://github.com/bandwidthcom/node-bandwidth/labels/3.0-pre). To start a new topic on 3.0-pre, please open an issue and use the `3.0-pre` tag. Your feedback is greatly appreciated!
