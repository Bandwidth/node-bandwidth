var PhoneNumber = function (client) {
  /**
	 * Gets a list of all your phone numbers.
	 * @param {Object} params Query parameters for sorting the results
	 * @param {String} [params.page=0] Used for pagination to indicate the page
   *  requested for querying a list of phone numbers. If no value is specified the default is 0.
	 * @param {String} [params.size=25] Used for pagination to indicate the size
   *  of each page requested for querying a list of phone numbers.
   *  If no value is specified the default value is 25. (Maximum value 1000)
	 * @param {String} [params.applicationId] Used to filter the retrieved list
   *  of numbers by an associated application ID.
	 * @param {String} [params.state] Used to filter the retrieved list of numbers
   *   allocated for the authenticated user by a US state.
	 * @param {Number} [params.name] Used to filter the retrieved list of numbers
   *  allocated for the authenticated user by it's name.
	 * @param {Number} [params.city] Used to filter the retrieved list of numbers
   *  allocated for the authenticated user by it's city.
   * @param {Number} [params.numberState] Used to filter the retrieved
   *  list of numbers allocated for the authenticated user by the number state.
	 * @param {Function} callback A callback with the list of numbers
	 * @return {Promise} A promise for the list of numbers
	 */
  this.list = function (params, callback) {
		return client.makeRequest({
			path   : "phoneNumbers",
			method : "GET",
      qs: params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
	};

  /**
	 * Allocates a number so you can use it to make and receive calls and send and receive messages.
	 * @param {Object} params Query parameters for specifying the number and its properties
	 * @param {String} [params.number] An available telephone number you want to
   *  use (must be in E.164 format, like +19195551212).
	 * @param {String} [params.name] A name you choose for this number.
	 * @param {String} [params.applicationId] The unique id of an Application you
   *  want to associate with this number.
	 * @param {String} [params.fallbackNumber] Number to transfer an incoming call
   *  when the callback/fallback events can't be delivered.
	 * @param {Function} callback A callback with the list of numbers
	 * @return {Promise} A promise for the list of numbers
	 */
  this.allocate = function(params, callback) {
    return client.makeRequest({
			path   : "phoneNumbers",
			method : "POST",
      body: params
		})
		.then(function (response) {
			return response.body;
		})
		.asCallback(callback);
  };
};

module.exports = PhoneNumber;
