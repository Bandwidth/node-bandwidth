var parse = require("parse-link-header");
var _ = require("lodash");

/**
 * getNextLink
 * @function
 * @param {Object} response A headers object returned from calling 'client.makeRequest' (response.headers)
 * @returns A parsed version of the link to the subsequent page, or null if no such page exists.
 */
var getNextLink = function (headers) {
	if (headers.link) {
		var parsedHeader = parse(headers.link);
		if (parsedHeader.next) {
			return _.omit(parsedHeader.next, [ "rel", "url" ]);
		}
	}
	return null;
};

module.exports.getNextLink = getNextLink;