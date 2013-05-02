function PortInData(number, data) {
	if (!(this instanceof PortInData)) {
		return new PortInData(number);
	}
	this.numbers = [number]; 

	// clone all data properties to object
	for(var prop in data){
		if( data.hasOwnProperty(prop) ){
			this[prop] = data[prop];
		}
	}
}

module.exports = PortInData;