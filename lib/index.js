var Client = require("./client");
var Message = require("./message");
var UnexpectedResponseError = require("./UnexpectedResponseError");

function bindAll (object, client) {
	Object.keys(object).forEach(function (method) {
		object[method] = object[method].bind(undefined, client);
	});
	return object;
}

var CatapultClient = function (config) {
	var client = new Client(config);
	this.Message = bindAll(Message, client);
};

CatapultClient.UnexpectedResponseError = UnexpectedResponseError;

module.exports = CatapultClient;
