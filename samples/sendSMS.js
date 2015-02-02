"use strict";
//This is a demo of sending of SMS


var catapult = require("..");// use require("node-bandwidth") in real projects

//Fill these options before run this demo
catapult.Client.globalOptions.userId = "user-id";
catapult.Client.globalOptions.apiToken = "t-token";
catapult.Client.globalOptions.apiSecret = "secret";
var from = "+1-number"; //your number on catapult
var to = "+1-number"; //any number which can receive a message

//Sending a SMS
catapult.Message.create({from: from, to: to, text: "Hello there"}, function(err, message){
  if(err){
    return console.error(err.message);
  }
  console.log("Message id is " + message.id);
});
