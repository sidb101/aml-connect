import React from "react";
// @ts-ignore
import audio from "./Images/transparent-sound-waves-acoustic-wave.png";
import "./FileTable.scss";

export type FileT = {
	name: string;
	length: number;
};

type FileTableProps = {
	files: FileT[];
};

export default function FileTable({ files }: FileTableProps) {
	return (
		<table className={`FileTable_container`}>
			<thead>
			<tr>
				<th>Select</th>
				<th>Name</th>
				<th>Length</th>
				<th>Image</th>
			</tr>
			</thead>
			<tbody className={`FileTable_bodyContainer`}>
			{files.map((file: FileT) => {
				return (
					<tr className={`FileTable_tableRowContainer`}>
						<td><input type="checkbox"/></td>
						<td>{file.name}</td>
						<td>🕒 {file.length}</td>
						<td><img src={audio} alt={file.name}/></td>
					</tr>
				);
			})}
			</tbody>
		</table>
	);
}
