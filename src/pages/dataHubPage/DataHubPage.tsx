import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer, { type FooterBtnGroupT } from "../../components/footer/Footer";
import "./DataHubPage.scss";
import Header from "../../components/header/Header";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";
import { getDataHubPageFooters, getDataHubPageHeadings, getDataHubPageTabs } from "./dataHubPageLabels";
import { useAppSelector } from "../../hooks";
import { selectCurrentProject } from "../../redux/slices/ProjectsSlice";

const DataHubPage = () => {
	const [heading, setHeading] = useState<string>("");
	const [pageTabs, setPageTabs] = useState<PageTabT[]>([]);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [footer, setFooter] = useState<FooterBtnGroupT>({});

	const { pathname } = useLocation();
	const currentProject = useAppSelector(selectCurrentProject);

	useEffect(() => {
		setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
	}, [pageTabs, pathname]);

	useEffect(() => {
		if (currentProject) {
			setHeading(getDataHubPageHeadings()[selectedTabIndex]);
			setFooter(getDataHubPageFooters(currentProject.slug)[selectedTabIndex]);
		}
	}, [selectedTabIndex, currentProject]);

	useEffect(() => {
		if (currentProject) {
			setPageTabs(getDataHubPageTabs(currentProject.slug));
		}
	}, [currentProject]);

	return (
		currentProject && (
			<>
				<Header headerTitle={`${currentProject.name || "Undefined Project"} > Data Hub > ${heading}`} />
				<div className={`body-content-container-no-header-btns-with-footer DataHub_bodyContainer`}>
					<div className={"DataHub_bodyRow1"}>
						<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
					</div>
					<div className={"DataHub_bodyRow2"}>
						<Outlet />
					</div>
				</div>
				<Footer footerBtnGroup={footer} />
			</>
		)
	);
};

export default DataHubPage;
