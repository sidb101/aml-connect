import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import { useParams } from "react-router-dom";
import DataSetupView from "./layouts/DataSetupView";

export type DataSetupPageT = {
	data?: string;
};

const DataSetupPage = (props: DataSetupPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const generalState = useAppSelector((state) => state.general);
	const projectName = useAppSelector(selectCurrentProjectName) || "";

	useEffect(() => {
		projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("projectSlug not present in the URL.");
	}, [projectSlug]);

	return projectSlug && <DataSetupView title={`${projectName} > Data Hub`} projectSlug={projectSlug} />;
};

export default DataSetupPage;
