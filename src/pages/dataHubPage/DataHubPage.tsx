import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
	projectActions,
	ProjectStatus,
	selectAllProjects,
	selectCurrentProjectName,
	selectCurrentProjectStatus,
	selectIsProjectOpen,
} from "../../redux/slices/ProjectSlice";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer, { type FooterBtnGroupT } from "../../components/footer/Footer";
import "./DataHubPage.scss";
import Header from "../../components/header/Header";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";
import { getDataHubPageFooters, getDataHubPageHeadings, getDataHubPageTabs } from "./dataHubPageLabels";
import View from "../../components/view/View";

function DataHubPage() {
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

	//tasks to be done for the whole data hub page
	useEffect(() => {
		dispatch(projectActions.openProject(projectSlug));
		if (isProjectOpen) {
			setPageTabs(getDataHubPageTabs(projectSlug));
		}

		if (projectSlug && currentProjectStatus === ProjectStatus.ERROR) {
			navigate("/error-page", { replace: true });
		}
	}, [projectSlug, isProjectOpen]);

	useEffect(() => {
		setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
	}, [pageTabs, pathname]);

	useEffect(() => {
		if (isProjectOpen) {
			setHeading(getDataHubPageHeadings()[selectedTabIndex]);
			setFooter(getDataHubPageFooters(projectSlug)[selectedTabIndex]);
		}
	}, [selectedTabIndex, isProjectOpen]);

	useEffect(() => {
		if (allProjects.length > 0) {
			dispatch(projectActions.openProject(projectSlug));
		}
	}, [allProjects.length, projectSlug]);

	const header = <Header headerTitle={`${currentProjectName} > Data Hub > ${heading}`} />;
	const main = (
		<div className={`DataHub_bodyContainer`}>
			<div className={"DataHub_bodyRow1"}>
				<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
			</div>
			<div className={"DataHub_bodyRow2"}>
				<Outlet />
			</div>
		</div>
	);
	const footerElem = <Footer footerBtnGroup={footer} />;

	return isProjectOpen && <View header={header} main={main} footer={footerElem} />;
}

export default DataHubPage;
