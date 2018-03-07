import test from 'ava';
import td from 'testdouble';
import callsExtensions from '../../dist/extensions/calls';

test('answer() should call update() with right params', async t => {
	const Call = {update: td.function()};
	td.when(Call.update('id', {state: 'active'}, null)).thenResolve();
	callsExtensions(Call);
	await Call.answer.execute.call(Call, 'id');
	t.pass();
});

test('terminate() should call update() with right params', async t => {
	const Call = {update: td.function()};
	td.when(Call.update('id', {state: 'completed'}, null)).thenResolve();
	callsExtensions(Call);
	await Call.terminate.execute.call(Call, 'id');
	t.pass();
});

test('hangup() should call update() with right params', async t => {
	const Call = {update: td.function()};
	td.when(Call.update('id', {state: 'rejected'}, null)).thenResolve();
	callsExtensions(Call);
	await Call.hangup.execute.call(Call, 'id');
	t.pass();
});

test('transfer() should call update() with right params', async t => {
	const Call = {update: td.function()};
	td
		.when(
			Call.update(
				'id',
				{state: 'transferring', transferTo: '+12345678901'},
				null
			)
		)
		.thenResolve();
	callsExtensions(Call);
	await Call.transfer.execute.call(Call, 'id', '+12345678901');
	t.pass();
});

test('stopGather() should call updateGather() with right params', async t => {
	const Call = {updateGather: td.function()};
	td
		.when(Call.updateGather('id', 'gatherId', {state: 'completed'}, null))
		.thenResolve();
	callsExtensions(Call);
	await Call.stopGather.execute.call(Call, 'id', 'gatherId');
	t.pass();
});

test('enableRecording() should call update() with right params', async t => {
	const Call = {update: td.function()};
	td.when(Call.update('id', {recordingEnabled: true}, null)).thenResolve();
	callsExtensions(Call);
	await Call.enableRecording.execute.call(Call, 'id');
	t.pass();
});
