"use strict";
var Client = require("./client");
var MESSAGE_PATH = "messages";

function Message(){
}

/** Get information about a message that was sent or received */
Message.get = function(client, id, callback){
  if(arguments.length === 2){
    callback = id;
    id = client;
    client = new Client();
  }
  client.makeRequest("get", client.concatUserPath(MESSAGE_PATH) + "/" +  id, function(err, item){
    if(err){
      return callback(err);
    }
    item.client = client;
    item.__proto__ = Message.prototype;
    callback(null, item);
  });
};

/** Get a list of previous messages that were sent or received */
Message.list = function(client, query, callback){
  if(arguments.length === 2){
    callback = query;
    if(client instanceof Client){
      query = {};
    }
    else{
      query = client;
      client = new Client();
    }
  }
  else if(arguments.length === 1){
    callback = client;
    client = new Client();
  }
  client.makeRequest("get", client.concatUserPath(MESSAGE_PATH), query, function(err, items){
    if(err){
      return callback(err);
    }
    items = items || [];
    var result = items.map(function(item){
      item.client = client;
      item.__proto__ = Message.prototype;
      return item;
    });
    callback(null, result);
  });
};

/** Send text messages */
Message.create = function(client, item, callback){
  if(arguments.length === 2){
    callback = item;
    item = client;
    client = new Client();
  }
  var request = client.createRequest("post", client.concatUserPath(MESSAGE_PATH));
  request.type("json").send(item).end(function(res){
    if(res.ok && res.headers.location){
      Client.getIdFromLocationHeader(res.headers.location, function(err, id){
        if(err){
          return callback(err);
        }
        Message.get(client, id, callback);
      });
    }
    else{
      client.checkResponse(res, callback);
    }
  });
};

module.exports = Message;
