"use strict";
//This sample calls method 'list' of user's resourses ans shows results on console


var catapult = require("..");// use require("node-bandwidth") in real projects
var async = require("async");

//Fill these options before run this demo
catapult.Client.globalOptions.userId = "user-id";
catapult.Client.globalOptions.apiToken = "t-token";
catapult.Client.globalOptions.apiSecret = "secret";

//calls 'list' of resourse and show s result or error info
function show(resourse, title, callback){
  console.log(title + "\n====================");
  catapult[resourse].list(function(err, items){
    if(err){
      console.log(err.message);
    }
    else{
      items.forEach(function(item){
        delete item.client; //avoid showing of internal data;
        console.log(item);
      });
    }
    console.log("\n");
    callback();
  });
}


async.series([
  show.bind(null, "Application", "Applications"),
  show.bind(null, "Bridge", "Bridges"),
  show.bind(null, "Call", "Calls"),
  show.bind(null, "Domain", "Domains"),
  show.bind(null, "Error", "Errors"),
  show.bind(null, "Media", "Media"),
  show.bind(null, "Message", "Messages"),
  show.bind(null, "PhoneNumber", "Numbers"),
  show.bind(null, "Recording", "Recordings")
]);
