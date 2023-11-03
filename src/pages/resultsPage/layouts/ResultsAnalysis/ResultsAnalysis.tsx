import type { ResultsPageContextT } from "../../ResultsPage";
import { useResultsContext } from "../../ResultsPage";
import { useEffect } from "react";
import { neuralNetworkRoute, resultsComparisonRoute } from "../../../../routes";
import { useAppSelector } from "../../../../hooks";
import { selectCurrentProjectSlug } from "../../../../redux/slices/ProjectSlice";
import ResultsAnalysisView from "./ResultsAnalysisView";

type ResultsAnalysisProps = {
	data?: string;
};

const ResultsAnalysis = (props: ResultsAnalysisProps) => {
	const { setHeading, setFooter }: ResultsPageContextT = useResultsContext();
	const projectSlug = useAppSelector(selectCurrentProjectSlug);

	//Change the headers and footers of Model Creation as per the current view
	useEffect(() => {
		setHeading("Results Analysis");
		setFooter((state) => ({
			...state,
			prevBtn: { label: "Neural Networks", route: neuralNetworkRoute(projectSlug) },
			nextBtn: { label: "Results Comparison", route: resultsComparisonRoute(projectSlug) },
		}));
	}, [projectSlug]);

	return (
		<>
			<ResultsAnalysisView />
		</>
	);
};

export default ResultsAnalysis;
