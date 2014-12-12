"use strict";
var Client = require("./client");
var NUMBER_INFO_PATH = "phoneNumbers/numberInfo";

module.exports = {
  /** Get the CNAM info of a number  */
  get: function(client, number, callback){
    if(arguments.length === 2){
      callback = number;
      number = client;
      client = new Client();
    }
    client.makeRequest("get", NUMBER_INFO_PATH + "/" + encodeURIComponent(number), callback);
  }
};


