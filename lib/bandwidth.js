var http          = require('https'),
  fs              = require('fs'),
  querystring     = require('querystring'),
  util            = require('util'),
  AvailableNumber = require('./availableNumber'),
  PhoneNumber     = require('./phoneNumber')
  

var defaultHost          = "api.catapult.inetwork.com"
var messagesPath         = "messages"
var phoneNumbersPath     = "phoneNumbers"
var availableNumbersPath = "availableNumbers"
var callsPath            = "calls"
var applicationsPath     = "applications"
var portInAvailablePath  = "portInAvailable"
var portInPath           = "portIns"
var callAudioPath        = "audio"


/*
*  Bandwidth Client
*
* 
*/
function Client(host, userId, apiToken, secret) {
  if (!(this instanceof Client)) {
    return new Client(host, userId, apiToken, host);
  }
  this.userId = userId;
  this.apiToken = apiToken;
  this.secret = secret;
  this.host = host || defaultHost;
  this.baseUrl = "/v1/"
  this.baseUserUrl = this.baseUrl + "users/" + this.userId + "/";
  console.log("Creating Catapult client")
}

module.exports = Client;


Client.prototype.sendCall = function (call, callback){
  if(call){
    this.post(this.concatUserUrl(callsPath), call, callback);
  }else {
    callback({message:"Call object was null"})
  }
}

Client.prototype.transferCall = function(callTransfer, callback){
  var callId = callTransfer.call.id
  delete callTransfer.call
  this.post(this.concatUserUrl(callsPath) + "/" + callId, callTransfer, callback)
}

Client.prototype.getCall = function(callId, callback){
  this.get(this.concatUserUrl(callsPath), callId, null, function(error, response){
    if(error){
      callback(error, null)
    }else {
      var call = JSON.parse(response.data);
      callback(null,call)
    }
  })
}

Client.prototype.playCallAudio = function(callAudio, callback)
{
  var callId = callAudio.callId;
  delete callAudio.callId;
  this.post(this.concatUserUrl(callsPath) + "/" + callId + "/" + callAudioPath, callAudio, function(error, response){
    if(error){
      callback(error, null)
    }else {
      callback(null,response)
    }
  })
}


/*
*  Messages methods
*/
Client.prototype.sendMessage = function(message, callback){
  this.post(this.concatUserUrl(messagesPath), message, callback)
}

Client.prototype.getMessage = function(messageId, callback){
  this.get(this.concatUserUrl(messagesPath), messageId, null, function(error, response)
  {
    if(error){
      callback(error, null)
    }else {
      var message = JSON.parse(response.data);
      callback(null,message)
    }
  })
}

Client.prototype.getMessages = function(callback){
  this.get(this.concatUserUrl(messagesPath), null, null, function(error, response){
    if(error){
      callback(error, null);
    }else {
      var messages = JSON.parse(response.data)
      callback(null, messages)
    }
  })
}

/*
*  Available Numbers
*/
Client.prototype.getAvailableNumbers = function(parameters, callback)
{
  var path = availableNumbersPath + "/" + parameters.numberType;
  delete parameters.numberType;
  this.get(this.concatBaseUrl(path), null, parameters, function(error, response)
  {
    if(error){
      callback(error, null)
    }
    else{
      var numbers = JSON.parse(response.data);
      callback(null, numbers)
    }
  });
}

/*
* Phone Number Methods
* 
*/

Client.prototype.acquirePhoneNumber = function(phoneNumber, callback)
{
  this.post(this.concatUserUrl(phoneNumbersPath), phoneNumber, callback);
}

Client.prototype.getPhoneNumber = function(numberId, callback){
  this.get(this.concatUserUrl(phoneNumbersPath), numberId, null, function(error, response)
  {
    if(error){
      callback(error, null)
    }else {
      var number = JSON.parse(response.data);
      callback(null,number)
    }
  })
}

Client.prototype.getPhoneNumbers = function(callback){
  this.get(this.concatUserUrl(phoneNumbersPath), null, null, function(error, response){
    if(error){
      callback(error, null);
    }else {
      var numbers = JSON.parse(response.data)
      callback(null, numbers)
    }
  })
}

Client.prototype.deletePhoneNumber = function(numberId, callback){
  this.delete(this.concatUserUrl(phoneNumbersPath) + "/" + numberId, callback);
}


/*
* Application Methods
*/
Client.prototype.getApplications = function(callback){
  this.get(this.concatUserUrl(applicationsPath), null, null, function(error,response)
  {
    if(error){
      callback(error, null);
    }else {
      var applications = JSON.parse(response.data)
      callback(null, applications)
    }
    
  })
}

/*
* LNP Available Methods
* 
*/

Client.prototype.checkPortInAvailability = function(availabilityCheck, callback){
  var numberToCheck = {number:availabilityCheck.number}
  this.get(this.concatUserUrl(portInAvailablePath),null,numberToCheck, function(error, response){
    if(error){
      callback(error, null)
    }else {
      var availabilityResponses = JSON.parse(response.data)
      var response = availabilityResponses.length > 0 ? availabilityResponses[0] : null
      callback(null, response)
    }
  })
}

Client.prototype.portIn = function (portInData, callback){
  if(portInData){
    this.post( this.concatUserUrl(portInPath), portInData, callback )
  } else {
    callback( {message:"PortInData object is null"} )
  }
}

Client.prototype.uploadLOA = function (portInId, filePath, callback){
  if(portInId){
    this.putFile( this.concatUserUrl(portInPath) + "/" + portInId + "/loas/MyLetter.pdf", filePath, callback )
  } else {
    callback( {message:"portInId is null"} )
  }
}

