import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import { Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { dataVizRoute, projectOverviewRoute } from "../../routes";
import Footer, { type FooterBtnT } from "../../components/footer/Footer";
import "./DataHubPage.scss";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "./layouts/PageTabs/PageTabs";
import { getPageTabs } from "./layouts/pageTabs";
import Header from "../../components/header/Header";

export type DataSetupPageT = {
	data?: string;
};

export type DataHubContextT = {
	setHeading: React.Dispatch<React.SetStateAction<string>>;
	setFooter: React.Dispatch<React.SetStateAction<DataHubFooterT>>;
};

export type DataHubFooterT = {
	nextBtn: FooterBtnT;
	prevBtn: FooterBtnT;
};

const DataHubPage = (props: DataSetupPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug = "" } = useParams();
	const projectName = useAppSelector(selectCurrentProjectName);
	const { pathname } = useLocation();

	const [heading, setHeading] = useState<string>("");
	const [pageTabs, setPageTabs] = useState<PageTabT[]>([]);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [footer, setFooter] = useState<DataHubFooterT>({
		prevBtn: { label: "Overview", route: projectOverviewRoute(projectSlug) },
		nextBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
	});

	//tasks to be done for the whole data hub page
	useEffect(() => {
		if (projectSlug) {
			//Update the global state
			dispatch(generalActions.openProject(projectSlug));
			setPageTabs(getPageTabs(projectSlug));
		} else {
			console.error("projectSlug not present in the URL.");
		}
	}, [projectSlug]);

	useEffect(() => {
		setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
	}, [pageTabs, pathname]);

	return (
		projectSlug && (
			<>
				<Header headerTitle={`${projectName || "Undefined Project"} > Data Hub > ${heading}`} />
				<div className={`body-content-container-no-header-btns DataHub_bodyContainer`}>
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
				<Footer prevBtn={footer.prevBtn} nextBtn={footer.nextBtn} />
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
