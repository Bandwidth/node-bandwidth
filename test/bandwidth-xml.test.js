import test from 'ava';
import bxml from '../dist/bandwidth-xml';

test('response() should build right xml', t => {
	t.is(
		bxml.response('<Test></Test>'),
		'<?xml version="1.0" encoding="UTF-8"?><Response><Test></Test></Response>'
	);
});

test('response() should build right xml (without verbs)', t => {
	t.is(
		bxml.response(),
		'<?xml version="1.0" encoding="UTF-8"?><Response></Response>'
	);
});

test('response() should build right xml (some verbs)', t => {
	t.is(
		bxml.response(['<Test1></Test1>', '<Test2></Test2>']),
		'<?xml version="1.0" encoding="UTF-8"?><Response><Test1></Test1><Test2></Test2></Response>'
	);
});

test('gather() should build right xml', t => {
	t.is(
		bxml.gather('url', '<Test></Test>', {requestUrlTimeout: 100}),
		'<Gather requestUrl="url" requestUrlTimeout="100"><Test></Test></Gather>'
	);
});

test('gather() should build right xml (without verbs)', t => {
	t.is(
		bxml.gather('url', {requestUrlTimeout: 100}),
		'<Gather requestUrl="url" requestUrlTimeout="100"></Gather>'
	);
});

test('hangup() should build right xml', t => {
	t.is(bxml.hangup(), '<Hangup></Hangup>');
});

test('playAudio() should build right xml', t => {
	t.is(bxml.playAudio('url'), '<PlayAudio>url</PlayAudio>');
});

test('redirect() should build right xml', t => {
	t.is(
		bxml.redirect('url', 100),
		'<Redirect requestUrl="url" requestUrlTimeout="100"></Redirect>'
	);
});

test('speakSentence() should build right xml', t => {
	t.is(
		bxml.speakSentence('hello', {locale: 'en_US'}),
		'<SpeakSentence locale="en_US">hello</SpeakSentence>'
	);
});

test('record() should build right xml', t => {
	t.is(bxml.record({requestUrl: 'url'}), '<Record requestUrl="url"></Record>');
});

test('record() should build right xml (without params)', t => {
	t.is(bxml.record(), '<Record></Record>');
});

test('transfer() should build right xml', t => {
	t.is(
		bxml.transfer('number', '<SpeakSentece>Hello</SpeakSentece>', {
			transferCallerId: 'private'
		}),
		'<Transfer transferTo="number" transferCallerId="private"><SpeakSentece>Hello</SpeakSentece></Transfer>'
	);
});

test('transfer() should build right xml (with some numbers)', t => {
	t.is(
		bxml.transfer(['number1', 'number2'], {transferCallerId: 'private'}),
		'<Transfer transferCallerId="private"><PhoneNumber>number1</PhoneNumber><PhoneNumber>number2</PhoneNumber></Transfer>'
	);
});
