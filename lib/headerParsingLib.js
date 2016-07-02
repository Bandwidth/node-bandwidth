var url = require("url");
var querystring = require("querystring");

/**
 * getNextLink
 * @function
 * @param {Object} response A headers object returned from calling 'client.makeRequest' (response.headers)
 * @returns A parsed version of the link to the subsequent page, or null if no such page exists.
 */
var getNextLink = function (headers) {
	if (headers.link) {
		var links = headers.link.split(",");
		for (var elem in links) {
			if (links[elem].indexOf("rel=\"next\"") !== -1) {
				var linkRegex = /<(.*)>/;
				var link = linkRegex.exec(links[elem])[1];
				var parsedUrl = url.parse(link);
				return querystring.parse(parsedUrl.query);
			}
		}
	}
	return null;
};

module.exports.getNextLink = getNextLink;