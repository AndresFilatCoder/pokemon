export function playAudio(audioUrl: string) {
	const audio = new Audio(audioUrl);
	audio.play();
}
