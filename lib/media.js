var Client = require("./client");
var fs = require("fs");
var superagent = require("superagent");
var errors = require("./errors");
var MEDIA_PATH = "media";

function sendFile(request, file, mediaType, callback) {
	var stream = null;
	request.buffer().type(mediaType || "application/octet-stream");
	if (typeof file === "string") {
		stream = fs.createReadStream(file);
	}
	else if (Buffer.isBuffer(file)) {
		request.set("Content-Length", file.length);
		request.write(file);
		request.end(callback);
		return;
	}
	else if (typeof file.pipe === "function" && typeof file.read === "function" && typeof file.on === "function") {
		stream = file;
	}
	if (stream) {
		//  request.on("response") sometimes could not be called
		request.req.on("response", function (res) {
			request.res = res;
			var response = new superagent.Response(request);
			callback(response);
		});
		stream.pipe(request);
		return;
	}

	callback({ statusCode : 400, text : "Invalid data to send", body : { message : "Invalid data to send" } });
}

module.exports = {
	/**
	 * Get a list of your media files
	 * @param client Client instance
	 * @param query query parameters
	 * @param callback callback function
	 * @example
	 * bandwidth.Media.list(client, function(err, list){});
	 */
	list : function (client, query, callback) {
		if (arguments.length === 1) {
			callback = client;
			client = new Client();
		}
		else if (arguments.length === 2) {
			callback = query;
			if (client instanceof Client) {
				query = {};
			}
			else {
				query = client;
				client = new Client();
			}
		}

		client.makeRequest("get", client.concatUserPath(MEDIA_PATH), query, callback);
	},

	/**
	 * Uploads a media file (or stream, or buffer) to the name you choose
	 * @param client Client instance
	 * @param name file name
	 * @param mediaTypr media type of file
	 * @param callback callback function
	 * @example
	 * bandwidth.Media.upload(client, "file.pdf", stream, "application/pdf", function(err){});
	 */
	upload : function (client, name, data, mediaType, callback) {
		if (arguments.length === 3) {
			callback = data;
			data = name;
			name = client;
			client = new Client();
			mediaType = null;
		}
		else if (arguments.length === 4) {
			callback = mediaType;
			if (client instanceof Client) {
				mediaType = null;
			}
			else {
				mediaType = data;
				data = name;
				name = client;
				client = new Client();
			}
		}

		var request = client.createRequest("put", client.concatUserPath(MEDIA_PATH) + "/" + encodeURIComponent(name));
		sendFile(request, data, mediaType, function (res) {
			client.checkResponse(res, callback);
		});
	},

	/**
	 * Downloads a media file you uploaded to given destination(file or stream)
	 * @param client Client instance
	 * @param name file name
	 * @param destination file name or stream to write downloaded file
	 * @returns request object
	 * @example
	 * bandwidth.Media.download(client, "file1.pdf", "/tmp/file1.pdf").end(function(err, res){});
	 */
	download : function (client, name, destination) {
		if (arguments.length <= 2) {
			if (client instanceof Client) {
				destination = null;
			}
			else {
				destination = name;
				name = client;
				client = new Client();
			}
		}

		var request = client.createRequest("get", client.concatUserPath(MEDIA_PATH) + "/" + encodeURIComponent(name));
		if (destination) {
			var stream = null;
			if (typeof destination === "string") {
				stream = fs.createWriteStream(destination);
			}
			else if (typeof destination.write === "function") {
				stream = destination;
			}

			if (stream) {
				return request.pipe(stream);
			}
		}

		return request;
	},

	/**
	 * Permanently deletes a media file you uploaded
	 * @param client Client instance
	 * @param name file name
	 * @param callback callback function
	 * @example
	 * bandwidth.delete(client, "file1.pdf", function(err){});
	 */
	delete : function (client, name, callback) {
		if (arguments.length === 2) {
			callback = name;
			name = client;
			client = new Client();
		}

		client.makeRequest("del", client.concatUserPath(MEDIA_PATH) + "/" + encodeURIComponent(name), callback);
	},

	/**
	 * Get information about a media file
	 * @param client Client instance
	 * @param name file name
	 * @param callback
	 * @example
	 * bandwidth.Media.getInfo(client, "file1.wav", function(err, res){});
	 */
	getInfo : function (client, name, callback) {
		if (arguments.length === 2) {
			callback = name;
			name = client;
			client = new Client();
		}

		var request = client.createRequest("head", client.concatUserPath(MEDIA_PATH) + "/" + encodeURIComponent(name));
		request.end(function (err, res) {
			if (res.ok) {
				return callback(null,
					{
						contentType   : res.type,
						contentLength : res.header["content-length"]
					});
			}

			return callback(new errors.BandwidthError("Http code " + res.status, res.status));
		});
	},

	/**
	 * Get a media file binary contents
	 * @param client Client instance
	 * @param name file name
	 * @param callback
	 * @example
	 * bandwidth.Media.getContents(client, "file1.wav", function(err, res){});
	 */
	getContents : function (client, name, callback) {
		if (arguments.length === 2) {
			callback = name;
			name = client;
			client = new Client();
		}
		var path = client.concatUserPath(MEDIA_PATH) + "/" + encodeURIComponent(name);
		client.rawGetRequest(path)
			.on("error", function (err) {
				callback(err, null);
			})
			.on("response", function (res) {
				var buf = [];
				res.on("data", function (chunk) {
					buf.push(chunk);
				});
				res.on("end", function () {
					var data = Buffer.concat(buf);
					callback(null, {
						contentType   : res.headers["content-type"].split(";")[0],
						contentLength : data.length,
						contentBody   : data
					});
				});
			});
	}
};
