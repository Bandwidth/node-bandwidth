var Promise = require("bluebird");
var stream = require("stream");
var fs = require("fs");
var request = require("request");

function getReadStreamData(data) {
	return new Promise(function (resolve, reject) {
		var s;
		if (data instanceof Buffer) {
			s = new stream.Readable();
			s.push(data);
			s.push(null);
			return resolve({ stream : s, size : data.length });
		}
		if (typeof data === "string") {
			return fs.stat(data, function (err, stat) {
				if (err) {
					return reject(err);
				}
				resolve({ stream : fs.createReadStream(data), size : stat.size });
			});
		}
		if (data instanceof stream.Readable) {
			// we have to detect stream size first
			var size = 0;
			s = new stream.Readable(); // new stream in memory to store data from original stream
			data.on("data", function (buffer) {
				s.push(buffer);
				size += buffer.length;
			});
			data.on("end", function () {
				s.push(null);
				resolve({ stream : s, size : size });
			});
			data.resume();
			return;
		}
		reject(new Error("data should be string, Buffer or readable stream"));
	});
}

/**
 * Media
 * @constructor
 */
var Media = function (client) {
	/**
	 * Upload a media file
	 * @param {String} name The name of uploaded file.
	 * @param {String|Buffer|Readable} data Data to upload. If data is string it should be path to file to upload.
	 * @param {String} contentType Optional MIME type of uploaded data (default: application/octet-stream).
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 */
	this.upload = function (name, data, contentType, callback) {
		if (!callback && typeof contentType === "function") {
			callback = contentType;
			contentType = null;
		}
		return getReadStreamData(data)
			.then(function (streamData) {
				return new Promise(function (resolve, reject) {
					var req = request(
						client.createRequestOptions({
							path   : encodeURI("media/" + name),
							method :  "PUT"
						})
					);
					req.headers["Content-Type"] =
						contentType || "application/octet-stream";
					req.headers["Content-Length"] = streamData.size;
					req.on("error", reject);
					req.on("response", resolve);
					streamData.stream.pipe(req);
				});
			})
			.then(client.handleResponse)
			.asCallback(callback);
	};

	/**
	 * Download a media file
	 * @param {String} name The name of downloaded file.
	 * @param {String/null/Function} [encoding='binary'] The encoding that will be passed onto makeRequest,
		if null content will be a Buffer.  If function is passed, it will be the callback
	 * @param {Function} [callback] Callback for the operation
	 * @return {DownloadMediaFileResponse} A promise for the operation
	 */
	this.download = function (name, encoding, callback) {

		if(typeof encoding === "function") {
			callback = encoding;
			encoding = "binary";
		}

		return client.makeRequest({
			path     : encodeURI("media/" + name),
			method   : "GET",
			encoding : encoding
		})
		.then(function (response) {
			return {
				contentType : response.headers["content-type"],
				content     : response.body
			};
		})
		.asCallback(callback);
	};

	/**
	 * Gets a list of your media files.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Array<MediaFileResponse>} A promise for the operation
	 */
	this.list = function (callback) {
		return client
			.makeRequest({
				path   : "media",
				method : "GET"
			})
			.then(function (response) {
				return response.body;
			})
			.asCallback(callback);
	};

	/**
	 * Remove a media file
	 * @param {String} name The name of file to remove.
	 * @param {Function} [callback] Callback for the operation
	 * @return {Promise} A promise for the operation
	 */
	this.delete = function (name, callback) {
		return client
			.makeRequest({
				path   : encodeURI("media/" + name),
				method : "DELETE"
			})
			.asCallback(callback);
	};
};

module.exports = Media;
/**
 * @class DownloadMediaFileResponse
 * @type {Object}
 * @property {String} contentType MIME type of downloaded file.
 * @property {String|Buffer|Readable} content Content of file.
 */

/**
 * @class MediaFileResponse
 * @type {Object}
 * @property {String} mediaName name of media file.
 * @property {Number} contentLength Length of media file.
 */
