var http = require('https'),
  querystring = require('querystring'),
	util = require('util'),
	AvailableNumber = require('./availableNumber'),
	PhoneNumber = require('./phoneNumber')
	

var defaultHost = 'api.catapult.inetwork.com';
var messagesPath = "messages";
var phoneNumbersPath = "phoneNumbers"
var availableNumbersPath = "availableNumbers";
var callsPath = "calls";


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
	this.post(this.concatUserUrl(callsPath), call, callback);
}

Client.prototype.transferCall = function(callTransfer, callback){
	this.post(this.concatUserUrl(callsPath) + "/" + callTransfer.call.id, callTransfer, callback)
}

Client.prototype.getCall = function(callId, callback){
	console.log("get call")
	this.get(this.concatUserUrl(callsPath), callId, null, function(error, response){
		if(error){
			callback(error, null)
		}else {
			var call = JSON.parse(response.data);
			callback(null,call)
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
		 });
		res.on('end', function(){
			callback(null, response);
		});
		
	});
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
		response.statusCode = res.statusCode;
		console.log("Status code: " + response.statusCode)
		if(response.statusCode !== 201 && response.statusCode !== 200)
		{
			callback({statusCode:response.statusCode, message:"There was a problem with your request"})
		}else {
			if(res.headers.location){
				response.entityId = res.headers.location.substr(res.headers.location.lastIndexOf('/')+1) || null;
			}
			res.on('data', function(chunk){
			 	response.data = chunk
			 });
			callback(null, response);
		}
	});
	req.on('error', function(e) {
		callback(e)
	});

  if(contentLength > 0)
  {
 		req.write(content);
  }
  req.end();
	
}






