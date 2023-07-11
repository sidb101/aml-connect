import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions, ProjectStatus } from "../../redux/slices/GeneralSlice";

export type LandingPageT = {
	data?: string;
};

const LandingPage = (props: LandingPageT) => {
	const dispatch = useAppDispatch();
	const projectStatus = useAppSelector((state) => state.general.projectStatus);

	useEffect(() => {
		//dispatch action only if the status is NOT_OPEN
		projectStatus !== ProjectStatus.NOT_OPEN && dispatch(generalActions.closeProject());
	}, [projectStatus]);
	return (
		<>
			<h1>Welcome to AnalogML Connect</h1>
		</>
	);
};

export default LandingPage;
