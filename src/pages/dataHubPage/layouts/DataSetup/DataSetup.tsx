import DataSetupView from "./DataSetupView";
import { useEffect } from "react";
import type { DataHubContextT } from "../../DataHubPage";
import { useDataHubContext } from "../../DataHubPage";
import { dataVizRoute, projectOverviewRoute } from "../../../../routes";
import { useAppSelector } from "../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../redux/slices/GeneralSlice";
import { audioFiles } from "../../../../tests/mockdata/allAudioFiles";

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
			prevBtn: { label: "Overview", route: projectOverviewRoute(projectSlug) },
			nextBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
		}));
	}, [projectSlug]);

	return <DataSetupView audioFiles={audioFiles} />;
};

export default DataSetup;
