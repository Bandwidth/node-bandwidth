var http = require('https'),
  querystring = require('querystring'),
	util = require('util');

var defaultHost = 'api.catapult.inetwork.com';

var messagesPath = "messages";


var Client = module.exports.Client = function Client(host, userId, apiToken, secret) {
	if (!(this instanceof Client)) {
		return new Client(host, userId, apiToken, host);
	}
	this.userId = userId;
	this.apiToken = apiToken;
	this.secret = secret;
	this.host = host || defaultHost;
	this.baseUrl = "https://" + this.host + "/v1/users/" + this.userId + "/";
	console.log("Creating Catapult client")
}

Client.prototype.sendMessage = function(from, to, messageBody, callback){
	var data = {"from": from, "to":to, "text":messageBody}
	this.post(messagesPath, data, callback)
}

Client.prototype.getMessage = function(messageId, callback){
	this.get(messagesPath, messageId, callback)
}

Client.prototype.getMessages = function(callback){
	this.get(messagesPath, null, callback)
}

Client.prototype.get = function (path,id,callback){
	var auth = "Basic " + new Buffer(this.apiToken + ":" + this.secret).toString("base64");
	var headers = {'Content-Type':'application/json', 'Authorization':auth}
	
	var urlPath = '/v1/users/' + this.userId + '/' + path;
	if(id){
		urlPath = urlPath + "/" + id
	}
	
	console.log("Url path: " + urlPath)

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






