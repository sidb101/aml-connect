import SendToHardwareView from "./layouts/SendToHardwareView";
import { useAppSelector } from "../../hooks";
import { selectCurrentProject } from "../../redux/slices/ProjectsSlice";

export type SendToHardwarePageT = {
	data?: string;
};

const SendToHardwarePage = (props: SendToHardwarePageT) => {
	const currentProject = useAppSelector(selectCurrentProject);

	return (
		currentProject && (
			<SendToHardwareView title={`${currentProject.name} > Send to Hardware`} projectSlug={currentProject.slug} />
		)
	);
};

export default SendToHardwarePage;
