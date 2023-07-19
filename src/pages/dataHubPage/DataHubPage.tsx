import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions, selectCurrentProjectName } from "../../redux/slices/GeneralSlice";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { dataVizRoute, projectOverviewRoute } from "../../routes";
import Footer, { type FooterBtnT } from "../../components/footer/Footer";

export type DataSetupPageT = {
	data?: string;
};

export type DataHubContextT = {
	setHeading: React.Dispatch<React.SetStateAction<string>>;
	setFooter: React.Dispatch<React.SetStateAction<DataHubFooterT>>;
	projectSlug: string;
};

export type DataHubFooterT = {
	nextBtn: FooterBtnT;
	prevBtn: FooterBtnT;
};

const DataHubPage = (props: DataSetupPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug = "" } = useParams();
	const projectName = useAppSelector(selectCurrentProjectName);

	const [heading, setHeading] = useState<string>("");
	const [footer, setFooter] = useState<DataHubFooterT>({
		prevBtn: { label: "Overview", route: projectOverviewRoute(projectSlug) },
		nextBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
	});

	//tasks to be done for the whole data hub page
	useEffect(() => {
		if (projectSlug) {
			//Update the global state
			dispatch(generalActions.openProject(projectSlug));
		} else {
			console.error("projectSlug not present in the URL.");
		}
	}, [projectSlug]);

	return (
		projectSlug && (
			<>
				<div className={`header-content-container`}>
					<h1>
						{projectName} &gt; Data Hub &gt; {heading}
					</h1>
				</div>
				{/* The outlet would render with given context from the parent */}
				<Outlet context={{ setHeading, setFooter, projectSlug } satisfies DataHubContextT} />
				<Footer prevBtn={footer.prevBtn} nextBtn={footer.nextBtn} />
			</>
		)
	);
};

/**
 * Hook to use the data hub context passed to the Outlets.
 */
export function useDataHubContext() {
	return useOutletContext<DataHubContextT>();
}

export default DataHubPage;
