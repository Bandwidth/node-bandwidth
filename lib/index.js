var Client = require("./client");
var Message = require("./message");
var Call = require("./call");
var UnexpectedResponseError = require("./UnexpectedResponseError");

/**
 * Catapult API Client
 * @constructor
 * @param {object} config - Client configuration parameters
 * @param {string} config.userId - Your Catapult user ID
 * @param {string} config.apiToken - Your Catapult API token
 * @param {string} config.apiSecret - Your Catapult API secret
 * @param [string] config.baseUrl - The catapult base URL. Configurable for using alternative Catapult environments.
 * Default: https://api.catapult.inetwork.com
 */
var CatapultClient = function (config) {
	var client = new Client(config);
	this.Message = new Message(client);
	this.Call = new Call(client);
};

CatapultClient.UnexpectedResponseError = UnexpectedResponseError;

module.exports = CatapultClient;
