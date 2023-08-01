import React, { useState } from "react";
import "./FileTable.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons/faCirclePlay";
import { faCircleStop } from "@fortawesome/free-regular-svg-icons/faCircleStop";
import { faCirclePause } from "@fortawesome/free-regular-svg-icons/faCirclePause";
import ReactPlayer from "react-player";

export type FileT = {
	name: string;
	length: string;
	content?: string;
};

type FileTableProps = {
	files?: FileT[];
};

export default function FileTable({ files }: FileTableProps) {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentAudio, setCurrentAudio] = useState<string | null>(null);
	const [duration, setDuration] = useState<number | null>(null);
	const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

	function handlePlay(audio: string) {
		setIsPlaying(true);
		setCurrentAudio(audio);
	}

	function handlePause() {
		setIsPlaying(false);
	}

	function handleStop() {
		setIsPlaying(false);
		setCurrentAudio(null);
		setDuration(null);
		setTimeRemaining(null);
	}

	function handleDuration(duration: number) {
		setDuration(duration);
	}

	function handleProgress(progress: { playedSeconds: number; loadedSeconds: number }) {
		if (duration) {
			setTimeRemaining(duration - progress.playedSeconds);
		}
	}

	function formatTime(seconds: number | null, fileLength: string): string {
		if (seconds) {
			const minutes = Math.floor(seconds / 60);
			const remainingSeconds = Math.floor(seconds % 60);

			const formattedMinutes = minutes.toString().padStart(2, "0");
			const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

			return `${formattedMinutes}:${formattedSeconds}`;
		} else {
			return fileLength;
		}
	}

	return (
		<>
			<table className={`FileTable_container`}>
				<tbody>
					{files?.map((file: FileT, index: number) => {
						return (
							<tr>
								<td className={`FileTable_smallColumn`}>
									<input type="checkbox" />
								</td>
								<td className={`regular-text grey-text FileTable_nameColumn`}>{file.name}</td>
								<td className={`regular-text grey-text FileTable_smallColumn`}>
									<FontAwesomeIcon icon={faClock} />
									{currentAudio === file.content
										? formatTime(timeRemaining, file.length)
										: file.length}
								</td>
								<td className={`FileTable_smallColumn`}>
									{currentAudio === file.content ? (
										<FontAwesomeIcon
											icon={faCirclePause}
											className={`green-text`}
											onClick={() => {
												handlePause();
											}}
										/>
									) : (
										<FontAwesomeIcon
											icon={faCirclePlay}
											className={`green-text`}
											onClick={() => {
												file.content && handlePlay(file.content);
											}}
										/>
									)}
									<FontAwesomeIcon
										icon={faCircleStop}
										className={`green-text`}
										onClick={() => {
											handleStop();
										}}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{currentAudio && (
				<ReactPlayer
					url={currentAudio}
					playing={isPlaying}
					controls
					width="0"
					height="0"
					onEnded={handleStop}
					onDuration={handleDuration}
					onProgress={handleProgress}
				/>
			)}
		</>
	);
}
