function Application(name, incomingCallUrl, incomingSmsUrl, script) {
	if (!(this instanceof Application)) {
		return new Application(name, incomingCallUrl, incomingSmsUrl);
	}
	this.name = name
	this.incomingCallUrl = incomingCallUrl
	this.incomingSmsUrl = incomingSmsUrl
	this.script = script;
}

module.exports = Application;