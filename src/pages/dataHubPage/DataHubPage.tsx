import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks";
import { generalActions } from "../../redux/slices/GeneralSlice";
import { Link, Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { dataSetupRoute, dataVizRoute } from "../../routes";

export type DataSetupPageT = {
	data?: string;
};

export type DataHubContextT = {
	setHeading: React.Dispatch<React.SetStateAction<string>>;
};

const DataHubPage = (props: DataSetupPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const navigate = useNavigate();
	const [heading, setHeading] = useState<string>("");

	//tasks to be done before routing to default layout
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
					<h1>Fixed Header - {heading}</h1>
					<Link to={dataVizRoute(projectSlug)}>
						<button className={`btn btn-solid`}>Visualization</button>
					</Link>
					&nbsp;
					<Link to={dataSetupRoute(projectSlug)}>
						<button className={`btn btn-solid`}>DataSetup</button>
					</Link>
				</div>
				{/* The outlet would render with given context from the parent */}
				<Outlet context={{ setHeading } satisfies DataHubContextT} />
				<h1>Fixed Footer</h1>
			</>
		)
	);
};

export function useDataHubContext() {
	return useOutletContext<DataHubContextT>();
}

export default DataHubPage;
