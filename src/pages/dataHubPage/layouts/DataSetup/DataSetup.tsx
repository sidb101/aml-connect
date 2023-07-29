import DataSetupView from "./DataSetupView";
import { useEffect } from "react";
import type { DataHubContextT } from "../../DataHubPage";
import { useDataHubContext } from "../../DataHubPage";
import { dataVizRoute, projectOverviewRoute } from "../../../../routes";
import { useAppSelector } from "../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../redux/slices/GeneralSlice";

export type DataSetupT = {
	data?: string;
};
const DataSetup = (props: DataSetupT) => {
	const { setHeading, setFooter }: DataHubContextT = useDataHubContext();
	const projectSlug = useAppSelector(selectCurrentProjectSlug);

	//Change the parent elements of DataHub as per the current view
	useEffect(() => {
		setHeading("Data Setup");
		setFooter((state) => ({
			...state,
			prevBtn: { label: "OverviewColumn", route: projectOverviewRoute(projectSlug) },
			nextBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
		}));
	}, [projectSlug]);

	return <DataSetupView />;
};

export default DataSetup;
