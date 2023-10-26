import { useResultsContext } from "../../ResultsPage";
import type { ResultsPageContextT } from "../../ResultsPage";
import { useEffect } from "react";
import { resultsAnalysisRoute, sendToHardwareRoute } from "../../../../routes";
import { useAppSelector } from "../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../redux/slices/ProjectsSlice";
import ResultsComparisonView from "./ResultsComparisonView";

type ResultsAnalysisProps = {
	data?: string;
};

const ResultsAnalysis = (props: ResultsAnalysisProps) => {
	const { setHeading, setFooter }: ResultsPageContextT = useResultsContext();
	const projectSlug = useAppSelector(selectCurrentProjectSlug);

	//Change the headers and footers of Model Creation as per the current view
	useEffect(() => {
		setHeading("Results Comparison");
		setFooter((state) => ({
			...state,
			prevBtn: { label: "Results Analysis", route: resultsAnalysisRoute(projectSlug) },
			nextBtn: { label: "Send To Hardware", route: sendToHardwareRoute(projectSlug) },
		}));
	}, [projectSlug]);

	return (
		<>
			<ResultsComparisonView />
		</>
	);
};

export default ResultsAnalysis;
