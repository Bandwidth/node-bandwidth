"use strict";
var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var EndPoint = lib.EndPoint;

describe("EndPoint", function(){
  before(function(){
    nock.disableNetConnect();
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
});
