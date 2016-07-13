var parse = require("parse-link-header");

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
			delete parsedHeader.next.rel;
			delete parsedHeader.next.url;
			return parsedHeader.next;
		}
	}
	return null;
};

module.exports.getNextLink = getNextLink;