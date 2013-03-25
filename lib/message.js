var bw = require ('./phoneNumber')

function Message(from, to, text) {
	if (!(this instanceof Message)) {
		return new Message(from, to, text);
	}
	this.to = to.number || to;
	this.from = from.number || from; 
	this.text = text;
}

module.exports = Message; 
