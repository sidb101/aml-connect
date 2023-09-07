import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import { Outlet, useLocation, useOutletContext, useParams } from "react-router-dom";
import { dataVizRoute, modelRoute, neuralNetworkRoute } from "../../routes";
import Footer, { type FooterBtnT } from "../../components/footer/Footer";
import "./ModelCreationPage.scss";
import Header from "../../components/header/Header";
import PageTabs, { getSelectedTabIndex, type PageTabT } from "../../components/pageTabs/PageTabs";

export type ModelCreationPageT = {
	data?: string;
};

export type ModelCreationPageFooterT = {
	nextBtn: FooterBtnT;
	prevBtn: FooterBtnT;
};

export type ModelCreationPageContextT = {
	setHeading: React.Dispatch<React.SetStateAction<string>>;
	setFooter: React.Dispatch<React.SetStateAction<ModelCreationPageFooterT>>;
};

const ModelCreationPage = (props: ModelCreationPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug = "" } = useParams();
	const projectName = useAppSelector(selectCurrentProjectName);
	const { pathname } = useLocation();

	const [heading, setHeading] = useState<string>("");
	const [pageTabs, setPageTabs] = useState<PageTabT[]>([]);
	const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
	const [footer, setFooter] = useState<ModelCreationPageFooterT>({
		prevBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
		nextBtn: { label: "Neural Networks", route: neuralNetworkRoute(projectSlug) },
	});

	//tasks to be done for the whole model creation page
	useEffect(() => {
		if (projectSlug) {
			//Update the global state
			dispatch(generalActions.openProject(projectSlug));
			setPageTabs(getPageTabs(projectSlug));
		} else {
			console.error("projectSlug not present in the URL.");
		}
	}, [projectSlug]);

	useEffect(() => {
		setSelectedTabIndex(getSelectedTabIndex(pageTabs, pathname));
	}, [pageTabs, pathname]);

	const getPageTabs = (projectSlug: string): PageTabT[] => {
		return [
			{
				label: "Model",
				route: modelRoute(projectSlug),
			},
			{
				label: "Neural Networks",
				route: neuralNetworkRoute(projectSlug),
			},
		];
	};

	return (
		projectSlug && (
			<>
				<Header headerTitle={`${projectName || "Undefined Project"} > Model Creation > ${heading}`} />
				<div className={`body-content-container-no-header-btns ModelCreation_bodyContainer`}>
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
				<Footer prevBtn={footer.prevBtn} nextBtn={footer.nextBtn} />
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