Client.prototype.cancelPortIn = function (portInId, callback){
  if(portInId){
    this.post( this.concatUserUrl(portInPath) + "/" + portInId, {state: 'cancelled'}, callback )
  } else {
    callback( {message:"portInId is null"} )
  }
}

Client.prototype.getPortInState = function(portInId, callback){
  if(portInId){
    this.get(this.concatUserUrl(portInPath) + "/" + portInId,null,null, function(error, response){
      if(error){
        callback(error, null)
      }else {
        var resData = JSON.parse(response.data)
        var err = resData.errors && resData.errors.length > 0 ? resData.errors[0] : null
        callback(err, resData)
      }
    })
  } else {
    callback({message:"portInId is null"})
  }
}


/* 
* Utility Methods
*
*/
Client.prototype.concatBaseUrl = function(path){
  return this.baseUrl + path;
}

Client.prototype.concatUserUrl = function(path){
  return this.baseUserUrl + path;
}

Client.prototype.get = function (path,id, queryParameters, callback){
  var auth = "Basic " + new Buffer(this.apiToken + ":" + this.secret).toString("base64");
  var headers = {'Content-Type':'application/json', 'Authorization':auth}

  var queryParams = querystring.stringify(queryParameters) || '';
  
  var urlPath = path;
  if(id){
    urlPath = urlPath + "/" + id
  }
  
  urlPath += "?" + queryParams;

  var response = new Object();
  var httpOptions = {
    host : this.host,
    port: 443,
    path: urlPath,
    method: "GET",
    headers: headers
  };

  var req = http.request(httpOptions, function(res){
    response.data = '';
    response.statusCode = res.statusCode;
    res.on('data', function(chunk){
      response.data += chunk
     })

    res.on('end', function(){

      if( [200, 201, 202].indexOf(response.statusCode) < 0 ) {
        callback({statusCode:response.statusCode, message:"There was a problem with your request: " + (res.body || "")})
      } else {

        var responseObj = JSON.parse(response.data)
        // Check to see if the API returned us anything helpful for error handling
        if(responseObj.message){
          callback(responseObj, null)
        }else {
          callback(null, response);
        }

      }
    })
    
  })

  req.on('error', function(e) {
    callback(e)
  });
  
  req.end();

}


Client.prototype.post = function (path, data, callback)
{
  var callback = callback || function(){}
  var content = JSON.stringify(data);
  console.log("data json " + content + " for path: " + path);
  var contentLength = content.length || 0;
  var auth = "Basic " + new Buffer(this.apiToken + ":" + this.secret).toString("base64");
  var headers = {'Content-Type':'application/json', 'Content-Length':contentLength, 'Authorization':auth}
  
  
  
  var response = new Object();
  var httpOptions = {
    host : this.host,
    port: 443,
    path: path,
    method: "POST",
    headers: headers
  };

  var req = http.request(httpOptions, function(res){
    response.statusCode = res.statusCode
    console.log("Status code: " + response.statusCode)

    res.on('data', function(chunk){
      response.data = chunk
    })

    res.on('end', function(){

      if( [200, 201, 202].indexOf(response.statusCode) < 0 ) {
        callback({statusCode:response.statusCode, message:"There was a problem with your request: " + (response.data || "")})
      } else {
        
        if(res.headers.location) {
          response.entityId = res.headers.location.substr(res.headers.location.lastIndexOf('/')+1) || null;
        }

        callback(null, response)
      }

    })

  })

  req.on('error', function(e) {
    callback(e)
  })

  if(contentLength > 0) {
    req.write(content);
  }

  req.end();
  
}

Client.prototype.delete = function (path, callback)
{
  var callback = callback || function(){}
  console.log("Delete Path: " + path)
  var auth = "Basic " + new Buffer(this.apiToken + ":" + this.secret).toString("base64");
  var headers = {'Content-Type':'application/json', 'Authorization':auth}
  
  
  
  var response = new Object();
  var httpOptions = {
    host : this.host,
    port: 443,
    path: path,
    method: "DELETE",
    headers: headers
  };

  var req = http.request(httpOptions, function(res){
    response.statusCode = res.statusCode;
    callback(null,response)
    
  });
  req.on('error', function(e) {
    callback(e)
  });

  req.end();
  
}

Client.prototype.putFile = function (path, filePath, callback)
{
  var callback = callback || function(){}
  console.log("Put Path: " + path)
  var auth = "Basic " + new Buffer(this.apiToken + ":" + this.secret).toString("base64");
  var headers = {
    'Content-Type':'application/pdf', 
    'Authorization':auth,
    'Content-Length': fs.statSync(filePath).size
  }
  
  
  
  var response = new Object();
  var httpOptions = {
    host : this.host,
    port: 443,
    path: path,
    method: "PUT",
    headers: headers
  };

  var req = http.request(httpOptions, function(res){
    response.statusCode = res.statusCode;
    console.log("Status code: " + response.statusCode)

    res.on('data', function(chunk){
      response.data = chunk
    })

    res.on('end', function(){
      
      if( [200, 201, 202].indexOf(response.statusCode) < 0 ) {
        callback({statusCode:response.statusCode, message:"There was a problem with your request: " + (response.data || "")})
      } else {
        callback(null, response)
      }

    })
  });

  fs.createReadStream(filePath, { bufferSize: 4 * 1024 })
    .on('end', function() {
      // File was sent
    })
    // set "end" to false in the options so .end() isn't called on the request
    .pipe(req, { end: true })

  req.on('error', function(e) {
    callback(e)
  });

  req.end();
  
}






