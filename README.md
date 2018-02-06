# node-bandwidth

[![npm version](https://badge.fury.io/js/node-bandwidth.svg)](https://badge.fury.io/js/node-bandwidth)
[![Build Status](https://travis-ci.org/bandwidthcom/node-bandwidth.svg?branch=master)](https://travis-ci.org/bandwidthcom/node-bandwidth)
[![dependencies](https://david-dm.org/bandwidthcom/node-bandwidth.svg)](https://david-dm.org/bandwidthcom/node-bandwidth)
[![Known Vulnerabilities](https://snyk.io/package/npm/node-bandwidth/badge.svg)](https://snyk.io/package/npm/node-bandwidth)

A Node.js client library for the [Bandwidth Application Platform](http://bandwidth.com/products/application-platform?utm_medium=social&utm_source=github&utm_campaign=dtolb&utm_content=_)

## Installing the SDK

`node-bandwidth` is available on NPM:

```bash
    npm install --save node-bandwidth@pre
```

Also you can use it directly in tag `script`

```html
    <!-- dependencies -->
    <script src="https://unpkg.com/axios@0.17.1/dist/axios.min.js"></script>
    <script src="https://unpkg.com/joi-browser@13.0.1/dist/joi-browser.min.js"></script>

    <!-- node-bandwidth browser script -->
    <script src="https://unpkg.com/node-bandwidth@pre/dist/node-bandwidth.min.js"></script>
```

## Supported Versions

`node-bandwidth` should work on all versions of node newer than `0.10.*`. However, due to the rapid development in the Node and npm environment, we can only provide _support_ on [LTS versions of Node](https://github.com/nodejs/LTS)

| Version | Support Level |
| :------ | :------------ |
| 9.\*    | Supported     |

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

Download media file

```javascript
await api.Media.upload({mediaName: 'file.jpg', content: bufferOrStream, contentType: 'image/jpeg'});
```

## Providing feedback

For current discussions on 3.0-pre please see the [3.0-pre issues section on GitHub](https://github.com/bandwidthcom/node-bandwidth/labels/3.0-pre). To start a new topic on 3.0-pre, please open an issue and use the `3.0-pre` tag. Your feedback is greatly appreciated!
