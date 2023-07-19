import DataVizView from "./DataVizView";
import { type DataHubContextT, useDataHubContext } from "../../DataHubPage";
import { useEffect } from "react";
import { dataSetupRoute, dataVizRoute, modelCreationRoute, projectOverviewRoute } from "../../../../routes";

export type DataVizT = {
	data?: string;
};

const DataViz = (props: DataVizT) => {
	const { setHeading, setFooter, projectSlug }: DataHubContextT = useDataHubContext();

	//Change the headers and footers of DataHub as per the current view
	useEffect(() => {
		setHeading("Data Visualization");
		setFooter((state) => ({
			...state,
			prevBtn: { label: "Data Setup", route: dataSetupRoute(projectSlug) },
			nextBtn: { label: "Model Creation", route: modelCreationRoute(projectSlug) },
		}));
	});

	return (
		<>
			<DataVizView />
		</>
	);
};

export default DataViz;
