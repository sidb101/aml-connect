import DataVizView from "./DataVizView";
import { type DataHubContextT, useDataHubContext } from "../../DataHubPage";
import { useEffect } from "react";
import { dataSetupRoute, createModelRoute } from "../../../../routes";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../redux/slices/ProjectSlice";

export type DataVizT = {
	data?: string;
};

const DataViz = (props: DataVizT) => {
	const { setHeading, setFooter }: DataHubContextT = useDataHubContext();
	const projectSlug = useAppSelector(selectCurrentProjectSlug);

	//Change the headers and footers of DataHub as per the current view
	useEffect(() => {
		setHeading("Visualize Data");
		setFooter((state) => ({
			...state,
			prevBtn: { label: "Data Setup", route: dataSetupRoute(projectSlug) },
			nextBtn: { label: "Create Model", route: createModelRoute(projectSlug) },
		}));
	}, [projectSlug]);

	return (
		<>
			<DataVizView />
		</>
	);
};

export default DataViz;
