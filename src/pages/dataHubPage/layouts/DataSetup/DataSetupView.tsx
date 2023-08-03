import "./DataSetupView.scss";
import React from "react";
import Accordion from "../../../../components/accordion/Accordion";
import AudioFileTable from "./AudioFileTable";
import NewAccordion from "../../../../components/accordion/NewAccordion";
import type { InputFileDataT } from "../../../../redux/slices/DataHubSlice";

export type DataSetupViewProps = {
	audioFiles?: InputFileDataT[];
};

const DataSetupView = ({ audioFiles }: DataSetupViewProps) => {
	return (
		<div className={`DataSetupView_container`}>
			<div className={`DataSetupView_leftContainer`}>
				<NewAccordion bodyMaxHeight={`calc(33vh - 150px)`} header={<>Training Dataset</>}>
					<AudioFileTable files={audioFiles} />
				</NewAccordion>
				<NewAccordion
					bodyMaxHeight={`calc(33vh - 150px)`}
					defaultIsOpen={false}
					header={<>Validation Dataset</>}
				>
					<AudioFileTable files={audioFiles} />
				</NewAccordion>
				<NewAccordion bodyMaxHeight={`calc(33vh - 150px)`} defaultIsOpen={false} header={<>Testing Dataset</>}>
					<AudioFileTable files={audioFiles} />
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
