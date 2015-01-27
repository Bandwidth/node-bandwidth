# node-bandwidth

[![Build](https://travis-ci.org/bandwidthcom/node-bandwidth.png)](https://travis-ci.org/bandwidthcom/node-bandwidth)

Node Client library for Catapult API

### Install

Run

```
npm install node-bandwidth
```

### Usage

```
var catapult = require("node-bandwidth");

//Using client directly
var client = new catapult.Client("userId", "apiToken", "apiSecret");
catapult.Call.list(client, {page: 1}, function(err, calls){...});

//Or you can use default client instance.
//You should set up its global options before using of api functions.

//Do that only once
catapult.Client.globalOptions.apiToken = "token";
catapult.Client.globalOptions.apiSecret = "secret";
catapult.Client.globalOptions.userId = "userId";

//Now you can call any functions without first arg 'client'

catapult.Call.list({page: 1}, function(err, calls){
  //Default client will be used to do this calls
});

```

Read [Catapult Api documentation](https://catapult.inetwork.com/docs/api-docs/) for more details


