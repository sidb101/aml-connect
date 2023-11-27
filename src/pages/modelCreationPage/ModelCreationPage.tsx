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
import View from "../../components/view/View";

function ModelCreationPage() {
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

	//tasks to be done for the whole model creation page
	useEffect(() => {
		dispatch(projectActions.openProject(projectSlug));
		if (isProjectOpen) {
			setPageTabs(getModelCreationPageTabs(projectSlug));
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
			setHeading(getModelCreationPageHeadings()[selectedTabIndex]);
			setFooter(getModelCreationPageFooters(projectSlug)[selectedTabIndex]);
		}
	}, [selectedTabIndex, isProjectOpen]);

	useEffect(() => {
		if (allProjects.length > 0) {
			dispatch(projectActions.openProject(projectSlug));
		}
	}, [allProjects.length, projectSlug]);

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

	const header = <Header headerTitle={`${currentProjectName} > Model Creation > ${heading}`} />;
	const main = (
		<div className={`ModelCreation_bodyContainer`}>
			<div className={"ModelCreation_bodyRow1"}>
				<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
			</div>
			<div className={"ModelCreation_bodyRow2"}>
				<Outlet />
			</div>
		</div>
	);
	const footerElem = <Footer footerBtnGroup={footer} />;

	return isProjectOpen && <View header={header} main={main} footer={footerElem} />;
}

export default ModelCreationPage;
