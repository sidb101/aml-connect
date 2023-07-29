import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useLocation, useParams } from "react-router-dom";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import { NEW_PROJECT_ROUTE } from "../../routes";
import OverviewView from "./layouts/OverviewView";

export type OverviewT = {
	data?: string;
	isNewProject?: boolean;
};

const OverviewPage = ({ isNewProject = false, ...props }: OverviewT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const { pathname } = useLocation();
	const projectName = useAppSelector(selectCurrentProjectName) || "";

	useEffect(() => {
		pathname === NEW_PROJECT_ROUTE
			? dispatch(generalActions.newProject())
			: projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("Not a new-project, as well as projectSlug not present in the URL.");
	}, [projectSlug, pathname]);

	return projectSlug && <OverviewView title={`${projectName} > Overview`} projectSlug={projectSlug} />;
};

export default OverviewPage;
