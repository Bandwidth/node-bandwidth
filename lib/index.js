var Client                  = require("./client");
var Account                 = require("./account");
var Message                 = require("./message");
var Call                    = require("./call");
var Conference              = require("./conference");
var Bridge                  = require("./bridge");
var Domain                  = require("./domain");
var Endpoint                = require("./endpoint");
var ErrorType               = require("./error");
var NumberInfo              = require("./numberInfo");
var Media                   = require("./media");
var Application             = require("./application");
var Recording               = require("./recording");
var AvailableNumber         = require("./availableNumber");
var PhoneNumber             = require("./phoneNumber");
var UnexpectedResponseError = require("./unexpectedResponseError");
var RateLimitError          = require("./RateLimitError");
var BXMLResponse            = require("./xml");
var MessageV2               = require("./v2/message");
var queries                 = require("./v2/searchAndOrderNumberQueries");

/**
 * Catapult API Client
 * @constructor
 * @param {Object} config - Client configuration parameters
 * @param {String} config.userId - Your Catapult user ID
 * @param {String} config.apiToken - Your Catapult API token
 * @param {String} config.apiSecret - Your Catapult API secret
 * @param {String} [config.baseUrl=https://api.catapult.inetwork.com] - The catapult base URL.
 * Configurable for using alternative Catapult environments.
 */
var CatapultClient = function (config) {
	var client = new Client(config);
	this.Account         = new Account(client);
	this.Media           = new Media(client);
	this.Message         = new Message(client);
	this.Call            = new Call(client);
	this.Conference      = new Conference(client);
	this.Bridge          = new Bridge(client);
	this.Domain          = new Domain(client);
	this.Endpoint        = new Endpoint(client);
	this.Error           = new ErrorType(client);
	this.NumberInfo      = new NumberInfo(client);
	this.Recording       = new Recording(client);
	this.Application     = new Application(client);
	this.AvailableNumber = new AvailableNumber(client);
	this.PhoneNumber = new PhoneNumber(client);
	this.v2 = {
		Message : new MessageV2(client)
	};
};

CatapultClient.UnexpectedResponseError = UnexpectedResponseError;
CatapultClient.RateLimitError          = RateLimitError;
CatapultClient.BXMLResponse            = BXMLResponse;

// Allow modules transformed from ES6 import/export to reference 
// this constructor as the default export.
CatapultClient.default = CatapultClient;

Object.keys(queries).forEach(function (type) {
	CatapultClient[type] = queries[type];
});

module.exports = CatapultClient;
