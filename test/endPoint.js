"use strict";
var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var EndPoint = lib.EndPoint;

describe("EndPoint", function(){
  before(function(){
    nock.disableNetConnect();
    helper.setupGlobalOptions();
  });
  after(function(){
    nock.cleanAll();
    nock.enableNetConnect();
  });
  describe("#delete", function(){
    it("should remove an endpoint", function(done){
      helper.nock().delete("/v1/users/FakeUserId/domains/1/endpoints/10").reply(200);
      var endPoint = new EndPoint();
      endPoint.domainId = 1;
      endPoint.id = 10;
      endPoint.client = helper.createClient();
      endPoint.delete(done);
    });
  });
  describe("#createAuthToken - success", function(){
    it("should create an auth token", function(done){
      var tokenData = {
        token: '1234567890',
        expires: 86400
      };
      helper.nock().post("/v1/users/FakeUserId/domains/1/endpoints/10/tokens").reply(200, tokenData);
      var endPoint = new EndPoint();
      endPoint.domainId = 1;
      endPoint.id = 10;
      endPoint.client = helper.createClient();
      endPoint.createAuthToken(function(err, data){
        data.should.eql(tokenData);
        done(err);
      });
    });
  });
  describe("#createAuthToken - failure", function(){
    it("should fail", function(done){
      helper.nock().post("/v1/users/FakeUserId/domains/1/endpoints/10/tokens").reply(400);
      var endPoint = new EndPoint();
      endPoint.domainId = 1;
      endPoint.id = 10;
      endPoint.client = helper.createClient();
      endPoint.createAuthToken(function(err, data){
        err.should.not.eql(null);
        done();
      });
    });
  });
});
