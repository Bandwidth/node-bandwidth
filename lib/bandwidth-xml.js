function printIfDefined(name, value) {
	if (typeof value !== 'undefined') {
		return ` ${name}="${value}"`;
	}
	return '';
}

function printArray(list) {
	if (!list) {
		return '';
	}
	return (Array.isArray(list) ? list : [list]).join('');
}

function printOptionalAttributes(options) {
	return Object.keys(options || {})
		.map(k => printIfDefined(k, options[k]))
		.join('');
}

export default {
	response(verbs) {
		return `<?xml version="1.0" encoding="UTF-8"?><Response>${printArray(
			verbs
		)}</Response>`;
	},

	gather(requestUrl, verbs, options) {
		if (!options) {
			options = verbs;
			verbs = null;
		}
		return `<Gather requestUrl="${requestUrl}"${printOptionalAttributes(
			options
		)}>${printArray(verbs)}</Gather>`;
	},

	hangup() {
		return `<Hangup></Hangup>`;
	},

	playAudio(url) {
		return `<PlayAudio>${url}</PlayAudio>`;
	},

	redirect(requestUrl, requestUrlTimeout) {
		return `<Redirect requestUrl="${requestUrl}" requestUrlTimeout="${requestUrlTimeout}"></Redirect>`;
	},

	speakSentence(sentence, options) {
		return `<SpeakSentence${printOptionalAttributes(
			options
		)}>${sentence}</SpeakSentence>`;
	},

	transfer(transferTo, verbs, options) {
		if (!options) {
			options = verbs;
			verbs = undefined;
		}
		let numbers = [];
		if (Array.isArray(transferTo)) {
			numbers = transferTo;
			transferTo = undefined;
		}
		return `<Transfer${printIfDefined(
			'transferTo',
			transferTo
		)}${printOptionalAttributes(options)}>${numbers
			.map(n => `<PhoneNumber>${n}</PhoneNumber>`)
			.join('')}${printArray(verbs)}</Transfer>`;
	},

	record(options) {
		return `<Record${printOptionalAttributes(options)}></Record>`;
	}
};
