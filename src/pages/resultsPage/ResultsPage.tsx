import { ProjectStatus, useRootOutletContext } from "../Root";
import { useEffect } from "react";

export type ResultsPageT = {
	data?: string;
};

const ResultsPage = (props: ResultsPageT) => {
	const { setProjectStatus } = useRootOutletContext();

	useEffect(() => {
		setProjectStatus(ProjectStatus.OPENED);
	});

	return (
		<>
			<h1>ResultsPage</h1>
		</>
	);
};

export default ResultsPage;
