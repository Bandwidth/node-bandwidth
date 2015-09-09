var fs = require("fs");
var os = require("os");
var path = require("path");
var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Media = lib.Media;

var tmpFile = path.join(os.tmpdir(), "dest.txt");

describe("Media", function () {
	before(function () {
		nock.disableNetConnect();
		helper.setupGlobalOptions();
	});

	after(function () {
		nock.cleanAll();
		nock.enableNetConnect();
	});

	describe("#list", function () {
		var items = [
			{ mediaName : "file1", content : "url1", contentLength : 100 },
			{ mediaName : "file2", content : "url2", contentLength : 200 } ];

		it("should return list of files", function (done) {
			helper.nock().get("/v1/users/FakeUserId/media?page=1").reply(200, items);
			Media.list(helper.createClient(), { page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return account info (with default client)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/media?page=1").reply(200, items);
			Media.list({ page : 1 }, function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return list of files (without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/media").reply(200, items);
			Media.list(helper.createClient(), function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});

		it("should return account info (with default client, without query)", function (done) {
			helper.nock().get("/v1/users/FakeUserId/media").reply(200, items);
			Media.list(function (err, list) {
				if (err) {
					return done(err);
				}

				list.should.eql(items);
				done();
			});
		});
	});

	describe("#delete", function () {
		it("should delete file from the server", function (done) {
			helper.nock().delete("/v1/users/FakeUserId/media/fileName").reply(200);
			Media.delete(helper.createClient(), "fileName", done);
		});

		it("should delete file from the server (with default client)", function (done) {
			helper.nock().delete("/v1/users/FakeUserId/media/fileName").reply(200);
			Media.delete("fileName", done);
		});
	});

	describe("#getInfo", function () {
		it("should get info on file from server", function (done) {
			helper.nock().head("/v1/users/FakeUserId/media/file1").reply(200, "OK", { "Content-Length" : 100 });
			Media.getInfo(helper.createClient(), "file1", function (err, result) {
				if (err) {
					return done(err);
				}

				result.contentLength.should.eql(100);
				done();
			});
		});

		it("should get info on file from server (with default client)", function (done) {
			helper.nock().head("/v1/users/FakeUserId/media/file1").reply(200, "OK", { "Content-Length" : 100 });
			Media.getInfo("file1", function (err, result) {
				if (err) {
					return done(err);
				}

				result.contentLength.should.eql(100);
				done();
			});
		});

		it("should error on getting info on non existing file", function (done) {
			helper.nock().head("/v1/users/FakeUserId/media/nonexistingfile").reply(404);
			Media.getInfo("nonexistingfile", function (err, result) {
				err.httpStatus.should.eql(404);
				done();
			});
		});
	});

	describe("#getContents", function () {
		it("should get contents for a file from server", function (done) {
			var contents = "somecontents";
			var length = contents.length;
			helper.nock().get("/v1/users/FakeUserId/media/file1").reply(200, contents, {
				"Content-Type" : "text/plain"
			});
			Media.getContents(helper.createClient(), "file1", function (err, result) {
				if (err) {
					return done(err);
				}

				result.contentLength.should.eql(length);
				result.contentType.should.eql("text/plain");
				result.contentBody.should.eql(new Buffer(contents));
				done();
			});
		});
		it("should get contents for a file from server (with default client)", function (done) {
			var contents = "somecontents";
			var length = contents.length;
			helper.nock().get("/v1/users/FakeUserId/media/file1").reply(200, contents, { "Content-Type" : "text/plain" });
			Media.getContents("file1", function (err, result) {
				if (err) {
					return done(err);
				}

				result.contentLength.should.eql(length);
				result.contentType.should.eql("text/plain");
				result.contentBody.should.eql(new Buffer(contents));
				done();
			});
		});
		it("should get return error if there is an error", function (done) {
			var contents = "somecontents";
			var length = contents.length;
			Media.getContents("file1", function (err, result) {
				if (err) {
					return done();
				}
				else {
					return done(new Error("should have returned an error"));
				}
			});
		});
	});

	describe("#download", function () {
		beforeEach(function () {
			helper.nock().get("/v1/users/FakeUserId/media/fileName").reply(200, "12345", { "Content-Type" : "text/plain" });
		});

		after(function (done) {
			nock.cleanAll();
			done();
		});
		it("should fail to download the file", function (done) {
			var stream = Media.download(helper.createClient(), "fileName", {});
			done();
		});
	});
	describe("#download", function () {
		beforeEach(function () {
			helper.nock().get("/v1/users/FakeUserId/media/fileName").reply(200, "12345", { "Content-Type" : "text/plain" });
		});

		afterEach(function (done) {
			nock.cleanAll();
			fs.unlink(tmpFile, done);
		});

		it("should download file to destination file", function (done) {
			var stream = Media.download(helper.createClient(), "fileName", tmpFile);
			stream.on("finish", function () {
				fs.readFile(tmpFile, "utf8", function (err, text) {
					if (err) {
						done(err);
					}

					text.should.equal("12345");
					done();
				});
			});
		});

		it("should download file to destination file (with default client)", function (done) {
			var stream = Media.download("fileName", tmpFile);
			stream.on("finish", function () {
				fs.readFile(tmpFile, "utf8", function (err, text) {
					if (err) {
						done(err);
					}

					text.should.equal("12345");
					done();
				});
			});
		});

		it("should download file to destination stream", function (done) {
			var outputStream = fs.createWriteStream(tmpFile);
			var stream = Media.download(helper.createClient(), "fileName", outputStream);
			stream.on("finish", function () {
				fs.readFile(tmpFile, "utf8", function (err, text) {
					if (err) {
						done(err);
					}

					text.should.equal("12345");
					done();
				});
			});
		});

		it("should download file to destination stream (with default client)", function (done) {
			var outputStream = fs.createWriteStream(tmpFile);
			var stream = Media.download("fileName", outputStream);
			stream.on("finish", function () {
				fs.readFile(tmpFile, "utf8", function (err, text) {
					if (err) {
						done(err);
					}

					text.should.equal("12345");
					done();
				});
			});
		});

		it("should allow access to request", function (done) {
			var outputStream = fs.createWriteStream(tmpFile);
			var stream = Media.download(helper.createClient(), "fileName").pipe(outputStream);
			stream.on("finish", function () {
				fs.readFile(tmpFile, "utf8", function (err, text) {
					if (err) {
						done(err);
					}

					text.should.equal("12345");
					done();
				});
			});
		});

		it("should allow access to request (with default client)", function (done) {
			var outputStream = fs.createWriteStream(tmpFile);
			var stream = Media.download("fileName").pipe(outputStream);
			stream.on("finish", function () {
				fs.readFile(tmpFile, "utf8", function (err, text) {
					if (err) {
						done(err);
					}

					text.should.equal("12345");
					done();
				});
			});
		});
	});

	describe("#upload", function () {
		before(function (done) {
			fs.writeFile(tmpFile, "12345", "utf8", done);
		});

		beforeEach(function () {
			helper.nock().put("/v1/users/FakeUserId/media/fileName", "12345", { "Content-Type" : "text/plain" }).reply(200);
		});

		it("should upload file to the server", function (done) {
			Media.upload(helper.createClient(), "fileName", tmpFile, "text/plain", done);
		});

		it("should upload file to the server (with default client)", function (done) {
			Media.upload("fileName", tmpFile, "text/plain", done);
		});

		it("should upload file to the server (without media type)", function (done) {
			helper.nock().put("/v1/users/FakeUserId/media/fileName", "12345",
				{ "Content-Type" : "application/octet-stream" }).reply(200);
			Media.upload(helper.createClient(), "fileName", tmpFile, done);
		});

		it("should upload file to the server (with default client, without media type)", function (done) {
			helper.nock().put("/v1/users/FakeUserId/media/fileName", "12345",
				{ "Content-Type" : "application/octet-stream" }).reply(200);
			Media.upload("fileName", tmpFile, done);
		});

		it("should upload stream to the server", function (done) {
			Media.upload(helper.createClient(), "fileName", fs.createReadStream(tmpFile), "text/plain", done);
		});

		it("should upload buffer to the server", function (done) {
			Media.upload(helper.createClient(), "fileName", new Buffer("12345", "utf8"), "text/plain", done);
		});

		it("should fail for invalid data to upload", function (done) {
			Media.upload(helper.createClient(), "fileName", { data : 1 }, "text/plain", function (err) {
				if (err) {
					return done();
				}

				done(new Error("An error is expected"));
			});
		});
	});
});
