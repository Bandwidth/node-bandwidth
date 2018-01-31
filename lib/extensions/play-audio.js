/* eslint max-params: ["error", 5] */
export default function playAudioExtensions(apiObject) {
	if (!apiObject || !apiObject.playAudio) {
		return;
	}
	apiObject.speakSententence = {
		execute(id, sentence, options = {}, cancelToken = null) {
			return this.playAudio({id, sentence, ...options}, cancelToken);
		}
	};

	apiObject.playFileUrl = {
		execute(id, fileUrl, options = {}, cancelToken = null) {
			return this.playAudio({id, fileUrl, ...options}, cancelToken);
		}
	};

	apiObject.stopPlayFileUrl = {
		execute(id, cancelToken = null) {
			return this.playAudio({id, fileUrl: ''}, cancelToken);
		}
	};

	if (!apiObject.playAudioToMember) {
		return;
	}

	apiObject.speakSententenceToMember = {
		execute(id, memberId, sentence, options = {}, cancelToken = null) {
			return this.playAudioToMember(
				{id, memberId, sentence, ...options},
				cancelToken
			);
		}
	};

	apiObject.playFileUrlToMember = {
		execute(id, memberId, fileUrl, options = {}, cancelToken = null) {
			return this.playAudioToMember(
				{
					id,
					memberId,
					fileUrl,
					...options
				},
				cancelToken
			);
		}
	};

	apiObject.stopPlayFileUrlToMember = {
		execute(id, memberId, cancelToken = null) {
			return this.playAudioToMember({id, memberId, fileUrl: ''}, cancelToken);
		}
	};
}
