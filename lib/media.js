var Client = require("./client");
var fs = require("fs");
var MEDIA_PATH = "media";

function sendFile(request, file, mediaType, callback){
  var stream = null;
  request.buffer().type(mediaType || "application/octet-stream");
  if(typeof file === "string"){
    stream = fs.createReadStream(file);
  }
  else if(Buffer.isBuffer(file)){
    request.write(file);
    request.end(callback);
    return;
  }
  else if(typeof file.pipe === "function" && typeof file.read === "function" && typeof file.on === "function"){
    stream = file;
  }
  if(stream){
    request.on("response", callback);
    stream.pipe(request);
    return;
  }
  throw new Error("Invalid data to send");
}


module.exports = {
  list: function(client, query, callback){
    if(arguments.length === 1){
      callback = client;
      client = new Client();
    }
    else if(arguments.length === 2){
      callback = query;
      if(client instanceof Client){
        query = {};
      }
      else{
        query = client;
        client = new Client();
      }
    }
    client.makeRequest("get", client.concatUserPath(MEDIA_PATH), query, callback);
  },
  upload: function(client, name, data, mediaType, callback){
    if(arguments.length === 3){
      callback = data;
      data = name;
      name = client;
      client = new Client();
      mediaType = null;
    }
    else if(arguments.length === 4){
      callback = mediaType;
      if(client instanceof Client){
        mediaType = null;
      }
      else{
        mediaType = data;
        data = name;
        name = client;
        client = new Client();
      }
    }
    var request = client.createRequest("put", client.concatUserPath(MEDIA_PATH) + "/" + encodeUriComponent(name));
    sendFile(request, data, mediaType, function(err){
      if(err){
        return done(err);
      }
      getUploadedMedia(client, name, callback);
    });
  },
  download: function(client, name, destination){
    if(arguments.length <= 2){
      destination = name;
      name = client;
      client = new Client();
    }
    var request = client.createRequest("get", client.concatUserPath(MEDIA_PATH) + "/" + encodeUriComponent(name));
    if(destination){
      var stream = null;
      if(typeof destination === "string"){
        stream = fs.createWriteStream(destination);
      }
      else if(typeof destination.write === "function"){
        stream = destination;
      }
      if(stream){
        return request.pipe(stream);
      }
    }
    return request;
  },
  delete: function(client, name, callback){
    if(arguments.length === 2){
      callback = name;
      name = client;
      client = new Client();
    }
    client.makeRequest("del", client.concatUserPath(MEDIA_PATH) + "/" + encodeUriComponent(name), callback);
  }
};
