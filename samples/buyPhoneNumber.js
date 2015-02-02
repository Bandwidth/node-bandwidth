"use strict";

//This is a demo of searching and allocating a phone number

var catapult = require("..");// use require("node-bandwidth") in real projects


//Fill these options before run this demo
catapult.Client.globalOptions.userId = "user-id";
catapult.Client.globalOptions.apiToken = "t-token";
catapult.Client.globalOptions.apiSecret = "secret";


catapult.AvailableNumber.searchLocal({city: "Cary", state: "NC", quantity: 3}, function(err, numbers){
  if(err){
    return console.error(err.message);
  }
  console.log("Found numbers: %s", numbers.map(function(n){ return n.number;}).join(", "));
  catapult.PhoneNumber.create({number: numbers[0].number}, function(err, number){
    if(err){
      return console.error(err.message);
    }
    console.log("Now you are owner of number %s (id %s)", number.number, number.id);
  });
});
