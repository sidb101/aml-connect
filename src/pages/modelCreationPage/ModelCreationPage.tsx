import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { projectActions, selectCurrentProjectName, selectIsProjectOpen } from "../../redux/slices/ProjectSlice";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Footer, { type FooterBtnGroupT } from "../../components/footer/Footer";
import "./ModelCreationPage.scss";
import Header from "../../components/header/Header";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";
import remoteService from "../../service/RemoteService/RemoteService";
import { modelCreationActions } from "../../redux/slices/ModelCreationSlice";
import { generalActions } from "../../redux/slices/GeneralSlice";
import {
	getModelCreationPageFooters,
	getModelCreationPageHeadings,
	getModelCreationPageTabs,
} from "./modelCreationPageLabels";

function ModelCreationPage() {
	const [heading, setHeading] = useState<string>("");
	const [pageTabs, setPageTabs] = useState<PageTabT[]>([]);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [footer, setFooter] = useState<FooterBtnGroupT>({});

	const { pathname } = useLocation();
	const { projectSlug = "" } = useParams();

	const dispatch = useAppDispatch();

	const projectName = useAppSelector(selectCurrentProjectName);
	const isProjectOpen = useAppSelector(selectIsProjectOpen);

	//tasks to be done for the whole model creation page
	useEffect(() => {
		dispatch(projectActions.openProject(projectSlug));
		if (isProjectOpen) {
			setPageTabs(getModelCreationPageTabs(projectSlug));
		}
	}, [projectSlug, isProjectOpen]);

	useEffect(() => {
		setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
	}, [pageTabs, pathname]);

	useEffect(() => {
		if (isProjectOpen) {
			setHeading(getModelCreationPageHeadings()[selectedTabIndex]);
			setFooter(getModelCreationPageFooters(projectSlug)[selectedTabIndex]);
		}
	}, [selectedTabIndex, isProjectOpen]);

	/** Get all the elements to create the simulation network and persist them in the global state **/
	useEffect(() => {
		fetchAllElements().catch((e) => {
			console.error("Couldn't fetch all elements..", e);
		});
	}, []);

	const fetchAllElements = async () => {
		dispatch(generalActions.markLoading(true));
		const allElements = await remoteService.getAllElements();
		dispatch(modelCreationActions.setAllElements({ allElements }));
		dispatch(generalActions.markLoading(false));
	};

	return (
		projectSlug && (
			<>
				<Header headerTitle={`${projectName || "Undefined Project"} > Model Creation > ${heading}`} />
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
}

export default ModelCreationPage;
