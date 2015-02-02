"use strict";
var path = require("path");
//This is a demo of uploading file and sending of MMS


var catapult = require("..");// use require("node-bandwidth") in real projects

//Fill these options before run this demo
catapult.Client.globalOptions.userId = "u-userid";
catapult.Client.globalOptions.apiToken = "t-token";
catapult.Client.globalOptions.apiSecret = "secret";
var from = "+1-number"; //your number on catapult
var to = "+1-number"; //any number which can receive a message

//This function will upload local file test.png to the server if need and return url on it
function uploadFileIfNeed(callback){
  catapult.Media.list(function(err, files){
    if(err){
      return callback(err);
    }
    var file = files.filter(function(f){ return f.mediaName === "test.png"; })[0];
    if(file){
      return callback(null, file.content);
    }
    catapult.Media.upload("test.png", path.join(__dirname, "test.png"), "image/png", function(err){
      if(err){
        return callback(err);
      }
      catapult.Media.list(function(err, files){
        if(err){
          return callback(err);
        }
        file = files.filter(function(f){ return f.mediaName === "test.png"; })[0];
        callback(null, file.content);
      });
    });
  });
}


//Sending a MMS
uploadFileIfNeed(function(err, url){
  if(err){
    return console.error(err.message);
  }
  catapult.Message.create({from: from, to: to, text: "Hello there", media: [url]}, function(err, message){
    if(err){
      return console.error(err.message);
    }
    console.log("Message id is " + message.id);
  });
});
