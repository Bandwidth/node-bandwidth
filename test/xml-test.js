var XML = require("../lib/xml.js");
var fs = require("fs");
var speakSentenceOnlyResponse = fs.readFileSync("./test/bxml-responses/speakSentence.xml", "utf8");
var gatherOnlyResponse = fs.readFileSync("./test/bxml-responses/gather.xml", "utf8");
var callOnlyResponse = fs.readFileSync("./test/bxml-responses/call.xml", "utf8");
var conferenceOnlyResponse = fs.readFileSync("./test/bxml-responses/conference.xml", "utf8");
var hangupOnlyResponse = fs.readFileSync("./test/bxml-responses/hangup.xml", "utf8");
var audioOnlyResponse = fs.readFileSync("./test/bxml-responses/playAudio.xml", "utf8");
var recordOnlyResponse = fs.readFileSync("./test/bxml-responses/record.xml", "utf8");
var redirectOnlyResponse = fs.readFileSync("./test/bxml-responses/redirect.xml", "utf8");
var sendMessageOnlyResponse = fs.readFileSync("./test/bxml-responses/sendMessage.xml", "utf8");
var transferOnlyResponse = fs.readFileSync("./test/bxml-responses/transfer.xml", "utf8");
var nestingResponse = fs.readFileSync("./test/bxml-responses/nesting.xml", "utf8");
var chainingResponse = fs.readFileSync("./test/bxml-responses/chaining.xml", "utf8");

describe("XML Builder", function () {
	var myApp;
	describe("Individual verb - speakSentence", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.speakSentence("Thank you for calling ACME Technical Support.");
		});
		it("Should generate correct BXML", function () {
			myApp.toString().should.equal(speakSentenceOnlyResponse);
		});
	});
	describe("Individual verb - gather", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.gather({
				requestUrl : "http://www.example.com/"
			});
		});
		it("Should generate correct BXML", function () {
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
		it("Should generate correct BXML", function () {
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
		it("Should generate correct BXML", function () {
			myApp.toString().should.equal(conferenceOnlyResponse);
		});
	});
	describe("Individual verb - hangup", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.hangup({ });
		});
		it("Should generate correct BXML", function () {
			myApp.toString().should.equal(hangupOnlyResponse);
		});
	});
	describe("Individual verb - playAudio", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.playAudio("http://www.example.com/example.mp3");
		});
		it("Should generate correct BXML", function () {
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
		it("Should generate correct BXML", function () {
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
		it("Should generate correct BXML", function () {
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
		it("Should generate correct BXML", function () {
			myApp.toString().should.equal(sendMessageOnlyResponse);
		});
	});
	describe("Individual verb - transfer", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.transfer({
				transferTo : "+19195551212"
			});
		});
		it("Should generate correct BXML", function () {
			myApp.toString().should.equal(transferOnlyResponse);
		});
	});
	describe("Nesting", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.gather({
				requestUrl : "http://www.example.com/"
			}, function () {
				this.speakSentence("Press some numbers!");
			});
		});
		it("Should generate correct BXML", function () {
			myApp.toString().should.equal(nestingResponse);
		});
	});
	describe("Chaining", function () {
		before(function () {
			myApp = new XML.BXMLResponse();
			myApp.speakSentence("Hi! My name is:")
				.speakSentence("What? My name is:");
		});
		it("Should generate correct BXML", function () {
			myApp.toString().should.equal(chainingResponse);
		});
	});
});
