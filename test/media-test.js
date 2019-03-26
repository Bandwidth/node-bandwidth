var nock = require("nock");
var stream = require("stream");
var fs = require("fs");
var path = require("path");
var os = require("os");
var sinon = require("sinon");
var CatapultClient = require("../index");

var baseUrl = "https://api.catapult.inetwork.com";

describe("Media API", function () {

	describe("global methods", function () {
		var client;

		var userId = "fakeUserId";
		var apiToken = "fakeApiToken";
		var apiSecret = "fakeapiSecret";

		var mediaName1 = "file1";
		var mediaName2 = "file2";
		var mediaContent = "1234567890";

		var getMediaContentAsStream = function () {
			var s = new stream.Readable();
			s.push(mediaContent);
			s.push(null);
			return s;
		};

		var mediaFileList = [
			{
				"contentLength" : 561276,
				"mediaName"     : "{mediaName1}",
				"content"       : "api.catapult.inetwork.com/.../media/{mediaName1}"
			}
		];

		var mediaContentFile = path.join(os.tmpdir(), "node-bandwidth-media-file.txt");

		before(function () {
			fs.writeFileSync(mediaContentFile, mediaContent);
			client = new CatapultClient({
				userId    : userId,
				apiToken  : apiToken,
				apiSecret : apiSecret

			});
			nock.disableNetConnect();

			nock("https://api.catapult.inetwork.com", {
				reqheaders : {
					"Content-Type" : "application/octet-stream"
				}
			})
				.persist()
				.put("/v1/users/" + userId + "/media/" + mediaName1)
				.reply(200);
			nock("https://api.catapult.inetwork.com", {
				reqheaders : {
					"Content-Type" : "text/plain"
				}
			})
				.persist()
				.put("/v1/users/" + userId + "/media/" + mediaName2, mediaContent)
				.reply(200);
			nock("https://api.catapult.inetwork.com")
				.persist()
				.get("/v1/users/" + userId + "/media/" + mediaName1)
				.reply(200, mediaContent, { "Content-Type" : "text/plain" })
				.get("/v1/users/" + userId + "/media")
				.reply(200, mediaFileList)
				.delete("/v1/users/" + userId + "/media/" + mediaName1)
				.reply(200);
		});

		after(function () {
			nock.cleanAll();
			nock.enableNetConnect();
			fs.unlinkSync(mediaContentFile);
		});

		it("should upload a media file (Buffer), Promise", function () {
			return client.Media.upload(mediaName1, new Buffer(mediaContent));
		});

		it("should upload a media file (Buffer) with content type, Promise", function () {
			return client.Media.upload(mediaName2, new Buffer(mediaContent), "text/plain");
		});

		it("should upload a media file (Buffer), callback", function (done) {
			client.Media.upload(mediaName1, new Buffer(mediaContent), done);
		});

		it("should upload a media file (Buffer) with content type, callback", function (done) {
			client.Media.upload(mediaName2, new Buffer(mediaContent), "text/plain", done);
		});

		it("should upload a media file (stream), Promise", function () {
			return client.Media.upload(mediaName1, getMediaContentAsStream());
		});

		it("should upload a media file (stream) with content type, Promise", function () {
			return client.Media.upload(mediaName2, getMediaContentAsStream(), "text/plain");
		});

		it("should upload a media file (file), Promise", function () {
			return client.Media.upload(mediaName1, mediaContentFile);
		});

		it("should upload a media file (file) with content type, Promise", function () {
			return client.Media.upload(mediaName2, mediaContentFile, "text/plain");
		});

		it("should throw error if uploaded data is invalid", function (done) {
			new Promise(function (resolve) {
				return client.Media.upload(mediaName1, {}, function (err) {
					err.should.be.ok;
					done();
				});
			});
		});

		it("should throw error if fs.stat failed", function (done) {
			new Promise(function (resolve) {
				var stub = sinon.stub(fs, "stat").callsArgWith(1, new Error());
				return client.Media.upload(mediaName1, mediaContent, function (err) {
					err.should.be.ok;
					stub.restore();
					done();
				});
			});
		});

		it("should download a media file", function () {
			return client.Media.download(mediaName1)
			.then(function (result) {
				result.contentType.should.eql("text/plain");
				result.content.toString().should.eql(mediaContent);
			});
		});

		it("should list media files", function () {
			return client.Media.list()
			.then(function (files) {
				files[0].should.eql(mediaFileList[0]);
			});
		});

		it("should remove a media file", function () {
			return client.Media.delete(mediaName1);
		});
	});
});
