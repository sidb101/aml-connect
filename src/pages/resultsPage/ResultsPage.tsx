import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import ResultsView from "./layouts/ResultsView";

export type ResultsPageT = {
	data?: string;
};

const ResultsPage = (props: ResultsPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const projectName = useAppSelector(selectCurrentProjectName) || "";

	useEffect(() => {
		projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("projectSlug not present in the URL.");
	}, [projectSlug]);

	return projectSlug && <ResultsView title={`${projectName} > Results`} projectSlug={projectSlug} />;
};

export default ResultsPage;
