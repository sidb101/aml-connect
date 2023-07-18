import DataSetupView from "./DataSetupView";
import { useEffect } from "react";
import type { DataHubContextT } from "../../DataHubPage";
import { useDataHubContext } from "../../DataHubPage";

export type DataSetupT = {
	data?: string;
};
const DataSetup = (props: DataSetupT) => {
	const { setHeading }: DataHubContextT = useDataHubContext();

	useEffect(() => {
		setHeading("DataSetup");
	});

	return (
		<>
			<DataSetupView />
		</>
	);
};

export default DataSetup;
