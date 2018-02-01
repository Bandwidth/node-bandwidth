export default function callExtensions(Calls) {
	if (!Calls) {
		return;
	}

	Calls.answer = {
		execute(id, cancelToken = null) {
			return this.update({id, state: 'active'}, cancelToken);
		}
	};

	Calls.terminate = {
		execute(id, cancelToken = null) {
			return this.update({id, state: 'completed'}, cancelToken);
		}
	};

	Calls.hangup = {
		execute(id, cancelToken = null) {
			return this.update({id, state: 'rejected'}, cancelToken);
		}
	};

	Calls.transfer = {
		execute(id, transferTo, options = {}, cancelToken = null) {
			return this.update(
				{id, state: 'transferring', transferTo, ...options},
				cancelToken
			);
		}
	};

	Calls.stopGather = {
		execute(id, gatherId, cancelToken = null) {
			return this.updateGather({id, gatherId, state: 'completed'}, cancelToken);
		}
	};
}
