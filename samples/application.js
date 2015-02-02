"use strict";
//This is a demo of creating and removing and application

var catapult = require("..");// use require("node-bandwidth") in real projects


//Fill these options before run this demo
catapult.Client.globalOptions.userId = "user-id";
catapult.Client.globalOptions.apiToken = "t-token";
catapult.Client.globalOptions.apiSecret = "secret";


catapult.Application.create({name: "Demo Application from samples", incomingCallUrl: "http://localhost"}, function(err, app){
  if(err){
    return console.error("Error on creating an application: " + err.message);
  }
  console.log("Created application name is " + app.name);
  app.delete(function(err){
    if(err){
      return console.error("Error on removing created application: " + err.message);
    }
    console.log("The app has been removed");
  });
});

