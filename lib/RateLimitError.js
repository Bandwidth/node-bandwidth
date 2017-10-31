var util = require("util");

var RateLimitError = function (message, statusCode, limitReset) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.statusCode = statusCode;
	this.limitReset = limitReset;

};

util.inherits(RateLimitError, Error);

module.exports = RateLimitError;
