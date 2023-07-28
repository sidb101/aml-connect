import "./DataSetupView.scss";
import React from "react";
import Accordion from "../../../../components/accordion/Accordion";
import FileTable, { type FileT } from "./FileTable";

export type DataSetupViewT = {
	data?: string;
};

const files: FileT[] = [
	{
		name: "glass-breaking-rainy.wav",
		length: "1:08",
	},
	{
		name: "glass-breaking-sudden.wav",
		length: "0:55",
	},
	{
		name: "glass-breaking-onsite.wav",
		length: "0:45",
	},
	{
		name: "glass-breaking-bin.wav",
		length: "1:18",
	},
	{
		name: "file5.wav",
		length: "0:10",
	},
	{
		name: "file6.wav",
		length: "0:17",
	},
	{
		name: "file7.wav",
		length: "1:07",
	},
];

const DataSetupView = (props: DataSetupViewT) => {
	return (
		<div className={`DataSetupView_container`}>
			<div className={`DataSetupView_leftContainer`}>
				<Accordion
					headerElement={<>Training Dataset</>}
					maxHeight={"200px"}
					bodyElement={<FileTable files={files} />}
				/>
				<Accordion
					headerElement={<>Validation Dataset</>}
					bodyElement={<h4>Validation Body</h4>}
					maxHeight={"300px"}
					defaultIsOpen={false}
				/>
				<Accordion
					headerElement={<>Testing Dataset</>}
					bodyElement={<h4>Testing Body</h4>}
					defaultIsOpen={false}
				/>
			</div>
			<div className={`DataSetupView_rightContainer`}>
				<Accordion headerElement={<>Add or Merge Data</>} bodyElement={<h4>Data Body</h4>} />
				<Accordion headerElement={<>Label Data</>} bodyElement={<h4>Label Body</h4>} defaultIsOpen={false} />
			</div>
		</div>
	);
};

export default DataSetupView;
