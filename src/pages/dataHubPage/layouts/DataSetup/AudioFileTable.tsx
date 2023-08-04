import React, { useState } from "react";
import "./AudioFileTable.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons/faCirclePlay";
import { faCircleStop } from "@fortawesome/free-regular-svg-icons/faCircleStop";
import ReactPlayer from "react-player";
import type { InputFileDataT } from "../../../../redux/slices/DataHubSlice";

type AudioFileTableProps = {
	files?: InputFileDataT[];
};

export default function AudioFileTable({ files }: AudioFileTableProps) {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [currentAudio, setCurrentAudio] = useState<InputFileDataT | undefined>(undefined);

	function handlePlay(audioFile: InputFileDataT) {
		setIsPlaying(true);
		setCurrentAudio(audioFile);
	}

	function handleStop() {
		setIsPlaying(false);
		setCurrentAudio(undefined);
	}

	return (
		<>
			<table className={`AudioFileTable_container`}>
				<tbody>
					{files?.map((file: InputFileDataT, index: number) => {
						return (
							<tr key={index}>
								<td className={`AudioFileTable_smallColumn`}>
									<input type="checkbox" />
								</td>
								<td className={`regular-text grey-text AudioFileTable_nameColumn`}>
									{file.metadata.name}
								</td>
								{/* <td */}
								{/* 	className={`regular-text grey-text AudioFileTable_smallColumn AudioFileTable_internalColumn`} */}
								{/* > */}
								{/* 	<FontAwesomeIcon icon={faClock} className={`AudioFileTable_icon`} /> */}
								{/* 	{file.metadata.length ?} */}
								{/* </td> */}
								<td className={`AudioFileTable_smallColumn`}>
									{isPlaying && currentAudio === file ? (
										<FontAwesomeIcon
											icon={faCircleStop}
											className={`green-text`}
											onClick={() => {
												handleStop();
											}}
										/>
									) : (
										<FontAwesomeIcon
											icon={faCirclePlay}
											className={`green-text`}
											onClick={() => {
												handlePlay(file);
											}}
										/>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{currentAudio && (
				<ReactPlayer
					url={currentAudio.dataUrl}
					playing={isPlaying}
					controls
					width="0"
					height="0"
					onEnded={handleStop}
				/>
			)}
		</>
	);
}
