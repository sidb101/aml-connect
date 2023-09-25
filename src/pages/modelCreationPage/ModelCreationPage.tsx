import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import { Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { dataVizRoute, neuralNetworkRoute } from "../../routes";
import Footer, { type FooterBtnGroupT } from "../../components/footer/Footer";
import "./ModelCreationPage.scss";
import Header from "../../components/header/Header";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";
import { getModelCreationPageTabs } from "./modelCreationPageTabs";

export type ModelCreationPageT = {
	data?: string;
};

export type ModelCreationPageContextT = {
	setHeading: React.Dispatch<React.SetStateAction<string>>;
	setFooter: React.Dispatch<React.SetStateAction<FooterBtnGroupT>>;
};

const ModelCreationPage = (props: ModelCreationPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug = "" } = useParams();
	const projectName = useAppSelector(selectCurrentProjectName);
	const { pathname } = useLocation();

	const [heading, setHeading] = useState<string>("");
	const [pageTabs, setPageTabs] = useState<PageTabT[]>([]);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [footer, setFooter] = useState<FooterBtnGroupT>({});

	//tasks to be done for the whole model creation page
	useEffect(() => {
		if (projectSlug) {
			//Update the global state
			dispatch(generalActions.openProject(projectSlug));
			setPageTabs(getModelCreationPageTabs(projectSlug));
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
				<Header headerTitle={`${projectName || "Undefined Project"} > Model Creation > ${heading}`} />
				<div className={`body-content-container-no-header-btns-with-footer ModelCreation_bodyContainer`}>
					<div className={"ModelCreation_bodyRow1"}>
						<PageTabs pageTabs={pageTabs} selectedTabIndex={selectedTabIndex} />
					</div>
					<div className={"ModelCreation_bodyRow2"}>
						{/* The outlet would render with given context from the parent */}
						<Outlet
							context={
								{
									setHeading,
									setFooter,
								} satisfies ModelCreationPageContextT
							}
						/>
					</div>
				</div>
				<Footer footerBtnGroup={footer} />
			</>
		)
	);
};

/**
 * Hook to use the data hub context passed to the Outlets.
 */
export function useModelCreationContext() {
	return useOutletContext<ModelCreationPageContextT>();
}

export default ModelCreationPage;
