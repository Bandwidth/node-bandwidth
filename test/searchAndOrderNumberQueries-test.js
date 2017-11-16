var assert = require("assert");
var client = require("../lib/index");

// jscs:disable disallowDanglingUnderscores

describe("searchAndOrderNumberQueries", function () {
	describe("AreaCodeSearchAndOrderNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.AreaCodeSearchAndOrderNumbersQuery({ areaCode : "910" })).toXml().should.containDeep({
				"AreaCodeSearchAndOrderType" : {
					"AreaCode" : { _text : "910" },
					"Quantity" : { _text : 1 }
				}
			});
		});
	});
	describe("RateCenterSearchAndOrdeNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.RateCenterSearchAndOrdeNumbersQuery({ rateCenter : "NC", state : "NC" })).toXml().should.containDeep({
				"RateCenterSearchAndOrderType" : {
					"RateCenter" : { _text : "NC" },
					"State"      : { _text : "NC" },
					"Quantity"   : { _text : 1 }
				}
			});
		});
	});
	describe("NpaNxxSearchAndOrderNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.NpaNxxSearchAndOrderNumbersQuery({ npaNxx : "num", enableTnDetail : true, enableLca : true }))
				.toXml().should.containDeep({
				"NPANXXSearchAndOrderType" : {
					"NpaNxx"         : { _text : "num" },
					"EnableTNDetail" : { _text : true },
					"EnableLCA"      : { _text : true },
					"Quantity"       : { _text : 1 }
				}
			});
		});
	});
	describe("TollFreeVanitySearchAndOrderNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.TollFreeVanitySearchAndOrderNumbersQuery({ tollFreeVanity : "value" }))
				.toXml().should.containDeep({
				"TollFreeVanitySearchAndOrderType" : {
					"TollFreeVanity" : { _text : "value" },
					"Quantity"       : { _text : 1 }
				}
			});
		});
	});
	describe("TollFreeWildCharSearchAndOrderNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.TollFreeWildCharSearchAndOrderNumbersQuery({ tollFreeWildCardPattern : "value" }))
				.toXml().should.containDeep({
				"TollFreeWildCharSearchAndOrderType" : {
					"TollFreeWildCardPattern" : { _text : "value" },
					"Quantity"                : { _text : 1 }
				}
			});
		});
	});
	describe("StateSearchAndOrderNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.StateSearchAndOrderNumbersQuery({ state : "value" })).toXml().should.containDeep({
				"StateSearchAndOrderType" : {
					"State"    : { _text : "value" },
					"Quantity" : { _text : 1 }
				}
			});
		});
	});
	describe("CitySearchAndOrderNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.CitySearchAndOrderNumbersQuery({ state : "NC", city : "Cary" }))
				.toXml().should.containDeep({
				"CitySearchAndOrderType" : {
					"State"    : { _text : "NC" },
					"City"     : { _text : "Cary" },
					"Quantity" : { _text : 1 }
				}
			});
		});
	});
	describe("ZipSearchAndOrderNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.ZipSearchAndOrderNumbersQuery({ zip : "zip" })).toXml().should.containDeep({
				"ZIPSearchAndOrderType" : {
					"Zip"      : { _text : "zip" },
					"Quantity" : { _text : 1 }
				}
			});
		});
	});
	describe("LataSearchAndOrderNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.LataSearchAndOrderNumbersQuery({ lata : "lata" }))
				.toXml().should.containDeep({
				"LATASearchAndOrderType" : {
					"Lata"     : { _text : "lata" },
					"Quantity" : { _text : 1 }
				}
			});
		});
	});
	describe("CombinedSearchAndOrderNumbersQuery", function () {
		it("should build right XML", function () {
			(new client.CombinedSearchAndOrderNumbersQuery({ lata : "lata" }))
				.toXml().should.containDeep({
				"CombinedSearchAndOrderType" : {
					"Quantity" : { _text : 1 },
					"Lata"     : { _text : "lata" }
				}
			});
		});
	});
});
