export default function callExtensions(Conferences) {
	if (!Conferences) {
		return;
	}

	Conferences.stop = {
		execute(id, cancelToken = null) {
			return this.update({id, state: 'completed'}, cancelToken);
		}
	};
	Conferences.mute = {
		execute(id, mute = true, cancelToken = null) {
			return this.update({id, mute}, cancelToken);
		}
	};
	Conferences.hold = {
		execute(id, hold = true, cancelToken = null) {
			return this.update({id, hold}, cancelToken);
		}
	};

	Conferences.deleteMember = {
		execute(id, memberId, cancelToken = null) {
			return this.updateMember({id, memberId, state: 'completed'}, cancelToken);
		}
	};
	Conferences.muteMember = {
		execute(id, memberId, mute = true, cancelToken = null) {
			return this.updateMember({id, memberId, mute}, cancelToken);
		}
	};
	Conferences.holdMember = {
		execute(id, memberId, hold = true, cancelToken = null) {
			return this.updateMember({id, memberId, hold}, cancelToken);
		}
	};
}
