function Call(from, to) {
	if (!(this instanceof Call)) {
		return new Call(from, to);
	}
	this.from = from
	this.to = to; 
}

module.exports = Call; 
