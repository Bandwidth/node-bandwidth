import test from 'ava';
import td from 'testdouble';
import conferencesExtensions from '../../dist/extensions/conferences';

test('stop() should call update() with right params', async t => {
	const Conference = {update: td.function()};
	td
		.when(Conference.update({id: 'id', state: 'completed'}, null))
		.thenResolve();
	conferencesExtensions(Conference);
	await Conference.stop.execute.call(Conference, 'id');
	t.pass();
});

test('mute() should call update() with right params', async t => {
	const Conference = {update: td.function()};
	td.when(Conference.update({id: 'id', mute: true}, null)).thenResolve();
	conferencesExtensions(Conference);
	await Conference.mute.execute.call(Conference, 'id', true);
	t.pass();
});

test('hold() should call update() with right params', async t => {
	const Conference = {update: td.function()};
	td.when(Conference.update({id: 'id', hold: true}, null)).thenResolve();
	conferencesExtensions(Conference);
	await Conference.hold.execute.call(Conference, 'id', true);
	t.pass();
});

test('deleteMember() should call updateMember() with right params', async t => {
	const Conference = {updateMember: td.function()};
	td
		.when(Conference.updateMember({id: 'id', memberId: 'memberId'}, null))
		.thenResolve();
	conferencesExtensions(Conference);
	await Conference.deleteMember.execute.call(Conference, 'id', 'memberId');
	t.pass();
});

test('muteMember() should call updateMember() with right params', async t => {
	const Conference = {updateMember: td.function()};
	td
		.when(
			Conference.updateMember(
				{id: 'id', memberId: 'memberId', mute: true},
				null
			)
		)
		.thenResolve();
	conferencesExtensions(Conference);
	await Conference.muteMember.execute.call(Conference, 'id', 'memberId', true);
	t.pass();
});

test('holdMember() should call updateMember() with right params', async t => {
	const Conference = {updateMember: td.function()};
	td
		.when(
			Conference.updateMember(
				{id: 'id', memberId: 'memberId', mute: true},
				null
			)
		)
		.thenResolve();
	conferencesExtensions(Conference);
	await Conference.holdMember.execute.call(Conference, 'id', 'memberId', true);
	t.pass();
});
