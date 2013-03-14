var http = require('https'),
  querystring = require('querystring'),
	util = require('util'),
	AvailableNumber = require('./availableNumber')

var defaultHost = 'api.catapult.inetwork.com';

var messagesPath = "messages";
var availableNumbersPath = "availableNumbers";

function Client(host, userId, apiToken, secret) {
	if (!(this instanceof Client)) {
		return new Client(host, userId, apiToken, host);
	}
	this.userId = userId;
	this.apiToken = apiToken;
	this.secret = secret;
	this.host = host || defaultHost;
	this.baseUrl = "/v1/"
	this.baseUserUrl += this.baseUrl + "/users/" + this.userId + "/";
	console.log("Creating Catapult client")
}

module.exports = Client;

Client.prototype.sendMessage = function(from, to, messageBody, callback){
	var data = {"from": from, "to":to, "text":messageBody}
	this.post(this.concatUserUrl(messagesPath), data, callback)
}

Client.prototype.getMessage = function(messageId, callback){
	this.get(this.concatUserUrl(messagesPath), messageId, callback)
}

Client.prototype.getMessages = function(callback){
	this.get(this.concatUserUrl(messagesPath), null, null, callback)
}

Client.prototype.getAvailableNumbers = function(parameters, callback)
{
	var path = availableNumbersPath + "/" + parameters.numberType;
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

Client.prototype.concatBaseUrl = function(path){
	return this.baseUrl + path;
}

Client.prototype.concatUserUrl = function(path){
	return this.baseUserUrl + path;
}

Client.prototype.get = function (path,id, queryParameters, callback){
	var auth = "Basic " + new Buffer(this.apiToken + ":" + this.secret).toString("base64");
	var headers = {'Content-Type':'application/json', 'Authorization':auth}

	delete queryParameters.numberType;
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
	console.log("data json " + content);
	var contentLength = content.length || 0;
	var auth = "Basic " + new Buffer(this.apiToken + ":" + this.secret).toString("base64");
	var headers = {'Content-Type':'application/json', 'Content-Length':contentLength, 'Authorization':auth}
	
	var response = new Object();
	var httpOptions = {
		host : this.host,
		port: 443,
		path: '/v1/users/' + this.userId + '/' + path,
		method: "POST",
		headers: headers
	};

	var req = http.request(httpOptions, function(res){
		response.statusCode = res.statusCode;
		response.entityId = res.headers.location.substr(res.headers.location.lastIndexOf('/')+1) || null;
		res.on('data', function(chunk){
		 	response.data = chunk
		 });
		callback(null, response);
		
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






