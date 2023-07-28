import React from "react";
import audio from "./Images/transparent-sound-waves-acoustic-wave.png";
import "./FileTable.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export type FileT = {
	name: string;
	length: string;
	content?: string;
};

type FileTableProps = {
	files: FileT[];
};

export default function FileTable({ files }: FileTableProps) {
	return (
		<table className={`FileTable_container`}>
			<thead>
				<tr className={`regular-text green-text`}>
					<th>Select</th>
					<th>Name</th>
					<th>Length</th>
					<th>Image</th>
				</tr>
			</thead>
			<tbody>
				{files.map((file: FileT, index: number) => {
					return (
						<tr key={index}>
							<td>
								<input type="checkbox" />
							</td>
							<td className={`regular-text grey-text`}>{file.name}</td>
							<td className={`regular-text grey-text`}>
								<FontAwesomeIcon icon={faClock} /> {file.length}
							</td>
							<td>
								<img src={audio} alt={file.name} />
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
