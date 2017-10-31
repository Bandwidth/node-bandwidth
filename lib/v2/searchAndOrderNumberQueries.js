/** AreaCodeSearchAndOrderNumbersQuery */
function AreaCodeSearchAndOrderNumbersQuery(query) {
	this.toXml = function () {
		return {
			"AreaCodeSearchAndOrderType": {
				"AreaCode": {_text: query.areaCode},
				"Quantity": {_text: query.quantity || 1}
			}
		};
	};
}

/** RateCenterSearchAndOrdeNumbersQuery */
function RateCenterSearchAndOrdeNumbersQuery(query) {
	this.toXml = function () {
		return {
			"RateCenterSearchAndOrderType": {
				"RateCenter": {_text: query.rateCenter},
				"State": {_text: query.state},
				"Quantity": {_text: query.quantity || 1}
			}
		};
	};
}

/** NpaNxxSearchAndOrderNumbersQuery */
function NpaNxxSearchAndOrderNumbersQuery(query) {
	this.toXml = function () {
		return {
			"NPANXXSearchAndOrderType": {
				"NpaNxx": {_text: query.npaNxx},
				"EnableTNDetail": {_text: query.enableTnDetail || query.enableTNDetail},
				"EnableLCA": {_text: query.enableLca || query.enableLCA},
				"Quantity": {_text: query.quantity || 1}
			}
		};
	};
}

/** TollFreeVanitySearchAndOrderNumbersQuery */
function TollFreeVanitySearchAndOrderNumbersQuery(query) {
	this.toXml = function () {
		return {
			"TollFreeVanitySearchAndOrderType": {
				"TollFreeVanity": {_text: query.tollFreeVanity},
				"Quantity": {_text: query.quantity || 1}
			}
		};
	};
}

/** TollFreeWildCharSearchAndOrderNumbersQuery */
function TollFreeWildCharSearchAndOrderNumbersQuery(query) {
	this.toXml = function () {
		return {
			"TollFreeWildCharSearchAndOrderType": {
				"TollFreeWildCardPattern": {_text: query.tollFreeWildCardPattern},
				"Quantity": {_text: query.quantity || 1}
			}
		};
	};
}

/** StateSearchAndOrderNumbersQuery */
function StateSearchAndOrderNumbersQuery(query) {
	this.toXml = function () {
		return {
			"StateSearchAndOrderType": {
				"State": {_text: query.state},
				"Quantity": {_text: query.quantity || 1}
			}
		};
	};
}

/** CitySearchAndOrderNumbersQuery */
function CitySearchAndOrderNumbersQuery(query) {
	this.toXml = function () {
		return {
			"CitySearchAndOrderType": {
				"State": {_text: query.state},
				"City": {_text: query.city},
				"Quantity": {_text: query.quantity || 1}
			}
		};
	};
}

/** ZipSearchAndOrderNumbersQuery */
function ZipSearchAndOrderNumbersQuery(query) {
	this.toXml = function () {
		return {
			"ZIPSearchAndOrderType": {
				"Zip": {_text: query.zip},
				"Quantity": {_text: query.quantity || 1}
			}
		};
	};
}

/** LataSearchAndOrderNumbersQuery */
function LataSearchAndOrderNumbersQuery(query) {
	this.toXml = function () {
		return {
			"LATASearchAndOrderType": {
				"Lata": {_text: query.lata},
				"Quantity": {_text: query.quantity || 1}
			}
		};
	};
}

/** CombinedSearchAndOrderNumbersQuery */
function CombinedSearchAndOrderNumbersQuery(query) {
	this.toXml = function () {
		return {
			"CombinedSearchAndOrderType": {
				"Quantity": {_text: query.quantity || 1},
				"AreaCode": {_text: query.areaCode},
				"RateCenter": {_text: query.rateCenter},
				"NpaNxx": {_text: query.npaNxx},
				"EnableTNDetail": {_text: query.enableTnDetail || query.enableTNDetail},
				"EnableLCA": {_text: query.enableLca || query.enableLCA},
				"TollFreeVanity": {_text: query.tollFreeVanity},
				"TollFreeWildCardPattern": {_text: query.tollFreeWildCardPattern},
				"State": {_text: query.state},
				"City": {_text: query.city},
				"Zip": {_text: query.zip},
				"Lata": {_text: query.lata}
			}
		};
	};
}

module.exports = {
	AreaCodeSearchAndOrderNumbersQuery,
	RateCenterSearchAndOrdeNumbersQuery,
	NpaNxxSearchAndOrderNumbersQuery,
	TollFreeVanitySearchAndOrderNumbersQuery,
	TollFreeWildCharSearchAndOrderNumbersQuery,
	StateSearchAndOrderNumbersQuery,
	CitySearchAndOrderNumbersQuery,
	ZipSearchAndOrderNumbersQuery,
	LataSearchAndOrderNumbersQuery,
	CombinedSearchAndOrderNumbersQuery
};
