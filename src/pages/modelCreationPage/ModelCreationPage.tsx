import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import ModelCreationView from "./layouts/ModelCreationView";

export type ModelCreationPageT = {
	data?: string;
};

const ModelCreationPage = (props: ModelCreationPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const projectName = useAppSelector(selectCurrentProjectName) || "";

	useEffect(() => {
		projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("projectSlug not present in the URL.");
	}, [projectSlug]);

	return projectSlug && <ModelCreationView title={`${projectName} > Model Creation`} projectSlug={projectSlug} />;
};

export default ModelCreationPage;
