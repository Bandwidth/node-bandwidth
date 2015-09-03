var util = require("util");
/** Error type */
function BandwidthError(message, httpStatus) {
	this.message = message;
	this.httpStatus = httpStatus;
}
util.inherits(BandwidthError, Error);

function MissingCredentialsError() {
	this.message = "Missing credentials.\n" +
	"Use new Client(<userId>, <apiToken>, <apiSecret>) or Client.globalOptions to set up them.";
}
util.inherits(MissingCredentialsError, Error);

module.exports = {
	BandwidthError          : BandwidthError,
	MissingCredentialsError : MissingCredentialsError
};
