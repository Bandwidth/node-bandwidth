"use strict";
var util = require("util");
/** Error type */
function BandwidthError(message, httpStatus){
  this.message = message;
  this.httpStatus = httpStatus;
}
util.inherits(BandwidthError, Error);

module.exports = {
  BandwidthError: BandwidthError
};
