var superagent = require("superagent");
var errors = require("./errors");
var request = require("request");

/** Constructor */
function Client(userId, apiToken, apiSecret, options) {
	if (!(this instanceof Client)) {
		if (options) {
			return new Client(userId, apiToken, apiSecret, options);
		}
		else {
			return new Client(userId, apiToken, apiSecret);
		}
	}
	if (typeof options !== "object" && arguments.length === 4) {
		//compability with previous version of lib
		var opts = { apiEndPoint : (userId)?("https://" + userId):null };
		this.host = userId;
		userId = apiToken;
		this.userId = userId;
		apiToken = apiSecret;
		this.apiToken = apiToken;
		apiSecret = options;
		this.secret = apiSecret;
		options = opts;
	}
	if (arguments.length === 1) {
		options = arguments[0];
		userId = options.userId;
	}
	options = options || {};
	if (!userId) {
		userId = Client.globalOptions.userId;
	}
	if (!apiToken) {
		apiToken = options.apiToken || Client.globalOptions.apiToken;
	}
	if (!apiSecret) {
		apiSecret = options.apiSecret || Client.globalOptions.apiSecret;
	}
	if (!options.apiEndPoint) {
		options.apiEndPoint = Client.globalOptions.apiEndPoint;
	}
	if (!options.apiVersion) {
		options.apiVersion = Client.globalOptions.apiVersion;
	}
	if (!userId || !apiToken || !apiSecret) {
		throw new errors.MissingCredentialsError();
	}
	this.prepareRequest = function (req) {
		return req.auth(apiToken, apiSecret).accept("json");
	};

	this.concatUserPath = function (path) {
		return "/users/" + userId + ((path[0] === "/") ? path : ("/" + path));
	};

	this.prepareUrl = function (path) {
		return options.apiEndPoint + "/" + options.apiVersion + ((path[0] === "/") ? path : ("/" + path));
	};
	this.rawGetRequest = function (uri) {
		return request({
			url  : this.prepareUrl(uri),
			auth : {
				user : apiToken,
				pass : apiSecret
			}
		});
	};

}

/** global options (used when constructor called without params) */
Client.globalOptions = {
	apiEndPoint : "https://api.catapult.inetwork.com",
	apiVersion  : "v1",
	apiToken    : "",
	apiSecret   : "",
	userId      : ""
};

/** Extract id from location header */
Client.getIdFromLocationHeader = function (location, callback) {
	var index = location.lastIndexOf("/");
	if (index < 0) {
		return callback(new Error("Missing id in response"));
	}
	var id = location.substr(index + 1);
	callback(null, id);
};

/** Create new request with auth data */
Client.prototype.createRequest = function (method, path) {
	return this.prepareRequest(superagent[method](this.prepareUrl(path)));
};

/** Perform http request to Bandwidth API server */
Client.prototype.makeRequest = function (method, path) {
	var callback = arguments[arguments.length - 1];
	var request = this.createRequest(method, path);
	if (arguments.length > 3) {
		var data = arguments[2];
		if (method === "get") {
			request.query(data);
		}
		else {
			request.type("json").send(data);
		}
	}
	var self = this;
	request.buffer().end(function (res) {
		self.checkResponse(res, callback);
	});
};

function processResponse (obj) {
	if (Array.isArray(obj)) {
		var i;
		var l = obj.length;
		var list = new Array(l);
		for (i = 0; i < l; i++) {
			list[i] = processResponse(obj[i]);
		}
		return list;
	}
	else if (typeof obj === "object") {
		var k;
		var res = {};
		for (k in obj) {
			res[k] = processResponse(obj[k]);
		}
		return res;
	}
	else if (typeof obj === "string" && /^\d{4}\-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}(\.\d{3})?Z$/.test(obj)) {
		return new Date(obj);
	}
	return obj;
}

/** Validate response object of http request */
Client.prototype.checkResponse = function (res, callback) {
	if (res.ok) {
		return callback(null, processResponse(res.body));
	}
	var message = res.body.message || res.body.code;
	if (message) {
		return callback(new errors.BandwidthError(message));
	}
	return callback(new errors.BandwidthError("Http code " + res.status, res.status));
};

module.exports = Client;
