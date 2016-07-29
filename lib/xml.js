var builder = require("xmlbuilder");

var XMLVerbs = function () {
	this.say = function (sentence, params) {
		params.locale = params.locale || "en_US";
		params.gender = params.gender || "female";
		params.voice = params.voice || "julie";
		this.xml = this.xml.ele("SpeakSentence", params, sentence);
		return this;
	};
	this.gatherAnd = function (action, params) {
		this.xml = this.xml.ele("Gather", params, action);
		return this;
	};
	this.toString = function () {
		this.xml.end({ pretty : true }).toString();
		return this;
	};
	this.callAnd = function (action, params) {
		this.xml = this.xml.ele("Call", params, action);
		return this;
	};
	this.conference = function (params) {
		params.joinTone = params.joinTone || true;
		params.leavingTone = params.leavingTone || true;
		this.xml = this.xml.ele("Conference", params);
		return this;
	};
	this.hangup = function () {
		this.xml = this.xml.ele("Hangup");
		return this;
	};
	this.playAudio = function (audio) {
		this.xml = this.xml.ele("PlayAudio", {}, audio);
		return this;
	};
	this.record = function (params) {
		this.xml = this.xml.ele("Record", params);
		return this;
	};
	this.redirect = function (params) {
		this.xml = this.xml.ele("Redirect", params);
		return this;
	};
	this.reject = function (params) {
		this.xml = this.xml.ele("Reject", params);
		return this;
	};
	this.sendMessage = function (params, message) {
		this.xml = this.xml.ele("SendMessage", params, message);
		return this;
	};
	this.transferAnd = function (action, params) {
		this.xml = this.xml.ele("Transfer", params, action);
	};
};

function BXMLResponse() {
	this.xml = builder.create("Response");
}

function BXMLAction() {
	this.xml = builder.begin();
}

XMLVerbs.call(BXMLResponse.prototype);
XMLVerbs.call(BXMLAction.prototype);

module.exports.BXMLAction = BXMLAction;
module.exports.BXMLResponse = BXMLResponse;