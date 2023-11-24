import "./ResultsPage.scss";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { projectActions, selectCurrentProjectName, selectIsProjectOpen } from "../../redux/slices/ProjectSlice";
import Footer, { type FooterBtnGroupT } from "../../components/footer/Footer";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";
import Header from "../../components/header/Header";
import { getResultsPageFooters, getResultsPageHeadings, getResultsPageTabs } from "./resultsPageLabels";
import View from "../../components/view/View";

function ResultsPage() {
	const [heading, setHeading] = useState<string>("");
	const [pageTabs, setPageTabs] = useState<PageTabT[]>([]);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [footer, setFooter] = useState<FooterBtnGroupT>({});

	const { pathname } = useLocation();
	const { projectSlug = "" } = useParams();

	const dispatch = useAppDispatch();

	const projectName = useAppSelector(selectCurrentProjectName) || "";
	const isProjectOpen = useAppSelector(selectIsProjectOpen);

	//tasks to be done for the whole model creation page
	useEffect(() => {
		dispatch(projectActions.openProject(projectSlug));
		if (isProjectOpen) {
			setPageTabs(getResultsPageTabs(projectSlug));
		}
	}, [projectSlug, isProjectOpen]);

	useEffect(() => {
		setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
	}, [pageTabs, pathname]);

	useEffect(() => {
		if (isProjectOpen) {
			setHeading(getResultsPageHeadings()[selectedTabIndex]);
			setFooter(getResultsPageFooters(projectSlug)[selectedTabIndex]);
		}
	}, [selectedTabIndex, isProjectOpen]);

	const header = <Header headerTitle={`${projectName || "Undefined Project"} > Results > ${heading}`} />;
	const main = (
		<div className={`Results_bodyContainer`}>
			<div className={"Results_bodyRow1"}>
				<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
			</div>
			<div className={"Results_bodyRow2"}>
				<Outlet />
			</div>
		</div>
	);
	const footerElem = <Footer footerBtnGroup={footer} />;

	return projectSlug && <View header={header} main={main} footer={footerElem} />;
}

export default ResultsPage;
