var Client = require("./client");
var CALL_PATH = "calls";

function Call(){
}

Call.get = function(client, id, callback){
  if(arguments.length === 2){
    callback = id;
    id = client;
    client = new Client();
  }
  client.makeRequest("get", client.concatUserPath(CALL_PATH) + "/" +  id, function(err, item){
    if(err){
      return callback(err);
    }
    item.client = client;
    item.__proto__ = Call.prototype;
    callback(null, item);
  });
};

Call.list = function(client, query, callback){
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
    query = {};
  }
  client.makeRequest("get", client.concatUserPath(CALL_PATH), query, function(err, items){
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

Call.create = function(client, item, callback){
  if(arguments.length === 2){
    callback = item;
    item = client;
    client = new Client();
  }
  var request = client.createRequest("post", client.concatUserPath(CALL_PATH));
  request.type("json").send(item).end(function(res){
    if(res.ok && res.headers.location){
      Client.getIdFromLocationHeader(res.headers.location, function(err, id){
        if(err){
          return callback(err);
        }
        Call.get(client, id, callback);
      });
    }
    else{
      client.checkResponse(res, callback);
    }
  });
};

Call.prototype.update = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CALL_PATH) + "/" + this.id,  data, callback);
};

Call.prototype.playAudio = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CALL_PATH) + "/" + this.id + "/audio",  data, callback);
};

Call.prototype.speakSentence = function(sentence, tag, callback){
  if(arguments.length === 2){
    callback = tag;
    tag = null;
  }
  this.playAudio({
    gender: "female",
    locale: "en_US",
    voice: "kate",
    sentence: sentence,
    tag: tag
  }, callback);
};

Call.prototype.playRecording = function(recordingUrl, callback){
  this.playAudio({
    fileUrl: recordingUrl,
  }, callback);
};

Call.prototype.setDtmf = function(dtmf, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CALL_PATH) + "/" + this.id + "/dtmf",  {dtmfOut: dtmf}, callback);
};


Call.prototype.createGather = function(data, callback){
  if(typeof data === "string"){
    data = {
      tag: this.id,
      maxDigits: 1,
      prompt: {
        locale: "en_US",
        gender: "female",
        sentence: data,
        voice: "kate",
        bargeable: true
      }
    };
  }
  var self = this;
  var request = self.client.createRequest("post", self.client.concatUserPath(CALL_PATH) + "/" + this.id + "/gather");
  request.type("json").send(data).end(function(res){
    if(res.ok && res.headers.location){
      Client.getIdFromLocationHeader(res.headers.location, function(err, id){
        if(err){
          return callback(err);
        }
        self.getGather(id, callback);
      });
    }
    else{
      self.client.checkResponse(res, callback);
    }
  });
};

Call.prototype.updateGather = function(gatherId, data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CALL_PATH + "/" + this.id + "/gather/" + gatherId), data, callback);
};

Call.prototype.getGather = function(gatherId, callback){
  this.client.makeRequest("get", this.client.concatUserPath(CALL_PATH + "/" + this.id + "/gather/" + gatherId), callback);
};

Call.prototype.getEvent = function(eventId, callback){
  this.client.makeRequest("get", this.client.concatUserPath(CALL_PATH + "/" + this.id + "/events/" + eventId), callback);
};

Call.prototype.getEvents = function(callback){
  this.client.makeRequest("get", this.client.concatUserPath(CALL_PATH + "/" + this.id + "/events"), callback);
};

Call.prototype.getRecordings = function(callback){
  this.client.makeRequest("get", this.client.concatUserPath(CALL_PATH + "/" + this.id + "/recordings"), callback);
};

Call.prototype.hangUp = function(callback){
  var self = this;
  self.update({state: "completed"}, function(err){
    if(err){
      return callback(err);
    }
    self.reload(callback);
  });
};

Call.prototype.answerOnIncoming = function(callback){
  var self = this;
  self.update({state: "active"}, function(err){
    if(err){
      return callback(err);
    }
    self.reload(callback);
  });
};

Call.prototype.rejectIncoming = function(callback){
  var self = this;
  self.update({state: "rejected"}, function(err){
    if(err){
      return callback(err);
    }
    self.reload(callback);
  });
};

Call.prototype.recordingOn = function(callback){
  var self = this;
  self.update({recordingEnabled: true}, function(err){
    if(err){
      return callback(err);
    }
    self.reload(callback);
  });
};

Call.prototype.recordingOff = function(callback){
  var self = this;
  self.update({recordingEnabled: false}, function(err){
    if(err){
      return callback(err);
    }
    self.reload(callback);
  });
};

Call.prototype.reload = function(callback){
  var self = this;
  self.client.makeRequest("get", self.client.concatUserPath(CALL_PATH) + "/" +  self.id, function(err, item){
    if(err){
      return callback(err);
    }
    var k;
    for(k in item){
      self[k] = item[k];
    }
    callback();
  });
};

module.exports = Call;
