import { ProjectStatus, useRootOutletContext } from "../Root";
import { useEffect } from "react";

export type LandingPageT = {
	data?: string;
};

const LandingPage = (props: LandingPageT) => {
	const { setProjectStatus } = useRootOutletContext();

	useEffect(() => {
		setProjectStatus(ProjectStatus.NOT_OPENED);
	});

	return (
		<>
			<h1>Welcome to AnalogML Connect</h1>
		</>
	);
};

export default LandingPage;
