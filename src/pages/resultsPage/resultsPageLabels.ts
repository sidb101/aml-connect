import { neuralNetworkRoute, resultsAnalysisRoute, resultsComparisonRoute, sendToHardwareRoute } from "../../routes";
import type { PageTabT } from "../../components/pageTabs/PageTabs";
import type { FooterBtnGroupT } from "../../components/footer/Footer";

export const getResultsPageHeadings = (): string[] => ["Results Analysis", "Results Comparison"];

export const getResultsPageTabs = (projectSlug: string): PageTabT[] => [
	{
		label: getResultsPageHeadings()[0],
		route: resultsAnalysisRoute(projectSlug),
	},
	{
		label: getResultsPageHeadings()[1],
		route: resultsComparisonRoute(projectSlug),
	},
];

export const getResultsPageFooters = (projectSlug: string): FooterBtnGroupT[] => [
	{
		prevBtn: { label: "Neural Networks", route: neuralNetworkRoute(projectSlug) },
		nextBtn: { label: getResultsPageHeadings()[1], route: resultsComparisonRoute(projectSlug) },
	},
	{
		prevBtn: { label: getResultsPageHeadings()[0], route: resultsAnalysisRoute(projectSlug) },
		nextBtn: { label: "Send To Hardware", route: sendToHardwareRoute(projectSlug) },
	},
];
