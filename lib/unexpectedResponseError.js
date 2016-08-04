var util = require("util");

var UnexpectedResponseError = function (message, statusCode) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.statusCode = statusCode;
};

util.inherits(UnexpectedResponseError, Error);

module.exports = UnexpectedResponseError;
