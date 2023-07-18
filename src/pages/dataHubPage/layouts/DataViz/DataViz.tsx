import DataVizView from "./DataVizView";
import { type DataHubContextT, useDataHubContext } from "../../DataHubPage";
import { useEffect } from "react";

export type DataVizT = {
	data?: string;
};

const DataViz = (props: DataVizT) => {
	const { setHeading }: DataHubContextT = useDataHubContext();

	useEffect(() => {
		setHeading("Data Visualization");
	});

	return (
		<>
			<DataVizView />
		</>
	);
};

export default DataViz;
