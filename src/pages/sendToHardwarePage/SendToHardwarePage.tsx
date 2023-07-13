import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { useParams } from "react-router-dom";
import { generalActions } from "../../redux/slices/GeneralSlice";
import SendToHardwareView from "./layouts/SendToHardwareView";

export type SendToHardwarePageT = {
	data?: string;
};

const SendToHardwarePage = (props: SendToHardwarePageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();

	useEffect(() => {
		projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("projectSlug not present in the URL.");
	}, [projectSlug]);

	return <SendToHardwareView />;
};

export default SendToHardwarePage;
