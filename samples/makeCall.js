"use strict";
//This is a demo of making of call


var catapult = require("..");// use require("node-bandwidth") in real projects

//Fill these options before run this demo
catapult.Client.globalOptions.userId = "user-id";
catapult.Client.globalOptions.apiToken = "t-token";
catapult.Client.globalOptions.apiSecret = "secret";
var from = "+1-number"; //your number on catapult
var to = "+1-number"; //any number which can receive incoming call

//Making a call
catapult.Call.create({from: from, to: to}, function(err, call){
  if(err){
    return console.error(err.message);
  }
  console.log("Call id is " + call.id);
});
