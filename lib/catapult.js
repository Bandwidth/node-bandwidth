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

Client.prototype.sendSMS = function(from, to, messageBody, callback){
	var data = {"from": from, "to":to, "text":messageBody}
	this.post(messagesPath, data, callback)
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






// Code.prototype.invoke = function(queryParameters, body, callback) {
// 	var queryParameters = queryParameters || {},
// 		body = body || "",
// 		callback = callback || function(){};
// 	
// 	//handle if just invoking the code without parameters or body
// 	if(typeof arguments[0] === 'function' && arguments.length === 1 ){
// 		callback = arguments[0];
// 		body = "";
// 		queryParameters = {};
// 	}
// 	
// 	var contentLength = body.length || 0;
// 	var queryString = querystring.stringify(queryParameters);
// 
// 	var headers = {'Content-Type':'application/json', 'Content-Length':contentLength, 'api_token':this.client.apiToken}
// 
// 	if(this.phoneNumber !== undefined){
// 		headers["phoneNumber"] = this.phoneNumber.number;
// 	}	
// 
// 	var response = new Object();
// 	var httpOptions = {
// 		host : this.client.host,
// 		port: 443,
// 		path: '/code/' + this.id + '/invoke?' + queryString,
// 		method: "POST",
// 		headers: headers
// 	};
// 	
// 	var req = http.request(httpOptions, function(res){
// 		response.statusCode = res.statusCode;
// 		res.on('data', function(chunk){
// 			response.data = chunk
// 			callback(null, response);
// 		});
// 	});
// 	req.on('error', function(e) {
// 		callback(e)
// 	});
// 	
//   if(contentLength > 0)
//   {
//  		req.write(JSON.stringify(body));
//   }
// 	req.end();
// }


