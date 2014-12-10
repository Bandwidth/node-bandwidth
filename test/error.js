var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Error = lib.Error;

describe("Error", function(){
  before(function(){
    nock.disableNetConnect();
    helper.setupGlobalOptions();
  });
  after(function(){
    nock.cleanAll();
    nock.enableNetConnect();
  });
  describe("#get", function(){
    var item = {
      id: "100",
      message: "prepay",
      category: "bad_request"
    };
    it("should return error info", function(done){
      helper.nock().get("/v1/users/FakeUserId/errors/100").reply(200, item);
      Error.get(helper.createClient(), "100", function(err, i){
        if(err){
          return done(err);
        }
        i.should.eql(item);
        done();
      });
    });
    it("should return error info (with default client)", function(done){
      helper.nock().get("/v1/users/FakeUserId/errors/100").reply(200, item);
      Error.get("100", function(err, i){
        if(err){
          return done(err);
        }
        i.should.eql(item);
        done();
      });
    });
  });
  describe("#list", function(){
    var items = [
      {id: 1, message: "error1"},
      {id: 2, message: "error2"}
    ];
    it("should return errors", function(done){
      helper.nock().get("/v1/users/FakeUserId/errors?page=1").reply(200, items);
      Error.list(helper.createClient(), {page: 1}, function(err, list){
        if(err){
          return done(err);
        }
        list.should.eql(items);
        done();
      });
    });
    it("should return transactions (with default client)", function(done){
      helper.nock().get("/v1/users/FakeUserId/errors?page=1").reply(200, items);
      Error.list({page: 1}, function(err, list){
        if(err){
          return done(err);
        }
        list.should.eql(items);
        done();
      });
    });
    it("should return transactions (without query)", function(done){
      helper.nock().get("/v1/users/FakeUserId/errors").reply(200, items);
      Error.list(helper.createClient(), function(err, list){
        if(err){
          return done(err);
        }
        list.should.eql(items);
        done();
      });
    });
    it("should return transactions (with default client, without query)", function(done){
      helper.nock().get("/v1/users/FakeUserId/errors").reply(200, items);
      Error.list(function(err, list){
        if(err){
          return done(err);
        }
        list.should.eql(items);
        done();
      });
    });
  });
});
