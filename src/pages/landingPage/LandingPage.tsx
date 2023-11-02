import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions, ProjectStatus } from "../../redux/slices/GeneralSlice";
import LandingPageView from "./layouts/LandingView";
import { mockProjectCards } from "../../tests/mockdata/allProjectsMock";

type LandingPageProps = {
	data?: string;
};

const LandingPage = (props: LandingPageProps) => {
	const dispatch = useAppDispatch();
	const projectStatus = useAppSelector((state) => state.general.projectStatus);

	useEffect(() => {
		// dispatch action only if the status is NOT_OPEN
		projectStatus !== ProjectStatus.NOT_OPEN && dispatch(generalActions.closeProject());
	}, [projectStatus]);

	return (
		<>
			<LandingPageView projectCards={mockProjectCards} />
		</>
	);
};

export default LandingPage;
