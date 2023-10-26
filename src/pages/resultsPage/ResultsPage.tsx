import "./ResultsPage.scss";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/ProjectsSlice";
import ResultsView from "./layouts/ResultsView";
import Footer, { type FooterBtnGroupT } from "../../components/footer/Footer";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";
import { getResultsPageTabs } from "./resultsPageTabs";
import Header from "../../components/header/Header";

type ResultsPageProps = {
	data?: string;
};

export type ResultsPageContextT = {
	setHeading: React.Dispatch<React.SetStateAction<string>>;
	setFooter: React.Dispatch<React.SetStateAction<FooterBtnGroupT>>;
};

const ResultsPage = (props: ResultsPageProps) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const projectName = useAppSelector(selectCurrentProjectName) || "";
	const { pathname } = useLocation();

	const [heading, setHeading] = useState<string>("");
	const [pageTabs, setPageTabs] = useState<PageTabT[]>([]);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [footer, setFooter] = useState<FooterBtnGroupT>({});

	//tasks to be done for the whole model creation page
	useEffect(() => {
		if (projectSlug) {
			//Update the global state
			dispatch(generalActions.openProject(projectSlug));
			setPageTabs(getResultsPageTabs(projectSlug));
		} else {
			console.error("projectSlug not present in the URL.");
		}
	}, [projectSlug]);

	useEffect(() => {
		setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
	}, [pageTabs, pathname]);

	// return projectSlug && <ResultsView title={`${projectName} > Results`} projectSlug={projectSlug} />;
	return (
		projectSlug && (
			<>
				<Header headerTitle={`${projectName || "Undefined Project"} > Results > ${heading}`} />
				<div className={`body-content-container-no-header-btns-with-footer Results_bodyContainer`}>
					<div className={"Results_bodyRow1"}>
						<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
					</div>
					<div className={"Results_bodyRow2"}>
						{/* The outlet would render with given context from the parent */}
						<Outlet
							context={
								{
									setHeading,
									setFooter,
								} satisfies ResultsPageContextT
							}
						/>
					</div>
				</div>
				<Footer footerBtnGroup={footer} />
			</>
		)
	);
};

/**
 * Hook to use the data hub context passed to the Outlets.
 */
export function useResultsContext() {
	return useOutletContext<ResultsPageContextT>();
}

export default ResultsPage;
