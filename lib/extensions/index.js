import playAudioExtensions from './play-audio';
import callsExtensions from './calls';
import conferencesExtensions from './conferences';

export default function extendApi({Bridges, Calls, Conferences}) {
	playAudioExtensions(Bridges);
	playAudioExtensions(Calls);
	playAudioExtensions(Conferences);
	callsExtensions(Calls);
	conferencesExtensions(Conferences);
}
