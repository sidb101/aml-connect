import "./DataSetupView.scss";
import React from "react";
import Accordion from "../../../../components/accordion/Accordion";
import FileTable, { type AudioFileT } from "./FileTable";
import NewAccordion from "../../../../components/accordion/NewAccordion";

export type DataSetupViewProps = {
	audioFiles?: AudioFileT[];
};

const DataSetupView = ({ audioFiles }: DataSetupViewProps) => {
	return (
		<div className={`DataSetupView_container`}>
			<div className={`DataSetupView_leftContainer`}>
				<NewAccordion bodyMaxHeight={`calc(33vh - 150px)`} header={<>Training Dataset</>}>
					<FileTable files={audioFiles} />
				</NewAccordion>
				<NewAccordion
					bodyMaxHeight={`calc(33vh - 150px)`}
					defaultIsOpen={false}
					header={<>Validation Dataset</>}
				>
					<FileTable files={audioFiles} />
				</NewAccordion>
				<NewAccordion bodyMaxHeight={`calc(33vh - 150px)`} defaultIsOpen={false} header={<>Testing Dataset</>}>
					<FileTable files={audioFiles} />
				</NewAccordion>
			</div>
			<div className={`DataSetupView_rightContainer`}>
				<Accordion headerElement={<>Add or Merge Data</>} bodyElement={<h4>Data Body</h4>} />
				<Accordion headerElement={<>Label Data</>} bodyElement={<h4>Label Body</h4>} defaultIsOpen={false} />
			</div>
		</div>
	);
};

export default DataSetupView;
