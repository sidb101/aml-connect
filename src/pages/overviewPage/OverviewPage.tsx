import { ProjectStatus, useRootOutletContext } from "../Root";
import { useEffect } from "react";

export type OverviewT = {
	data?: string;
	isNewProject?: boolean;
};

const OverviewPage = ({ isNewProject = false, ...props }: OverviewT) => {
	const { setProjectStatus } = useRootOutletContext();

	useEffect(() => {
		if (isNewProject) {
			setProjectStatus(ProjectStatus.NEW);
		} else {
			setProjectStatus(ProjectStatus.OPENED);
		}
	});

	return (
		<>
			<h1>OverviewPage</h1>
		</>
	);
};

export default OverviewPage;
