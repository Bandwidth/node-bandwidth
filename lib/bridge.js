var Client = require("./client");
var Call = require("./call");
var BRIDGE_PATH = "bridges";

function Bridge(){
}

Bridge.get = function(client, id, callback){
  if(arguments.length === 2){
    callback = id;
    id = client;
    client = new Client();
  }
  client.makeRequest("get", client.concatUserPath(BRIDGE_PATH) + "/" +  id, function(err, item){
    if(err){
      return callback(err);
    }
    item.client = client;
    item.__proto__ = Bridge.prototype;
    callback(null, item);
  });
};

Bridge.list = function(client, callback){
  if(arguments.length === 1){
    callback = client;
    client = new Client();
  }
  client.makeRequest("get", client.concatUserPath(BRIDGE_PATH), function(err, items){
    if(err){
      return callback(err);
    }
    items = items || [];
    var result = items.map(function(item){
      item.client = client;
      item.__proto__ = Bridge.prototype;
      return item;
    });
    callback(null, result);
  });
};

Bridge.create = function(client, item, callback){
  if(arguments.length === 2){
    callback = item;
    item = client;
    client = new Client();
  }
  var request = client.createRequest("post", client.concatUserPath(BRIDGE_PATH));
  request.type("json").send(item).end(function(res){
    if(res.ok && res.headers.location){
      Client.getIdFromLocationHeader(res.headers.location, function(err, id){
        if(err){
          return callback(err);
        }
        Bridge.get(client, id, callback);
      });
    }
    else{
      client.checkResponse(res, callback);
    }
  });
};

Bridge.prototype.update = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(BRIDGE_PATH) + "/" + this.id,  data, callback);
};

Bridge.prototype.playAudio = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(BRIDGE_PATH) + "/" + this.id + "/audio",  data, callback);
};

Bridge.prototype.getCalls = function(callback){
  var client = this.client;
  client.makeRequest("get", client.concatUserPath(BRIDGE_PATH) + "/" + this.id + "/calls", function(err, items){
    if(err){
      return callback(err);
    }
    items = items || [];
    var result = items.map(function(item){
      item.client = client;
      item.__proto__ = Call.prototype;
      return item;
    });
    callback(null, result);
  });
};

module.exports = Bridge;
