import test from 'ava';
import td from 'testdouble';
import playAudioExtensions from '../../dist/extensions/play-audio';

test('speakSentence() should call playAudio() with right params', async t => {
	const Call = {playAudio: td.function()};
	td.when(Call.playAudio({id: 'id', sentence: 'hello'}, null)).thenResolve();
	playAudioExtensions(Call);
	await Call.speakSentence.execute.call(Call, 'id', 'hello');
	t.pass();
});

test('playFileUrl() should call playAudio() with right params', async t => {
	const Call = {playAudio: td.function()};
	td.when(Call.playAudio({id: 'id', fileUrl: 'url'}, null)).thenResolve();
	playAudioExtensions(Call);
	await Call.playFileUrl.execute.call(Call, 'id', 'url');
	t.pass();
});

test('stopPlayFileUrl() should call playAudio() with right params', async t => {
	const Call = {playAudio: td.function()};
	td.when(Call.playAudio({id: 'id', fileUrl: ''}, null)).thenResolve();
	playAudioExtensions(Call);
	await Call.stopPlayFileUrl.execute.call(Call, 'id');
	t.pass();
});

test('speakSentenceToMember() should call playAudio() with right params', async t => {
	const Call = {playAudioToMember: td.function(), playAudio: td.function()};
	td
		.when(
			Call.playAudioToMember(
				{id: 'id', memberId: 'memberId', sentence: 'hello'},
				null
			)
		)
		.thenResolve();
	playAudioExtensions(Call);
	await Call.speakSentenceToMember.execute.call(
		Call,
		'id',
		'memberId',
		'hello'
	);
	t.pass();
});

test('playFileUrlToMember() should call playAudio() with right params', async t => {
	const Call = {playAudioToMember: td.function(), playAudio: td.function()};
	td
		.when(
			Call.playAudioToMember(
				{id: 'id', memberId: 'memberId', fileUrl: 'url'},
				null
			)
		)
		.thenResolve();
	playAudioExtensions(Call);
	await Call.playFileUrlToMember.execute.call(Call, 'id', 'memberId', 'url');
	t.pass();
});

test('stopPlayFileUrlToMember() should call playAudio() with right params', async t => {
	const Call = {playAudioToMember: td.function(), playAudio: td.function()};
	td
		.when(
			Call.playAudioToMember(
				{id: 'id', memberId: 'memberId', fileUrl: ''},
				null
			)
		)
		.thenResolve();
	playAudioExtensions(Call);
	await Call.stopPlayFileUrlToMember.execute.call(Call, 'id', 'memberId');
	t.pass();
});
