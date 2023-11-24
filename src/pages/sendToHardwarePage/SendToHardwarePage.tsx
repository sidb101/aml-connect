import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { projectActions, selectCurrentProjectName } from "../../redux/slices/ProjectSlice";
import SendToHardwareView from "./layouts/SendToHardwareView";

export type SendToHardwarePageT = {
	data?: string;
};

const SendToHardwarePage = (props: SendToHardwarePageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const projectName = useAppSelector(selectCurrentProjectName) || "";

	useEffect(() => {
		projectSlug
			? dispatch(projectActions.openProject(projectSlug))
			: console.error("projectSlug not present in the URL.");
	}, [projectSlug]);

	return projectSlug && <SendToHardwareView title={`${projectName} > Send to Hardware`} projectSlug={projectSlug} />;
};

export default SendToHardwarePage;
