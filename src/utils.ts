export function formatTime(seconds: number | undefined, fileLength: string): string {
	if (!seconds) {
		return fileLength;
	}

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);

	const formattedMinutes = minutes.toString().padStart(2, "0");
	const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

	return `${formattedMinutes}:${formattedSeconds}`;
}
