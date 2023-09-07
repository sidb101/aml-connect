import "./DataSetupView.scss";
import React, { useRef } from "react";
import AudioFileTable from "./AudioFileTable";
import Accordion from "../../../../components/accordion/Accordion";
import type { InputFileDataT } from "../../../../redux/slices/DataHubSlice";

export type DataSetupViewProps = {
	audioFiles?: InputFileDataT[];
};

const DataSetupView = ({ audioFiles }: DataSetupViewProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	//To dynamically resize the accordions
	const getContainerHeight = () => containerRef.current?.scrollHeight;
	//Gives height of a single accordion, considering the fraction of height allocated for that accordion
	const getAccHeight = (fraction: number) => `${(getContainerHeight() || 0) / fraction}px`;

	return (
		<div className={`DataSetupView_container`} ref={containerRef}>
			<div className={`DataSetupView_leftContainer`}>
				<Accordion bodyMaxHeight={getAccHeight(3)} header={<>Training Dataset</>}>
					<AudioFileTable files={audioFiles} />
				</Accordion>
				<Accordion bodyMaxHeight={getAccHeight(3)} defaultIsOpen={false} header={<>Validation Dataset</>}>
					<AudioFileTable files={audioFiles ? [audioFiles[0], audioFiles[1]] : []} />
				</Accordion>
				<Accordion bodyMaxHeight={getAccHeight(3)} defaultIsOpen={false} header={<>Testing Dataset</>}>
					<AudioFileTable files={audioFiles} />
				</Accordion>
			</div>
			<div className={`DataSetupView_rightContainer`}>
				<Accordion bodyMaxHeight={getAccHeight(2)} header={<>Add or Merge Data</>}>
					<h4>Data Body</h4>
				</Accordion>
				<Accordion bodyMaxHeight={getAccHeight(2)} header={<>Label Data</>} defaultIsOpen={false}>
					<h4>Label Body</h4>
				</Accordion>
			</div>
		</div>
	);
};

export default DataSetupView;
