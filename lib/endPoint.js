var DOMAIN_PATH = "domains";
var ENDPOINT_PATH = "endpoints";

function EndPoint() {
}

/**
 * Delete a endPoint.
 * @param callback callback
 * @example
 * endPoint.delete(function(err){});
 */
EndPoint.prototype.delete = function (callback) {
	var path =  this.client.concatUserPath(DOMAIN_PATH) + "/" + this.domainId + "/" + ENDPOINT_PATH + "/" + this.id;
	this.client.makeRequest("del", path, callback);
};

/**
 * Create an auth token
 * @param callback callback
 * @example
 * endPoint.createAuthToken(function(err, token){})
 */
EndPoint.prototype.createAuthToken = function (callback) {
	var self = this;
	var path = this.client.concatUserPath(DOMAIN_PATH) + "/" + this.domainId + "/" +
		ENDPOINT_PATH + "/" + this.id + "/tokens";
	var request = self.client.createRequest("post", path);
	request.type("json").send(null).end(function (res) {
		if (res.ok) {
			callback(null, res.body);
		}
		else {
			self.client.checkResponse(res, callback);
		}
	});
};

/**
 * Update endpoint with data
 * @param data JSON Object with new values
 * @param callback callback
 * @example
 * endPoint.update({enabled: "false"}, function(err, res){})
 */
EndPoint.prototype.update = function (data, callback) {
	var self = this;
	var path =  self.client.concatUserPath(DOMAIN_PATH) + "/" + self.domainId + "/" + ENDPOINT_PATH + "/" + self.id;
	self.client.makeRequest("post", path, data, callback);
};

module.exports = EndPoint;
