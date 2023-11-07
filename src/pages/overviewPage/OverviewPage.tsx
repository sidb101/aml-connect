import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useLocation, useParams } from "react-router-dom";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import { dataSetupRoute, NEW_PROJECT_ROUTE } from "../../routes";
import OverviewView from "./layouts/OverviewView";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

export type OverviewT = {
	data?: string;
	isNewProject?: boolean;
};

const OverviewPage = ({ isNewProject = false, ...props }: OverviewT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const { pathname } = useLocation();

	const reduxProjectName = useAppSelector(selectCurrentProjectName) || "";
	const [currentProjectName, setCurrentProjectName] = useState<string>(reduxProjectName);
	const [currentProjectDescription, setCurrentProjectDescription] = useState<string>("");

	function handleProjectNameOnChange(newProjectName: string): void {
		setCurrentProjectName(newProjectName);
	}

	useEffect(() => {
		pathname === NEW_PROJECT_ROUTE
			? dispatch(generalActions.newProject())
			: projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("Not a new-project, as well as projectSlug not present in the URL.");
	}, [projectSlug, pathname]);

	// This effect will set currentProjectName to reduxProjectName whenever reduxProjectName changes
	useEffect(() => {
		setCurrentProjectName(reduxProjectName);
	}, [reduxProjectName]);

	return (
		projectSlug && (
			<>
				<Header headerTitle={`${currentProjectName} > Overview`} />
				<OverviewView
					currentProjectName={currentProjectName}
					onProjectTitleChange={handleProjectNameOnChange}
					currentProjectDescription={currentProjectDescription}
				/>
				<Footer footerBtnGroup={{ nextBtn: { label: "Data Hub", route: dataSetupRoute(projectSlug) } }} />
			</>
		)
	);
};

export default OverviewPage;
