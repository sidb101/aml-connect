import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { projectActions, selectCurrentProjectName, selectIsProjectOpen } from "../../redux/slices/ProjectSlice";
import { Outlet, useLocation, useParams } from "react-router-dom";
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

	const { pathname } = useLocation();
	const { projectSlug = "" } = useParams();

	const dispatch = useAppDispatch();

	const projectName = useAppSelector(selectCurrentProjectName);
	const isProjectOpen = useAppSelector(selectIsProjectOpen);

	//tasks to be done for the whole data hub page
	useEffect(() => {
		dispatch(projectActions.openProject(projectSlug));
		if (isProjectOpen) {
			setPageTabs(getDataHubPageTabs(projectSlug));
		} else {
			console.error("projectSlug not present in the URL.");
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

	const header = <Header headerTitle={`${projectName || "Undefined Project"} > Data Hub > ${heading}`} />;
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

	return projectSlug && <View header={header} main={main} footer={footerElem} />;
}

export default DataHubPage;
