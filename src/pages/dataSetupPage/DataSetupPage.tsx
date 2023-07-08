import { ProjectStatus, useRootOutletContext } from "../Root";
import { useEffect } from "react";

export type DataSetupPageT = {
	data?: string;
};

const DataSetupPage = (props: DataSetupPageT) => {
	const { setProjectStatus } = useRootOutletContext();

	useEffect(() => {
		setProjectStatus(ProjectStatus.OPENED);
	});
	return (
		<>
			<h1>DataSetupPage</h1>
		</>
	);
};

export default DataSetupPage;
