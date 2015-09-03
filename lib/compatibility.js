//Obsolete functions support'
/* istanbul ignore next: untestable */
function obsolete(func, detail) {
	var nodeEnv = process.env.NODE_ENV || "development";
	if (nodeEnv === "development") {
		console.warn("Obsolete " + func + "(): Use "  + detail + " instead of it.");
	}
}

module.exports = function (lib) {
	var details = {
		sendCall                : "Call.create()",
		changeCall              : "call.update()",
		startRecording          : "call.recordingOn()",
		stopRecording           : "call.recordingOff()",
		getRecording            : "Recording.get()",
		getRecordings           : "call.getRecordings()",
		transferCall            : "call.update()",
		hangUp                  : "call.hangUp()",
		getCall                 : "Call.get()",
		playCallAudio           : "call.playAudio()",
		sendMessage             : "Message.create()",
		getMessage              : "Message.get()",
		getMessages             : "Message.list()",
		getAvailableNumbers     : "AvailableNumber.searchTollFree() or AvailableNumber.searchToLocal()",
		acquirePhoneNumber      : "PhoneNumber.create()",
		getPhoneNumber          : "PhoneNumber.get()",
		getPhoneNumbers         : "PhoneNumber.list()",
		deletePhoneNumber       : "phoneNumber.delete()",
		updatePhoneNumber       : "phoneNumber.update()",
		getApplications         : "Application.list()",
		portIn                  : "Iris API",
		uploadLOA               : "Iris API",
		getPortInState          : "Iris API",
		checkPortInAvailability : "Iris API"
	};

	var obsoleteFunctions = {
		sendCall : function (call, callback) {
			lib.Call.create(this, call, callback);
		},

		changeCall : function (callId, data, callback) {
			var call = new lib.Call();
			call.id = callId;
			call.client = this;
			call.update(data, callback);
		},

		hangUp : function (callId, callback) {
			this.changeCall(callId, { state : "completed" }, callback);
		},

		startRecording : function (callId, callback) {
			this.changeCall(callId, { recordingEnabled : true }, callback);
		},

		stopRecording :  function (callId, callback) {
			this.changeCall(callId, { recordingEnabled : false }, callback);
		},

		getRecording : function (recordingId, callback) {
			lib.Recording.get(this, recordingId, callback);
		},

		getRecordings : function (callId, callback) {
			var call = new lib.Call();
			call.id = callId;
			call.client = this;
			call.getRecordings(callback);
		},

		transferCall : function (callTransfer, callback) {
			var callId = callTransfer.call.id;
			delete callTransfer.call;
			var call = new lib.Call();
			call.id = callId;
			call.client = this;
			call.update(callTransfer, callback);
		},

		getCall : function (callId, callback) {
			lib.Call.get(this, callId, callback);
		},

		playCallAudio : function (callAudio, callback) {
			var callId = callAudio.callId;
			delete callAudio.callId;
			var call = new lib.Call();
			call.id = callId;
			call.client = this;
			call.playAudio(callAudio, callback);
		},

		sendMessage : function (message, callback) {
			lib.Message.create(this, message, callback);
		},

		getMessage : function (messageId, callback) {
			lib.Message.get(this, messageId, callback);
		},

		getMessages : function (callback) {
			lib.Message.list(this, callback);
		},

		getAvailableNumbers : function (parameters, callback) {
			var search = lib.AvailableNumber[(parameters.numberType === "tollFree")?"searchTollFree":"searchLocal"];
			delete parameters.numberType;
			search(this, parameters, callback);
		},

		acquirePhoneNumber : function (phoneNumber, callback) {
			lib.PhoneNumber.create(this, phoneNumber, callback);
		},

		getPhoneNumber : function (numberId, callback) {
			lib.PhoneNumber.get(this, numberId, callback);
		},

		getPhoneNumbers : function (callback) {
			lib.PhoneNumber.list(this, callback);
		},

		deletePhoneNumber : function (numberId, callback) {
			var number = new lib.PhoneNumber();
			number.id = numberId;
			number.client = this;
			number.delete(callback);
		},

		updatePhoneNumber :  function (numberId, parameters, callback) {
			var number = new lib.PhoneNumber();
			number.id = numberId;
			number.client = this;
			number.update(parameters, callback);
		},

		getApplications : function (callback) {
			lib.Application.list(this, callback);
		},

		checkPortInAvailability : function (availabilityCheck, callback) {
			callback(new Error("Not supported"));
		},

		portIn : function (portInData, callback) {
			callback(new Error("Not supported"));
		},

		uploadLOA : function (portInId, filePath, callback) {
			callback(new Error("Not supported"));
		},

		getPortInState : function (portInId, callback) {
			callback(new Error("Not supported"));
		}
	};

	var mapObsoleteFunction = function (name) {
		lib.Client.prototype[name] = function () {
			obsolete(name, details[name]);
			obsoleteFunctions[name].apply(this, arguments);
		};
	};

	Object.keys(obsoleteFunctions).forEach(mapObsoleteFunction);

	//some old types
	lib.Audio = function (callId) {
		this.callId = callId;
	};

	lib.AvailableNumberSearchCriteria = function () {};

	lib.CallTransfer = function (call, transferTo) {
		this.call = call;
		this.transferTo = transferTo;
		this.whisperAudio = undefined;
		this.state = "transferring";
	};

	lib.LNPAvailabilityCheck = function (number) {
		this.number = number;
	};

	lib.PortInData = function () {};
};
