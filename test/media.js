var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Media = lib.Media;

describe("Account", function(){
  before(function(){
    nock.disableNetConnect();
    helper.setupGlobalOptions();
  });
  after(function(){
    nock.cleanAll();
    nock.enableNetConnect();
  });
  describe("#list", function(){
    var items = [
      {mediaName: "file1", content: "url1", contentLength: 100},
      {mediaName: "file2", content: "url2", contentLength: 200}
    ];
    it("should return list of files", function(done){
      helper.nock().get("/v1/users/FakeUserId/media?page=1").reply(200, items);
      Media.list(helper.createClient(), {page: 1}, function(err, list){
        if(err){
          return done(err);
        }
        list.should.eql(items);
        done();
      });
    });
    it("should return account info (with default client)", function(done){
      helper.nock().get("/v1/users/FakeUserId/media?page=1").reply(200, items);
      Media.list({page: 1}, function(err, list){
        if(err){
          return done(err);
        }
        list.should.eql(items);
        done();
      });
    });
    it("should return list of files (without query)", function(done){
      helper.nock().get("/v1/users/FakeUserId/media").reply(200, items);
      Media.list(helper.createClient(), function(err, list){
        if(err){
          return done(err);
        }
        list.should.eql(items);
        done();
      });
    });
    it("should return account info (with default client, without query)", function(done){
      helper.nock().get("/v1/users/FakeUserId/media").reply(200, items);
      Media.list(function(err, list){
        if(err){
          return done(err);
        }
        list.should.eql(items);
        done();
      });
    });
  });
});
