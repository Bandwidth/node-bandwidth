"use strict";
function ConferenceMember(){}

var CONFERENCE_PATH = "conferences";

/** Update a conference member. E.g.: remove from call, mute, hold, etc.
 * @param data changed data
 * @param callback callback function
 * @example
 * conferenceMember.update({mute: true}, function(err){});
 * */
ConferenceMember.prototype.update = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CONFERENCE_PATH) + "/" + this.conferenceId + "/members/" + this.id, data, callback);
};

/** Play an audio/speak a sentence to a conference member.
 * @param data audio data
 * @param callback callback function
 * @example
 * conferenceMember.playAudio({fileUrl: "http://host1"}, function(err){});
 * */
ConferenceMember.prototype.playAudio = function(data, callback){
  this.client.makeRequest("post", this.client.concatUserPath(CONFERENCE_PATH) + "/" + this.conferenceId + "/members/" + this.id + "/audio", data, callback);
};
module.exports = ConferenceMember;
