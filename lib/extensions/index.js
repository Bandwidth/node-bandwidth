import playAudioExtensions from './play-audio';

export default function extendApi({Bridge, Call, Conference}) {
	playAudioExtensions(Bridge);
	playAudioExtensions(Call);
	playAudioExtensions(Conference);
}
