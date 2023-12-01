import "./ResultsPage.scss";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
	projectActions,
	ProjectStatus,
	selectAllProjects,
	selectCurrentProjectDescription,
	selectCurrentProjectName,
	selectCurrentProjectStatus,
	selectIsProjectOpen,
} from "../../redux/slices/ProjectSlice";
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

	const navigate = useNavigate();
	const { projectSlug = "" } = useParams();
	const dispatch = useAppDispatch();
	const allProjects = useAppSelector(selectAllProjects);
	const currentProjectStatus = useAppSelector(selectCurrentProjectStatus);
	const currentProjectName = useAppSelector(selectCurrentProjectName);
	const isProjectOpen = useAppSelector(selectIsProjectOpen);
	const { pathname } = useLocation();

	useEffect(() => {
		if (allProjects.length > 0) {
			dispatch(projectActions.openProject(projectSlug));
		}
	}, [allProjects.length, projectSlug]);

	useEffect(() => {
		if (isProjectOpen) {
			setPageTabs(getResultsPageTabs(projectSlug));
		}

		if (projectSlug && currentProjectStatus === ProjectStatus.ERROR) {
			navigate("/error-page", { replace: true });
		}
	}, [projectSlug, isProjectOpen]);

	useEffect(() => {
		if (isProjectOpen) {
			setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
		}
	}, [pageTabs, pathname]);

	useEffect(() => {
		if (isProjectOpen) {
			setHeading(getResultsPageHeadings()[selectedTabIndex]);
			setFooter(getResultsPageFooters(projectSlug)[selectedTabIndex]);
		}
	}, [selectedTabIndex, currentProjectStatus]);

	const header = <Header headerTitle={`${currentProjectName} > Results > ${heading}`} />;
	const main = (
		<div className={`Results_bodyContainer`}>
			<div className={"Results_bodyRow1"}>
				<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
			</div>
			<div className={"Results_bodyRow2"}>
				{currentProjectName}
				<Outlet />
			</div>
		</div>
	);
	const footerElem = <Footer footerBtnGroup={footer} />;

	return isProjectOpen && <View header={header} main={main} footer={footerElem} />;
}

export default ResultsPage;
