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
	files?: FileT[];
};

export default function FileTable({ files }: FileTableProps) {
	return (
		<table className={`FileTable_container`}>
			<thead>
				<tr className={`regular-text green-text`}>
					<th className={`FileTable_smallColumn`}>Select</th>
					<th className={`FileTable_nameColumn`}>Name</th>
					<th className={`FileTable_smallColumn`}>Length</th>
					<th className={`FileTable_smallColumn`}>Image</th>
				</tr>
			</thead>
			<tbody>
				{files?.map((file: FileT, index: number) => {
					return (
						<tr key={index}>
							<td className={`FileTable_smallColumn`}>
								<input type="checkbox" />
							</td>
							<td className={`regular-text grey-text FileTable_nameColumn`}>{file.name}</td>
							<td className={`regular-text grey-text FileTable_smallColumn`}>
								<FontAwesomeIcon icon={faClock} /> {file.length}
							</td>
							<td className={`FileTable_smallColumn`}>
								<img src={audio} alt={`Audio Icon`} />
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
