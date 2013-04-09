function LNPAvailabilityCheck(number) {
	if (!(this instanceof LNPAvailabilityCheck)) {
		return new LNPAvailabilityCheck(number);
	}
	this.number = number; 
}

module.exports = LNPAvailabilityCheck;