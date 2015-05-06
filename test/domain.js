"use strict";
var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Domain = lib.Domain;

describe("Domain", function(){
  before(function(){
    nock.disableNetConnect();
  });
  after(function(){
    nock.cleanAll();
    nock.enableNetConnect();
  });
  describe("#list", function(){
    var items = [
    {
        id: "1",
        name: "domain1"
    },
    {
        id: "2",
        name: "domain2"
    }
    ];
    it("should return domains", function(done){
      helper.nock().get("/v1/users/FakeUserId/domains").reply(200, items);
      Domain.list(helper.createClient(), function(err, list){
        if(err){
          return done(err);
        }
        list.forEach(function(i){ delete i.client;});
        list.should.eql(items);
        done();
      });
    });
    it("should fail on remote request failing", function(done){
      helper.nock().get("/v1/users/FakeUserId/domains").reply(500);
      Domain.list(helper.createClient(),  function(err){
        if(err){
          return done();
        }
        done(new Error("An error is estimated"));
      });
    });
  });
  describe("#create", function(){
    var item = {
        id: "1",
        name: "domain1",
        description: "description1"
    };
    var data = {
        name: "domain1",
        description: "description1"
    };
    it("should create a domain", function(done){
      helper.nock().post("/v1/users/FakeUserId/domains", data).reply(201, "", {"Location": "/v1/users/FakeUserId/domains/1"});
      helper.nock().get("/v1/users/FakeUserId/domains/1").reply(200, item);
      Domain.create(helper.createClient(), data,  function(err, i){
        if(err){
          return done(err);
        }
        delete i.client;
        i.should.eql(item);
        done();
      });
    });
    it("should fail on remote request failing", function(done){
      helper.nock().post("/v1/users/FakeUserId/domains").reply(500);
      Domain.create(helper.createClient(), data, function(err){
        if(err){
          return done();
        }
        done(new Error("An error is estimated"));
      });
    });
  });
  describe("#delete", function(){
    it("should remove a domain", function(done){
      helper.nock().delete("/v1/users/FakeUserId/domains/1").reply(200);
      var domain = new Domain();
      domain.id = 1;
      domain.client = helper.createClient();
      domain.delete(done);
    });
  });

  describe("#getEndPoints", function(){
    var items = [{id: 1}, {id: 2}];
    it("should return list of endPoints", function(done){
      helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints").reply(200, items);
      var domain = new Domain();
      domain.id = 1;
      domain.client = helper.createClient();
      domain.getEndPoints(function(err, list){
        if(err){
          return done(err);
        }
        list.forEach(function(i){delete i.client; delete i.domainId;});
        list.should.eql(items);
        done();
      });
    });
    it("should fila on request error", function(done){
      helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints").reply(400);
      var domain = new Domain();
      domain.id = 1;
      domain.client = helper.createClient();
      domain.getEndPoints(function(err, list){
        if(err){
          return done();
        }
        done(new Error("An error is estimated"));
      });
    });
  });

  describe("#getEndPoint", function(){
    var item = {id: 10};
    it("should return an endpoint", function(done){
      helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints/10").reply(200, item);
      var domain = new Domain();
      domain.id = 1;
      domain.client = helper.createClient();
      domain.getEndPoint("10", function(err, i){
        if(err){
          return done(err);
        }
        delete i.client;
        delete i.domainId;
        i.should.eql(item);
        done();
      });
    });
    it("should fail on request error", function(done){
      helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints/10").reply(400);
      var domain = new Domain();
      domain.id = 1;
      domain.client = helper.createClient();
      domain.getEndPoint("10", function(err, list){
        if(err){
          return done();
        }
        done(new Error("An error is estimated"));
      });
    });
  });
  describe("#createEndPoint", function(){
    var item = {
        id: "1"
    };
    var data = {
        name: "point1"
    };
    it("should create an endpoint", function(done){
      helper.nock().post("/v1/users/FakeUserId/domains/1/endpoints", data).reply(201, "", {"Location": "/v1/users/FakeUserId/domains/1/endpoints/10"});
      helper.nock().get("/v1/users/FakeUserId/domains/1/endpoints/10").reply(200, item);
      var domain = new Domain();
      domain.id = 1;
      domain.client = helper.createClient();
      domain.createEndPoint(data, function(err, i){
        if(err){
          return done(err);
        }
        delete i.client;
        delete i.domainId;
        i.should.eql(item);
        done();
      });
    });
    it("should fail on remote request error", function(done){
      helper.nock().post("/v1/users/FakeUserId/domains/1/endpoints").reply(500);
      var domain = new Domain();
      domain.id = 1;
      domain.client = helper.createClient();
      domain.createEndPoint(data, function(err){
        if(err){
          return done();
        }
        done(new Error("An error is estimated"));
      });
    });
  });
  describe("#deleteEndPoint", function(){
    it("should delete an endPoint", function(done){
      helper.nock().delete("/v1/users/FakeUserId/domains/1/endpoints/10").reply(200);
      var domain = new Domain();
      domain.id = 1;
      domain.client = helper.createClient();
      domain.deleteEndPoint("10", done);
    });
  });
});
