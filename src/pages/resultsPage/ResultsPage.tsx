import "./ResultsPage.scss";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import Footer, { type FooterBtnGroupT } from "../../components/footer/Footer";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";
import { getResultsPageFooters, getResultsPageHeadings, getResultsPageTabs } from "./resultsPageTabs";
import Header from "../../components/header/Header";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/setupStore";

const ResultsPage = () => {
	const [heading, setHeading] = useState<string>("");
	const [pageTabs, setPageTabs] = useState<PageTabT[]>([]);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [footer, setFooter] = useState<FooterBtnGroupT>({});

	const { pathname } = useLocation();
	const currentProject = useSelector((store: RootState) => store.projects.currentProject);

	useEffect(() => {
		setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
	}, [pageTabs, pathname]);

	useEffect(() => {
		if (currentProject) {
			setHeading(getResultsPageHeadings()[selectedTabIndex]);
			setFooter(getResultsPageFooters(currentProject.slug)[selectedTabIndex]);
		}
	}, [selectedTabIndex, currentProject]);

	useEffect(() => {
		if (currentProject) {
			setPageTabs(getResultsPageTabs(currentProject.slug));
		}
	}, [currentProject]);

	return (
		currentProject && (
			<>
				<Header headerTitle={`${currentProject.name || "Undefined Project"} > Results > ${heading}`} />
				<div className={`body-content-container-no-header-btns-with-footer Results_bodyContainer`}>
					<div className={"Results_bodyRow1"}>
						<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
					</div>
					<div className={"Results_bodyRow2"}>
						<Outlet />
					</div>
				</div>
				<Footer footerBtnGroup={footer} />
			</>
		)
	);
};

export default ResultsPage;
