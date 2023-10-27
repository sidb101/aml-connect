import SendToHardwareView from "./layouts/SendToHardwareView";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/setupStore";

export type SendToHardwarePageT = {
	data?: string;
};

const SendToHardwarePage = (props: SendToHardwarePageT) => {
	const currentProject = useSelector((store: RootState) => store.projects.currentProject);

	return (
		currentProject && (
			<SendToHardwareView title={`${currentProject.name} > Send to Hardware`} projectSlug={currentProject.slug} />
		)
	);
};

export default SendToHardwarePage;
