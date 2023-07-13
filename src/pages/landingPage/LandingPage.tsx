import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions, ProjectStatus } from "../../redux/slices/GeneralSlice";
import LandingPageView from "./layouts/LandingView";

export type LandingPageT = {
	data?: string;
};

/**
 * It's the data component for the page to handle the redux states. Usually It shouldn't
 * contain the presentation styles.
 */
const LandingPage = (props: LandingPageT) => {
	const dispatch = useAppDispatch();
	const projectStatus = useAppSelector((state) => state.general.projectStatus);

	useEffect(() => {
		// dispatch action only if the status is NOT_OPEN
		projectStatus !== ProjectStatus.NOT_OPEN && dispatch(generalActions.closeProject());
	}, [projectStatus]);

	return (
		<>
			<LandingPageView />
		</>
	);
};

export default LandingPage;
