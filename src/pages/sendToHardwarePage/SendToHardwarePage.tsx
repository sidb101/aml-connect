import { ProjectStatus, useRootOutletContext } from "../Root";
import { useEffect } from "react";

export type SendToHardwarePageT = {
	data?: string;
};

const SendToHardwarePage = (props: SendToHardwarePageT) => {
	const { setProjectStatus } = useRootOutletContext();

	useEffect(() => {
		setProjectStatus(ProjectStatus.OPENED);
	});

	return (
		<>
			<h1>SendToHardwarePage</h1>
		</>
	);
};

export default SendToHardwarePage;
