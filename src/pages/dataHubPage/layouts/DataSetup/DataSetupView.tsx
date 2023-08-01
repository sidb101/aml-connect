import "./DataSetupView.scss";
import React from "react";
import Accordion from "../../../../components/accordion/Accordion";
import FileTable, { type FileT } from "./FileTable";

export type DataSetupViewProps = {
	audioFiles?: FileT[];
};

const DataSetupView = ({ audioFiles }: DataSetupViewProps) => {
	return (
		<div className={`DataSetupView_container`}>
			<div className={`DataSetupView_leftContainer`}>
				<Accordion
					headerElement={<>Training Dataset</>}
					maxHeight={"200px"}
					bodyElement={audioFiles && <FileTable files={audioFiles} />}
				/>
				<Accordion
					headerElement={<>Validation Dataset</>}
					bodyElement={audioFiles && <FileTable files={audioFiles} />}
					maxHeight={"300px"}
					defaultIsOpen={false}
				/>
				<Accordion
					headerElement={<>Testing Dataset</>}
					bodyElement={audioFiles && <FileTable files={audioFiles} />}
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
