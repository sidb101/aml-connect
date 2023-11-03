import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { projectActions, selectCurrentProjectName, selectIsProjectOpen } from "../../redux/slices/ProjectSlice";
import { Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { dataVizRoute, projectOverviewRoute } from "../../routes";
import Footer, { type FooterBtnGroupT } from "../../components/footer/Footer";
import "./DataHubPage.scss";
import Header from "../../components/header/Header";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";
import { getDataHubPageTabs } from "./dataHubPageTabs";

export type DataSetupPageT = {
	data?: string;
};

export type DataHubContextT = {
	setHeading: React.Dispatch<React.SetStateAction<string>>;
	setFooter: React.Dispatch<React.SetStateAction<FooterBtnGroupT>>;
};

const DataHubPage = (props: DataSetupPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug = "" } = useParams();
	const projectName = useAppSelector(selectCurrentProjectName);
	const isProjectOpen = useAppSelector(selectIsProjectOpen);
	const { pathname } = useLocation();

	const [heading, setHeading] = useState<string>("");
	const [pageTabs, setPageTabs] = useState<PageTabT[]>([]);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [footer, setFooter] = useState<FooterBtnGroupT>({
		prevBtn: { label: "Overview", route: projectOverviewRoute(projectSlug) },
		nextBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
	});

	//tasks to be done for the whole data hub page
	useEffect(() => {
		dispatch(projectActions.openProject(projectSlug));
		if (isProjectOpen) {
			setPageTabs(getDataHubPageTabs(projectSlug));
		}
	}, [projectSlug, isProjectOpen]);

	useEffect(() => {
		setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
	}, [pageTabs, pathname]);

	return (
		projectSlug && (
			<>
				<Header headerTitle={`${projectName || "Undefined Project"} > Data Hub > ${heading}`} />
				<div className={`body-content-container-no-header-btns-with-footer DataHub_bodyContainer`}>
					<div className={"DataHub_bodyRow1"}>
						<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
					</div>
					<div className={"DataHub_bodyRow2"}>
						{/* The outlet would render with given context from the parent */}
						<Outlet
							context={
								{
									setHeading,
									setFooter,
								} satisfies DataHubContextT
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
export function useDataHubContext() {
	return useOutletContext<DataHubContextT>();
}

export default DataHubPage;
