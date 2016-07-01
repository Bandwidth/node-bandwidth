var parse = require("parse-link-header");

/**
 * getNextLink
 * @function
 * @param {Object} response A response object returned from calling 'client.makeRequest'
 * @returns A parsed version of the link to the subsequent page, or null if no such page exists.
 */
var getNextLink = function (headers) {
	if (headers.link) {
		var parsedUrls = parse(headers.link);
		if (parsedUrls.next) {
			var urlToReturn = {
				size : parsedUrls.next.size,
				page : parsedUrls.next.page
			};
			return urlToReturn;
		}
	}
	return null;
};

module.exports.getNextLink = getNextLink;