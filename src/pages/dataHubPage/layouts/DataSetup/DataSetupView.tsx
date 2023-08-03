import "./DataSetupView.scss";
import React from "react";
import AudioFileTable from "./AudioFileTable";
import Accordion from "../../../../components/accordion/Accordion";
import type { InputFileDataT } from "../../../../redux/slices/DataHubSlice";

export type DataSetupViewProps = {
	audioFiles?: InputFileDataT[];
};

const DataSetupView = ({ audioFiles }: DataSetupViewProps) => {
	return (
		<div className={`DataSetupView_container`}>
			<div className={`DataSetupView_leftContainer`}>
				<Accordion bodyMaxHeight={`calc(33vh - 150px)`} header={<>Training Dataset</>}>
					<AudioFileTable files={audioFiles} />
				</Accordion>
				<Accordion bodyMaxHeight={`calc(33vh - 150px)`} defaultIsOpen={false} header={<>Validation Dataset</>}>
					<AudioFileTable files={audioFiles} />
				</Accordion>
				<Accordion bodyMaxHeight={`calc(33vh - 150px)`} defaultIsOpen={false} header={<>Testing Dataset</>}>
					<AudioFileTable files={audioFiles} />
				</Accordion>
			</div>
			<div className={`DataSetupView_rightContainer`}>
				<Accordion header={<>Add or Merge Data</>}>
					<h4>Data Body</h4>
				</Accordion>
				<Accordion header={<>Label Data</>} defaultIsOpen={false}>
					<h4>Label Body</h4>
				</Accordion>
			</div>
		</div>
	);
};

export default DataSetupView;
