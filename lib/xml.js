"use strict";
var builder = require("xmlbuilder");

/** Response type (root object) */
function Response(verbs){
  this.verbs = verbs || [];
}

/** Build xml string from resposne */
Response.prototype.toXml = function(){
  var response = {};
  if(this.verbs.length > 0){
    response["#list"] = this.verbs.map(function(v){return v.toXmlObject();});
  }
  var root = {"Response": response};
  return builder.create(root).end({pretty: true});
};

/** Add a verb to response */
Response.prototype.push = function(verb){
  this.verbs.push(verb);
};

function copyTo(data){
  var k;
  if(data){
    for(k in data){
      this[k] = data[k];
    }
  }
}

function removeEmptyKeys(obj){
  var result = {}, k, v;
  for(k in obj){
    v = obj[k];
    if(v){
      result[k] = (typeof v === "object")?removeEmptyKeys(v):v;
    }
  }
  return result;
}


/** Gather verb */
function Gather(data){
  copyTo.call(this, data);
}

Gather.prototype.toXmlObject = function(){
  debugger;
  return removeEmptyKeys({
   "Gather": {
     "@requestUrl": this.requestUrl,
     "@requestUrlTimeout": this.requestUrlTimeout,
     "@terminatingDigits": this.terminatingDigits,
     "@maxDigits": this.maxDigits,
     "@interDigitTimeout": this.interDigitTimeout,
     "@bargeable": this.bargeable
    }
 });
};


/** Hangup verb*/
function Hangup(){
}

Hangup.prototype.toXmlObject = function(){
  return {"Hangup": {}};
};


/** Pause verb */
function Pause(data){
  copyTo.call(this, data);
}

Pause.prototype.toXmlObject = function(){
  return removeEmptyKeys({
    "Pause":{
      "@duration": this.duration
    }
  });
};

/** PlayAudio verb */
function PlayAudio(data){
  copyTo.call(this, data);
}

PlayAudio.prototype.toXmlObject = function(){
  return removeEmptyKeys({
    "PlayAudio":{
      "@digits": this.digits,
      "#text": this.url
    }
  });
};

/** Record verb */
function Record(data){
  copyTo.call(this, data);
}

Record.prototype.toXmlObject = function(){
  return removeEmptyKeys({
    "Record":{
      "@requestUrl": this.requestUrl,
      "@requestUrlTimeout": this.requestUrlTimeout,
      "@terminatingDigits": this.terminatingDigits,
      "@maxDuration": this.maxDuration,
      "@transcribe": this.transcribe,
      "@transcribeCallbackUrl": this.transcribeCallbackUrl
    }
  });
};

/** Redirect verb */
function Redirect(data){
  copyTo.call(this, data);
}

Redirect.prototype.toXmlObject = function(){
  return removeEmptyKeys({
    "Redirect":{
      "@requestUrl": this.requestUrl,
      "@requestUrlTimeout": this.requestUrlTimeout
    }
  });
};

/** Reject verb */
function Reject(data){
  copyTo.call(this, data);
}

Reject.prototype.toXmlObject = function(){
  return removeEmptyKeys({
    "Reject":{
      "@reason": this.reason
    }
  });
};

/** SendMessage verb */
function SendMessage(data){
  copyTo.call(this, data);
}

SendMessage.prototype.toXmlObject = function(){
  return removeEmptyKeys({
    "SendMessage":{
      "@from": this.from,
      "@to": this.to,
      "@requestUrl": this.requestUrl,
      "@requestUrlTimeout": this.requestUrlTimeout,
      "@statusCallbackUrl": this.statusCallbackUrl,
      "#text": this.text
    }
  });
};

/** SpeakSentence verb */
function SpeakSentence(data){
  copyTo.call(this, data);
}

SpeakSentence.prototype.toXmlObject = function(){
  return removeEmptyKeys({
    "SpeakSentence":{
      "@voice": this.voice,
      "@locale": this.locale,
      "@gender": this.gender,
      "#text": this.sentence
    }
  });
};

/** Transfer verb */
function Transfer(data){
  copyTo.call(this, data);
}

Transfer.prototype.toXmlObject = function(){
  var speakSentence;
  if(this.speakSentence){
    speakSentence = ((this.speakSentence instanceof SpeakSentence)?this.speakSentence:new SpeakSentence(this.speakSentence))
      .toXmlObject()["SpeakSentence"];
  }
  return removeEmptyKeys({
    "Transfer":{
      "@transferTo": this.transferTo,
      "@transferCallerId": this.transferCallerId,
      "SpeakSentence": speakSentence
    }
  });
};

module.exports = {
  Response: Response,
  Gather: Gather,
  Hangup: Hangup,
  Pause: Pause,
  PlayAudio: PlayAudio,
  Record: Record,
  Redirect: Redirect,
  Reject: Reject,
  SendMessage: SendMessage,
  SpeakSentence: SpeakSentence,
  Transfer: Transfer
};
