function ConferenceMember(){}

var CONFERENCE_PATH = "conferences";

ConferenceMember.prototype.update = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CONFERENCE_PATH) + "/" + this.conferenceId + "/members/" + this.id, data, callback);
};

ConferenceMember.prototype.playAudio = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CONFERENCE_PATH) + "/" + this.conferenceId + "/members/" + this.id + "/audio", data, callback);
};
module.exports = ConferenceMember;
