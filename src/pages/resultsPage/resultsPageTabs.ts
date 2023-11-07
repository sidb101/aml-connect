import { resultsAnalysisRoute, resultsComparisonRoute } from "../../routes";
import type { PageTabT } from "../../components/pageTabs/PageTabs";

export const getResultsPageTabs = (projectSlug: string): PageTabT[] => [
	{
		label: "Results Analysis",
		route: resultsAnalysisRoute(projectSlug),
	},
	{
		label: "Results Comparison",
		route: resultsComparisonRoute(projectSlug),
	},
];
