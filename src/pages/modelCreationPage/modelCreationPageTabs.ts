import { createModelRoute, dataVizRoute, neuralNetworkRoute, resultsAnalysisRoute } from "../../routes";
import type { PageTabT } from "../../components/pageTabs/PageTabs";
import type { FooterBtnGroupT } from "../../components/footer/Footer";

export const getModelCreationPageHeadings = (): string[] => ["Create Model", "Neural Networks"];

export const getModelCreationPageTabs = (projectSlug: string): PageTabT[] => [
	{
		label: getModelCreationPageHeadings()[0],
		route: createModelRoute(projectSlug),
	},
	{
		label: getModelCreationPageHeadings()[1],
		route: neuralNetworkRoute(projectSlug),
	},
];

export const getModelCreationPageFooters = (projectSlug: string): FooterBtnGroupT[] => [
	{
		prevBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
		nextBtn: { label: getModelCreationPageHeadings()[1], route: neuralNetworkRoute(projectSlug) },
	},
	{
		prevBtn: { label: getModelCreationPageHeadings()[0], route: createModelRoute(projectSlug) },
		nextBtn: { label: "Results Analysis", route: resultsAnalysisRoute(projectSlug) },
	},
];
