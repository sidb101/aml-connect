import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer, { type FooterBtnGroupT } from "../../components/footer/Footer";
import "./ModelCreationPage.scss";
import Header from "../../components/header/Header";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";
import {
	getModelCreationPageFooters,
	getModelCreationPageHeadings,
	getModelCreationPageTabs,
} from "./modelCreationPageTabs";
import { useAppSelector } from "../../hooks";
import { selectCurrentProject } from "../../redux/slices/ProjectsSlice";

const ModelCreationPage = () => {
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
			setHeading(getModelCreationPageHeadings()[selectedTabIndex]);
			setFooter(getModelCreationPageFooters(currentProject.slug)[selectedTabIndex]);
		}
	}, [selectedTabIndex]);

	useEffect(() => {
		if (currentProject) {
			setPageTabs(getModelCreationPageTabs(currentProject.slug));
		}
	}, [currentProject]);

	return (
		currentProject && (
			<>
				<Header headerTitle={`${currentProject.name || "Undefined Project"} > Model Creation > ${heading}`} />
				<div className={`body-content-container-no-header-btns-with-footer ModelCreation_bodyContainer`}>
					<div className={"ModelCreation_bodyRow1"}>
						<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
					</div>
					<div className={"ModelCreation_bodyRow2"}>
						<Outlet />
					</div>
				</div>
				<Footer footerBtnGroup={footer} />
			</>
		)
	);
};

export default ModelCreationPage;
