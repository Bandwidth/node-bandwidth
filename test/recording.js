var lib = require("../");
var helper = require("./helper");
var nock = require("nock");
var Recording = lib.Recording;

describe("Recording", function(){
  before(function(){
    nock.disableNetConnect();
    helper.setupGlobalOptions();
  });
  after(function(){
    nock.cleanAll();
    nock.enableNetConnect();
  });
  describe("#list", function(){
    var items = [{
        id: "1",
        call: "call1",
        media: "media1",
      },{
        id: "2",
        call: "call2",
        media: "media2",
      }
    ];
    it("should return list of recordings", function(done){
      helper.nock().get("/v1/users/FakeUserId/recordings?page=1").reply(200, items);
      Recording.list(helper.createClient(), {page: 1}, function(err, list){
        if(err){
          return done(err);
        }
        list.forEach(function(i){delete i.client;});
        list.should.eql(items);
        done();
      });
    });
    it("should return list of recordings (with default client)", function(done){
      helper.nock().get("/v1/users/FakeUserId/recordings?page=1").reply(200, items);
      Recording.list({page: 1}, function(err, list){
        if(err){
          return done(err);
        }
        list.forEach(function(i){delete i.client;});
        list.should.eql(items);
        done();
      });
    });
    it("should return list of recordings (without query)", function(done){
      helper.nock().get("/v1/users/FakeUserId/recordings").reply(200, items);
      Recording.list(helper.createClient(),  function(err, list){
        if(err){
          return done(err);
        }
        list.forEach(function(i){delete i.client;});
        list.should.eql(items);
        done();
      });
    });
    it("should return list of recordings (with default client, without query)", function(done){
      helper.nock().get("/v1/users/FakeUserId/recordings").reply(200, items);
      Recording.list(function(err, list){
        if(err){
          return done(err);
        }
        list.forEach(function(i){delete i.client;});
        list.should.eql(items);
        done();
      });
    });
    it("should fail if request failed", function(done){
      helper.nock().get("/v1/users/FakeUserId/recordings").reply(500);
      Recording.list(helper.createClient(),  function(err, list){
        if(err){
          return done();
        }
        done(new Error("An error is estimated"));
      });
    });
  });
  describe("#get", function(){
    var item = {
        id: "1",
        call: "call1",
        media: "media1"
    };
    it("should return a recording", function(done){
      helper.nock().get("/v1/users/FakeUserId/recordings/1").reply(200, item);
      Recording.get(helper.createClient(), "1", function(err, i){
        if(err){
          return done(err);
        }
        delete i.client;
        i.should.eql(item);
        done();
      });
    });
    it("should return a recording (with default client)", function(done){
      helper.nock().get("/v1/users/FakeUserId/recordings/1").reply(200, item);
      Recording.get("1", function(err, i){
        if(err){
          return done(err);
        }
        delete i.client;
        i.should.eql(item);
        done();
      });
    });
    it("should fail on remote request failing", function(done){
      helper.nock().get("/v1/users/FakeUserId/recordings/1").reply(500);
      Recording.get(helper.createClient(), "1", function(err){
        if(err){
          return done();
        }
        done(new Error("An error is estimated"));
      });
    });
  });
});
