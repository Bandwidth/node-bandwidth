var xml = require("../").xml;

function toXml(verb) {
	return new xml.Response([ verb ]).toXml();
}

describe("Bandwidth XML", function () {
	describe("Response", function () {
		it("should generate valid xml", function () {
			var response = new xml.Response();
			response.toXml().should.equal("<?xml version=\"1.0\"?>\n<Response/>");
			response.push(new xml.Hangup());
			response.toXml().should.equal("<?xml version=\"1.0\"?>\n<Response>\n  <Hangup/>\n</Response>");
			response.push(new xml.Hangup());
			response.toXml().should.equal("<?xml version=\"1.0\"?>\n<Response>\n  <Hangup/>\n  <Hangup/>\n</Response>");
			response = new xml.Response([ new xml.Hangup(), new xml.Hangup() ]);
			response.toXml().should.equal("<?xml version=\"1.0\"?>\n<Response>\n  <Hangup/>\n  <Hangup/>\n</Response>");
		});
	});

	describe("Gather", function () {
		it("should generate valid xml", function () {
			var gather = new xml.Gather({ requestUrl : "http://localhost" });
			toXml(gather).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
				"<Gather requestUrl=\"http://localhost\"/>\n</Response>");
			gather = new xml.Gather({ requestUrl : "http://localhost", maxDigits : 3 });
			toXml(gather).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
				"<Gather requestUrl=\"http://localhost\" maxDigits=\"3\"/>\n</Response>");
		});

		it("should return an empty object", function () {
			var gather = new xml.Gather(null);
			gather.should.eql({});
		});
	});

	describe("Hangup", function () {
		it("should generate valid xml", function () {
			var hangup = new xml.Hangup();
			toXml(hangup).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  <Hangup/>\n</Response>");
		});
	});

	describe("Pause", function () {
		it("should generate valid xml", function () {
			var pause = new xml.Pause({ duration : 10 });
			toXml(pause).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  <Pause duration=\"10\"/>\n</Response>");
		});
	});

	describe("PlayAudio", function () {
		it("should generate valid xml", function () {
			var verb = new xml.PlayAudio({ url : "http://localhost", digits : "0" });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
				"<PlayAudio digits=\"0\">http://localhost</PlayAudio>\n</Response>");
		});
	});

	describe("Record", function () {
		it("should generate valid xml", function () {
			var verb = new xml.Record({ maxDuration : 120 });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  <Record maxDuration=\"120\"/>\n</Response>");
		});
	});

	describe("Redirect", function () {
		it("should generate valid xml", function () {
			var verb = new xml.Redirect({ requestUrl : "http://localhost" });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
				"<Redirect requestUrl=\"http://localhost\"/>\n</Response>");
		});
	});

	describe("Reject", function () {
		it("should generate valid xml", function () {
			var verb = new xml.Reject({ reason : "error" });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  <Reject reason=\"error\"/>\n</Response>");
		});
	});

	describe("SpeakSentence", function () {
		it("should generate valid xml", function () {
			var verb = new xml.SpeakSentence({ sentence : "Hello", gender : "male", voice : "paul", locale : "en_US" });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
			"<SpeakSentence voice=\"paul\" locale=\"en_US\" gender=\"male\">Hello</SpeakSentence>\n</Response>");
		});
	});

	describe("SendMessage", function () {
		it("should generate valid xml", function () {
			var verb = new xml.SendMessage({ from : "from", to : "to", text : "Hello", requestUrl : "http://localhost" });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
			"<SendMessage from=\"from\" to=\"to\" requestUrl=\"http://localhost\">Hello</SendMessage>\n</Response>");
		});
	});

	describe("Transfer", function () {
		it("should generate valid xml", function () {
			var verb = new xml.Transfer({ transferTo : "number", transferCallerId : "callerId" });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
			"<Transfer transferTo=\"number\" transferCallerId=\"callerId\"/>\n</Response>");
			verb.speakSentence = new xml.SpeakSentence({ sentence : "Hello" });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
			"<Transfer transferTo=\"number\" transferCallerId=\"callerId\">\n    " +
				"<SpeakSentence>Hello</SpeakSentence>\n  </Transfer>\n</Response>");
			verb = new xml.Transfer({
				transferTo       : "number",
				transferCallerId : "callerId",
				speakSentence    : {
					sentence : "Hello"
				}
			});

			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
			"<Transfer transferTo=\"number\" transferCallerId=\"callerId\">\n    " +
				"<SpeakSentence>Hello</SpeakSentence>\n  </Transfer>\n</Response>");
		});
	});

	describe("Call", function () {
		it("should generate valid xml", function () {
			var verb = new xml.Call({ from : "number_from", to : "number_to" });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
			"<Call from=\"number_from\" to=\"number_to\"/>\n</Response>");
			verb.speakSentence = new xml.SpeakSentence({ sentence : "Hello" });
			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
			"<Call from=\"number_from\" to=\"number_to\">\n    " +
				"<SpeakSentence>Hello</SpeakSentence>\n  </Call>\n</Response>");
			verb = new xml.Call({
				from          : "number_from",
				to            : "number_to",
				speakSentence : {
					sentence : "Hello"
				}
			});

			toXml(verb).should.equal("<?xml version=\"1.0\"?>\n<Response>\n  " +
			"<Call from=\"number_from\" to=\"number_to\">\n    " +
				"<SpeakSentence>Hello</SpeakSentence>\n  </Call>\n</Response>");

		});
	});
});
