var Client = require("./client");
var Message = require("./message");
var Call = require("./call");
var Bridge = require("./bridge");
var Domain = require("./domain");
var Endpoint = require("./endpoint");
var Media = require("./media");
var Application = require("./application");
var Recording = require("./recording");
var PhoneNumber = require("./phoneNumber");
var AvailableNumber = require("./availableNumber");
var UnexpectedResponseError = require("./unexpectedResponseError");

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
	this.Media = new Media(client);
	this.Message = new Message(client);
	this.Call = new Call(client);
	this.Bridge = new Bridge(client);
	this.Domain = new Domain(client);
	this.Endpoint = new Endpoint(client);
	this.Recording = new Recording(client);
	this.PhoneNumber = new PhoneNumber(client);
	this.Application = new Application(client);
	this.AvailableNumber = new AvailableNumber(client);
};

CatapultClient.UnexpectedResponseError = UnexpectedResponseError;

module.exports = CatapultClient;
