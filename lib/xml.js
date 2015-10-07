var builder = require("xmlbuilder");

/**
 * Response type (root object)
 * @param {[type]} verbs [description]
 */
function Response(verbs) {
	this.verbs = verbs || [];
}

/**
 * Build xml string from resposne
 * @return {[type]} [description]
 */
Response.prototype.toXml = function () {
	var response = {};
	if (this.verbs.length > 0) {
		response["#list"] = this.verbs.map(function (v) {
			return v.toXmlObject();
		});
	}

	var root = { "Response" : response };
	return builder.create(root).end({ pretty : true });
};

/**
 * Add a verb to response
 * @param  {[type]} verb [description]
 * @return {[type]}      [description]
 */
Response.prototype.push = function (verb) {
	this.verbs.push(verb);
};

function copyTo(source, destination) {
	if (source) {
		for (var k in source) {
			destination[k] = source[k];
		}
	}
}

function removeEmptyKeys(obj) {
	var result = {};
	var k;
	var v;
	for (k in obj) {
		v = obj[k];
		if (v) {
			result[k] = (typeof v === "object")?removeEmptyKeys(v):v;
		}
	}

	return result;
}

/**
 * Gather verb
 * @param {[type]} data [description]
 */
function Gather(data) {
	copyTo(data, this);
}

Gather.prototype.toXmlObject = function () {
	return removeEmptyKeys({
		"Gather" : {
			"@requestUrl"        : this.requestUrl,
			"@requestUrlTimeout" : this.requestUrlTimeout,
			"@terminatingDigits" : this.terminatingDigits,
			"@maxDigits"         : this.maxDigits,
			"@interDigitTimeout" : this.interDigitTimeout,
			"@bargeable"         : this.bargeable
		}
	});
};

/**
 * Hangup verb
 */
function Hangup() {
}

Hangup.prototype.toXmlObject = function () {
	return { "Hangup" : {} };
};

/**
 * Pause verb
 * @param {[type]} data [description]
 */
function Pause(data) {
	copyTo(data, this);
}

Pause.prototype.toXmlObject = function () {
	return removeEmptyKeys({
		"Pause" : {
			"@duration" : this.duration
		}
	});
};

/**
 * PlayAudio verb
 * @param {[type]} data [description]
 */
function PlayAudio(data) {
	copyTo(data, this);
}

PlayAudio.prototype.toXmlObject = function () {
	return removeEmptyKeys({
		"PlayAudio" : {
			"@digits" : this.digits,
			"#text"   : this.url
		}
	});
};

/**
 * Record verb
 * @param {[type]} data [description]
 */
function Record(data) {
	copyTo(data, this);
}

Record.prototype.toXmlObject = function () {
	return removeEmptyKeys({
		"Record" : {
			"@requestUrl"            : this.requestUrl,
			"@requestUrlTimeout"     : this.requestUrlTimeout,
			"@terminatingDigits"     : this.terminatingDigits,
			"@maxDuration"           : this.maxDuration,
			"@transcribe"            : this.transcribe,
			"@transcribeCallbackUrl" : this.transcribeCallbackUrl
		}
	});
};

/**
 * Redirect verb
 * @param {[type]} data [description]
 */
function Redirect(data) {
	copyTo(data, this);
}

Redirect.prototype.toXmlObject = function () {
	return removeEmptyKeys({
		"Redirect" : {
			"@requestUrl"        : this.requestUrl,
			"@requestUrlTimeout" : this.requestUrlTimeout
		}
	});
};

/**
 * Reject verb
 * @param {[type]} data [description]
 */
function Reject(data) {
	copyTo(data, this);
}

Reject.prototype.toXmlObject = function () {
	return removeEmptyKeys({
		"Reject" : {
			"@reason" : this.reason
		}
	});
};

/**
 * SendMessage verb
 * @param {[type]} data [description]
 */
function SendMessage(data) {
	copyTo(data, this);
}

SendMessage.prototype.toXmlObject = function () {
	return removeEmptyKeys({
		"SendMessage" : {
			"@from"              : this.from,
			"@to"                : this.to,
			"@requestUrl"        : this.requestUrl,
			"@requestUrlTimeout" : this.requestUrlTimeout,
			"@statusCallbackUrl" : this.statusCallbackUrl,
			"#text"              : this.text
		}
	});
};

/**
 * SpeakSentence verb
 * @param {[type]} data [description]
 */
function SpeakSentence(data) {
	copyTo(data, this);
}

SpeakSentence.prototype.toXmlObject = function () {
	return removeEmptyKeys({
		"SpeakSentence" : {
			"@voice"  : this.voice,
			"@locale" : this.locale,
			"@gender" : this.gender,
			"#text"   : this.sentence
		}
	});
};

/**
 * Transfer verb
 * @param {[type]} data [description]
 */
function Transfer(data) {
	copyTo(data, this);
}

Transfer.prototype.toXmlObject = function () {
	var speakSentence;
	if (this.speakSentence) {
		speakSentence = ((this.speakSentence instanceof SpeakSentence) ?
			this.speakSentence : new SpeakSentence(this.speakSentence))
			.toXmlObject().SpeakSentence;
	}

	return removeEmptyKeys({
		"Transfer" : {
			"@transferTo"        : this.transferTo,
			"@transferCallerId"  : this.transferCallerId,
			"@requestUrl"        : this.requestUrl,
			"@requestUrlTimeout" : this.requestUrlTimeout,
			"@callTimeout"       : this.callTimeout,
			"@tag"               : this.tag,
			"SpeakSentence"      : speakSentence
		}
	});
};

/**
 * Call Verb
 * @param {[type]} [data] [description]
 */
function Call(data) {
	copyTo(data, this);
}

Call.prototype.toXmlObject = function () {
	var speakSentence;
	if (this.speakSentence) {
		speakSentence = ((this.speakSentence instanceof SpeakSentence) ?
			this.speakSentence : new SpeakSentence(this.speakSentence))
			.toXmlObject().SpeakSentence;
	}

	return removeEmptyKeys({
		"Call" : {
			"@from"              : this.from,
			"@to"                : this.to,
			"@timeout"           : this.timeout,
			"@requestUrl"        : this.requestUrl,
			"@requestUrlTimeout" : this.requestUrlTimeout,
			"SpeakSentence"      : speakSentence
		}
	});
};

module.exports = {
	Call          : Call,
	Response      : Response,
	Gather        : Gather,
	Hangup        : Hangup,
	Pause         : Pause,
	PlayAudio     : PlayAudio,
	Record        : Record,
	Redirect      : Redirect,
	Reject        : Reject,
	SendMessage   : SendMessage,
	SpeakSentence : SpeakSentence,
	Transfer      : Transfer
};
