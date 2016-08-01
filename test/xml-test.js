var XML = require("../lib/xml.js");
var responseHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<Response>\n";
var tab = "     ";
var responseTail = "</Response>";
var sayOnlyResponse = responseHeader + tab +
	"<SpeakSentence locale=\"en_US\" gender=\"female\" voice=\"julie\">Thank" +
	" you for calling ACME Technical Support.</SpeakSentence>\n" + responseTail;
var gatherOnlyResponse = responseHeader + tab +
	"<Gather requestUrl=\"http://www.example.com/\"/>\n" + responseTail;
var callOnlyResponse = responseHeader + tab +
	"<Call from=\"+19195551212\" to=\"+19195551213\"/>\n" + responseTail;
var conferenceOnlyResponse = responseHeader + tab +
	"<Conference from=\"+19195551212\" joinTone=\"true\" leavingTone=\"true\"/>\n" +
	responseTail;
var hangupOnlyResponse = responseHeader + tab + "<Hangup/>\n" + responseTail;
var audioOnlyResponse = responseHeader + tab +
	"<PlayAudio>http://www.example.com/example.mp3</PlayAudio>\n" + responseTail;
var recordOnlyResponse = responseHeader + tab +
	"<Record requestUrl=\"http://www.example.com\" requestUrlTimeout=\"12345\"/>\n" +
	responseTail;
var redirectOnlyResponse = responseHeader + tab +
	"<Redirect requestUrl=\"http://www.example.com\" requestUrlTimeout=\"12345\"/>\n" +
	responseTail;
var sendMessageOnlyResponse = responseHeader + tab +
	"<SendMessage from=\"+19195551212\" to=\"+19195551213\">Where are you?</SendMessage>\n" +
	responseTail;
var transferOnlyResponse = responseHeader + tab +
	"<Transfer transferTo=\"+19195551212\"/>\n" + responseTail;

describe("XML Builder", function () {
	var myApp;
	describe("Individual verb - say", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.say("Thank you for calling ACME Technical Support.");
		});
		it("Should work", function () {
			myApp.toString().should.equal(sayOnlyResponse);
		});
	});
	describe("Individual verb - gather", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.gather({
				requestUrl : "http://www.example.com/"
			});
		});
		it("Should work", function () {
			myApp.toString().should.equal(gatherOnlyResponse);
		});
	});
	describe("Individual verb - call", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.call({
				from : "+19195551212",
				to   : "+19195551213"
			});
		});
		it("Should work", function () {
			myApp.toString().should.equal(callOnlyResponse);
		});
	});
	describe("Individual verb - conference", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.conference({
				from : "+19195551212"
			});
		});
		it("Should work", function () {
			myApp.toString().should.equal(conferenceOnlyResponse);
		});
	});
	describe("Individual verb - hangup", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.hangup({ });
		});
		it("Should work", function () {
			myApp.toString().should.equal(hangupOnlyResponse);
		});
	});
	describe("Individual verb - playAudio", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.playAudio('http://www.example.com/example.mp3');
		});
		it("Should work", function () {
			myApp.toString().should.equal(audioOnlyResponse);
		});
	});
	describe("Individual verb - record", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.record({
				requestUrl        : "http://www.example.com",
				requestUrlTimeout : 12345
			});
		});
		it("Should work", function () {
			myApp.toString().should.equal(recordOnlyResponse);
		});
	});
	describe("Individual verb - redirect", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.redirect({
				requestUrl        : "http://www.example.com",
				requestUrlTimeout : 12345
			});
		});
		it("Should work", function () {
			myApp.toString().should.equal(redirectOnlyResponse);
		});
	});
	describe("Individual verb - sendMessage", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.sendMessage("Where are you?", {
				from : "+19195551212",
				to   : "+19195551213"
			});
		});
		it("Should work", function () {
			myApp.toString().should.equal(sendMessageOnlyResponse);
		});
	});
	describe("Individual verb - transfer", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.transfer({
				transferTo   : "+19195551212"
			});
		});
		it("Should work", function () {
			myApp.toString().should.equal(transferOnlyResponse);
		});
	});
});
