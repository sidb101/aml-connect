import DataSetupView from "./DataSetupView";
import { useEffect } from "react";
import type { DataHubContextT } from "../../DataHubPage";
import { useDataHubContext } from "../../DataHubPage";
import { dataVizRoute, projectOverviewRoute } from "../../../../routes";

export type DataSetupT = {
	data?: string;
};
const DataSetup = (props: DataSetupT) => {
	const { setHeading, setFooter, projectSlug }: DataHubContextT = useDataHubContext();

	//Change the headers and footers of DataHub as per the current view
	useEffect(() => {
		setHeading("Data Setup");
		setFooter((state) => ({
			...state,
			prevBtn: { label: "Overview", route: projectOverviewRoute(projectSlug) },
			nextBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
		}));
	}, [projectSlug]);

	return (
		<>
			<DataSetupView />
		</>
	);
};

export default DataSetup;
