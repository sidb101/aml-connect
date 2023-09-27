import "./DatasetWidget.scss";
import AudioFileTable from "../AudioFileTable";
import Accordion from "../../../../../components/accordion/Accordion";
import { type ReactNode } from "react";
import { audioFiles } from "../../../../../tests/mockdata/allAudioFiles";
import type { DataSetT } from "../../../../../redux/slices/DataHubSlice";

export type DatasetWidgetProps = {
	widgetHeight?: string;
	datasetType: DataSetT;
	header?: ReactNode | ReactNode[];
	defaultIsOpen: boolean;
};

/**
 * Component to load the DataSet of given type. If the value in redux state is not present, then fetch it from
 * the server, else just use the values in the redux state.
 */
const DatasetWidget = ({ widgetHeight, datasetType, header, defaultIsOpen }: DatasetWidgetProps) => {
	return (
		widgetHeight && (
			<Accordion
				bodyMaxHeight={widgetHeight}
				header={header}
				onOpen={() => {
					console.log(datasetType + " Opened");
				}}
				defaultIsOpen={defaultIsOpen}
			>
				<AudioFileTable files={audioFiles} />
			</Accordion>
		)
	);
};

export default DatasetWidget;
