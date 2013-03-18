function PhoneNumber(number, name, applicationId) {
	if (!(this instanceof PhoneNumber)) {
		return new PhoneNumber(id, number, name);
	}
	this.number = number;
	this.name = name; 
	this.applicationId = applicationId;
}

module.exports = PhoneNumber; 
