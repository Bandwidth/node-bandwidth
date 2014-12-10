var Client = require("./client");
var ConferenceMember = require("./conferenceMember");
var CONFERENCE_PATH = "conferences";

function Conference(){
}

Conference.get = function(client, id, callback){
  if(arguments.length === 2){
    callback = id;
    id = client;
    client = new Client();
  }
  client.makeRequest("get", client.concatUserPath(CONFERENCE_PATH) + "/" +  id, function(err, item){
    if(err){
      return callback(err);
    }
    item.client = client;
    item.__proto__ = Conference.prototype;
    callback(null, item);
  });
};

Conference.create = function(client, item, callback){
  if(arguments.length === 2){
    callback = item;
    item = client;
    client = new Client();
  }
  var request = client.createRequest("post", client.concatUserPath(CONFERENCE_PATH));
  request.type("json").send(item).end(function(res){
    if(res.ok && res.headers.location){
      Client.getIdFromLocationHeader(res.headers.location, function(err, id){
        if(err){
          return callback(err);
        }
        Conference.get(client, id, callback);
      });
    }
    else{
      client.checkResponse(res, callback);
    }
  });
};

Conference.prototype.update = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CONFERENCE_PATH) + "/" + this.id,  data, callback);
};

Conference.prototype.complete = function(callback){
  this.update({state: "completed"}, callback);
};

Conference.prototype.mute = function(callback){
  this.update({mute: true}, callback);
};

Conference.prototype.getMembers = function(callback){
  var client = this.client;
  var id = this.id;
  client.makeRequest("get", client.concatUserPath(CONFERENCE_PATH) + "/" + id + "/members", function(err, items){
    if(err){
      return callback(err);
    }
    items = items || [];
    var result = items.map(function(item){
      item.client = client;
      item.__proto__ = ConferenceMember.prototype;
      item.conferenceId = id;
      return item;
    });
    callback(null, result);
  });
};

Conference.prototype.getMember = function(memberId, callback){
  var client = this.client;
  var id = this.id;
  client.makeRequest("get", client.concatUserPath(CONFERENCE_PATH) + "/" + id + "/members/" + memberId, function(err, item){
    if(err){
      return callback(err);
    }
    item.client = client;
    item.__proto__ = ConferenceMember.prototype;
    item.conferenceId = id;
    callback(null, item);
  });
};

Conference.prototype.createMember = function(item, callback){
  var self = this;
  var request = self.client.createRequest("post", self.client.concatUserPath(CONFERENCE_PATH) + "/" + self.id + "/members");
  request.type("json").send(item).end(function(res){
    if(res.ok && res.headers.location){
      Client.getIdFromLocationHeader(res.headers.location, function(err, id){
        if(err){
          return callback(err);
        }
        self.getMember(id, callback);
      });
    }
    else{
      self.client.checkResponse(res, callback);
    }
  });
};

Conference.prototype.playAudio = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CONFERENCE_PATH) + "/" + this.id + "/audio", data, callback);
};

module.exports = Conference;
