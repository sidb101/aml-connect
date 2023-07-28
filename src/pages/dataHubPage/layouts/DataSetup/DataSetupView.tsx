import "./DataSetupView.scss";
import React from "react";
import Accordion from "../../../../components/accordion/Accordion";
import FileTable, {type FileT} from "./FileTable";

export type DataSetupViewT = {
	data?: string;
};

const files: FileT[] = [
	{
		name: "file1",
		length: 1024
	},
	{
		name: "file2",
		length: 2048
	},
	{
		name: "file3",
		length: 4096
	},
	{
		name: "file4",
		length: 8192
	},
];

const DataSetupView = (props: DataSetupViewT) => {
	return (
		<div className={`DataSetupView_container`}>
			<div className={`DataSetupView_leftContainer`}>
				<Accordion
					headerElement={<>Training Dataset</>}
					maxHeight={"200px"}
					bodyElement={
						<FileTable files={files}/>
					}
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
				<Accordion headerElement={<>Add or Merge Data</>} bodyElement={<h4>Data Body</h4>}/>
				<Accordion headerElement={<>Label Data</>} bodyElement={<h4>Label Body</h4>} defaultIsOpen={false}/>
			</div>
		</div>
	);
};

export default DataSetupView;
