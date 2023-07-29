import { useEffect, useState } from "react";
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

	const reduxProjectName = useAppSelector(selectCurrentProjectName) || "";
	const [projectName, setProjectName] = useState<string>(reduxProjectName);

	function handleProjectNameOnChange(newProjectName: string): void {
		setProjectName(newProjectName);
	}

	useEffect(() => {
		pathname === NEW_PROJECT_ROUTE
			? dispatch(generalActions.newProject())
			: projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("Not a new-project, as well as projectSlug not present in the URL.");
	}, [projectSlug, pathname]);

	// This effect will set projectName to reduxProjectName whenever reduxProjectName changes
	useEffect(() => {
		setProjectName(reduxProjectName);
	}, [reduxProjectName]);

	return (
		projectSlug && (
			<OverviewView
				projectName={`${projectName}`}
				onProjectTitleChange={handleProjectNameOnChange}
				projectSlug={projectSlug}
			/>
		)
	);
};

export default OverviewPage;
