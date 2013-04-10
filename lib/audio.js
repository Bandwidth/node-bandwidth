function Audio(callId) {
	if (!(this instanceof Audio)) {
		return new Audio(callId);
	}
	this.callId = callId
}

module.exports = Audio;