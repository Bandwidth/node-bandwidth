var Client = require("./client");
var APPLICATION_PATH = "applications";

function Application(){
}

Application.get = function(client, id, callback){
  if(arguments.length === 2){
    callback = id;
    id = client;
    client = new Client();
  }
  client.makeRequest("get", client.concatUserPath(APPLICATION_PATH) + "/" +  id, function(err, item){
    if(err){
      return callback(err);
    }
    item.client = client;
    item.__proto__ = Application.prototype;
    callback(null, item);
  });
};

Application.list = function(client, query, callback){
  if(arguments.length === 1){
    callback = client;
    client = new Client();
    query = {};
  }
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
  client.makeRequest("get", client.concatUserPath(APPLICATION_PATH), query, function(err, items){
    if(err){
      return callback(err);
    }
    items = items || [];
    var result = items.map(function(item){
      item.client = client;
      item.__proto__ = Application.prototype;
      return item;
    });
    callback(null, result);
  });
};

Application.create = function(client, item, callback){
  if(arguments.length === 2){
    callback = item;
    item = client;
    client = new Client();
  }
  var request = client.createRequest("post", client.concatUserPath(APPLICATION_PATH));
  request.type("json").send(item).end(function(res){
    if(res.ok && res.headers.location){
      Client.getIdFromLocationHeader(res.headers.location, function(err, id){
        if(err){
          return callback(err);
        }
        Application.get(client, id, callback);
      });
    }
    else{
      client.checkResponse(res, callback);
    }
  });
};

Application.prototype.update = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(APPLICATION_PATH) + "/" + this.id,  data, callback);

};

Application.prototype.delete = function(callback){
  this.client.makeRequest("del", this.client.concatUserPath(APPLICATION_PATH) + "/" + this.id,  callback);
};


module.exports = Application;
