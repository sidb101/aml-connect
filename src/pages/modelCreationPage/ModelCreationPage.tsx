import { ProjectStatus, useRootOutletContext } from "../Root";
import { useEffect } from "react";

export type ModelCreationPageT = {
	data?: string;
};

const ModelCreationPage = (props: ModelCreationPageT) => {
	const { setProjectStatus } = useRootOutletContext();

	useEffect(() => {
		setProjectStatus(ProjectStatus.OPENED);
	});

	return (
		<>
			<h1>ModelCreationPage</h1>
		</>
	);
};

export default ModelCreationPage;
