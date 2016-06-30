var url = require("url");
var qs = require("qs");

/**
 * getNextLink
 * @function
 * @param {Object} response A response object returned from calling 'client.makeRequest'
 * @returns A parsed version of the link to the subsequent page, or null if no such page exists.
 */
var getNextLink = function (response) {
	if (response.headers.link) {
		var links = response.headers.link.split(",");
		for (var elem in links) {
			if (links[elem].indexOf("rel=\"next\"") !== -1) {
				var linkRegex = /<(.*)>/;
				var link = linkRegex.exec(links[elem])[1];
				var parsedUrl = url.parse(link);
				return qs.parse(parsedUrl.query);
			}
		}
	}
	return null;
};

module.exports.getNextLink = getNextLink;