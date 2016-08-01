var builder = require("xmlbuilder");

var BXMLResponse = function () {
	this.xml = builder.create("Response", {
		encoding : "UTF-8"
	});
	this.say = function (sentence, params) {
		params = params || { };
		params.locale = params.locale || "en_US";
		params.gender = params.gender || "female";
		params.voice = params.voice || "julie";
		this.xml = this.xml.ele("SpeakSentence", params, sentence).up();
		return this;
	};
	this.gatherAnd = function (params, callback) {
		this.xml = this.xml.ele("Gather", params);
		callback.call(this);
		return this;
	};
	this.toString = function () {
		return '\n' + this.xml.end({ 
			pretty : true,
			indent : '     '
		}).toString() + '\n';
	};
	this.callAnd = function (params, callback) {
		this.xml = this.xml.ele("Call", params);
		callback.call(this);
		return this;
	};
	this.conference = function (params) {
		params.joinTone = params.joinTone || true;
		params.leavingTone = params.leavingTone || true;
		this.xml = this.xml.ele("Conference", params).up();
		return this;
	};
	this.hangup = function () {
		this.xml = this.xml.ele("Hangup").up();
		return this;
	};
	this.playAudio = function (audio) {
		this.xml = this.xml.ele("PlayAudio", {}, audio).up();
		return this;
	};
	this.record = function (params) {
		this.xml = this.xml.ele("Record", params).up();
		return this;
	};
	this.redirect = function (params) {
		this.xml = this.xml.ele("Redirect", params).up();
		return this;
	};
	this.reject = function (params) {
		this.xml = this.xml.ele("Reject", params).up();
		return this;
	};
	this.sendMessage = function (message, params) {
		this.xml = this.xml.ele("SendMessage", params, message).up();
		return this;
	};
	this.transferAnd = function (params, callback) {
		this.xml = this.xml.ele("Transfer", params);
		callback.call(this);
		return this;
	};
};

module.exports.BXMLResponse = BXMLResponse;

myApp = new BXMLResponse();
myApp = myApp.gatherAnd({
	requestUrl : "http://www.example.com/",
	maxDigits : 1
}, function(){
	this.playAudio("http://ap.bandwidth.com/wp-content/uploads/voicemail_menu.mp3");
});
console.log(myApp.toString());

// Output:
//<?xml version="1.0" encoding="UTF-8"?>
//<Response>
//     <Gather requestUrl="http://www.example.com/" maxDigits="1">
//          <PlayAudio>http://ap.bandwidth.com/wp-content/uploads/voicemail_menu.mp3</PlayAudio>
//     </Gather>
//</Response>

myOtherApp = new BXMLResponse();
myOtherApp.say("Welcome to Acme Customer Service!")
    .gatherAnd({
        requestUrl : "http://www.acme.biz"
    }, function(){
    	this.say("Press 1 for customer service.")
    		.say("Press 2 for British customer service.", {
    			gender : "female",
    			locale : "en_UK",
    			voice : "bridget"
    		});
    });
console.log(myOtherApp.toString());

/*
Output:
<?xml version="1.0" encoding="UTF-8"?>
<Response>
     <SpeakSentence locale="en_US" gender="female" voice="julie">Welcome to Acme Customer Service!</SpeakSentence>
     <Gather requestUrl="http://www.acme.biz">
          <SpeakSentence locale="en_US" gender="female" voice="julie">Press 1 for customer service.</SpeakSentence>
          <SpeakSentence gender="female" locale="en_UK" voice="bridget">Press 2 for British customer service.</SpeakSentence>
     </Gather>
</Response>
*/