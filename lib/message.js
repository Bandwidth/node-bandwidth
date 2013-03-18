function Message(from, to, text) {
	if (!(this instanceof Message)) {
		return new Message(from, to, text);
	}
	this.to = to;
	this.from = from; 
	this.text = text;
}

module.exports = Message; 
