import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import {
	projectActions,
	ProjectStatus,
	selectAllProjects,
	selectCurrentProjectName,
	selectCurrentProjectStatus,
} from "../../redux/slices/ProjectSlice";
import SendToHardwareView from "./layouts/SendToHardwareView";

export type SendToHardwarePageT = {
	data?: string;
};

const SendToHardwarePage = (props: SendToHardwarePageT) => {
	const navigate = useNavigate();
	const { projectSlug = "" } = useParams();
	const dispatch = useAppDispatch();
	const allProjects = useAppSelector(selectAllProjects);
	const currentProjectStatus = useAppSelector(selectCurrentProjectStatus);
	const currentProjectName = useAppSelector(selectCurrentProjectName);

	useEffect(() => {
		if (allProjects.length > 0) {
			dispatch(projectActions.openProject(projectSlug));
		}
	}, [allProjects.length, projectSlug]);

	useEffect(() => {
		if (currentProjectStatus === ProjectStatus.ERROR) {
			navigate("/error-page", { replace: true });
		}
	}, [currentProjectStatus]);

	return (
		currentProjectStatus === ProjectStatus.OPEN && (
			<SendToHardwareView title={`${currentProjectName} > Send to Hardware`} projectSlug={projectSlug} />
		)
	);
};

export default SendToHardwarePage;
