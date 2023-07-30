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
					<th className="select-column">Select</th>
					<th className={`name-header`}>Name</th>
					<th className="length-column">Length</th>
					<th className="image-column">Image</th>
				</tr>
			</thead>
			<tbody>
				{files.map((file: FileT, index: number) => {
					return (
						<tr key={index}>
							<td className="select-column">
								<input type="checkbox" />
							</td>
							<td className={`regular-text grey-text name-column`}>{file.name}</td>
							<td className={`regular-text grey-text length-column`}>
								<FontAwesomeIcon icon={faClock} /> {file.length}
							</td>
							<td className="image-column">
								<img src={audio} alt={file.name} />
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
