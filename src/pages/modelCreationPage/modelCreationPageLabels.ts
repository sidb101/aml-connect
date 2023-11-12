import {
	createModelRoute,
	dataVizRoute,
	neuralNetworkRoute,
	resultsAnalysisRoute,
	runSimulationRoute,
} from "../../routes";
import type { PageTabT } from "../../components/pageTabs/PageTabs";
import type { FooterBtnGroupT } from "../../components/footer/Footer";

export const getModelCreationPageHeadings = (): string[] => ["Create Model", "Run Simulation"];

export const getModelCreationPageTabs = (projectSlug: string): PageTabT[] => [
	{
		label: getModelCreationPageHeadings()[0],
		route: createModelRoute(projectSlug),
	},
	{
		label: getModelCreationPageHeadings()[1],
		route: runSimulationRoute(projectSlug),
	},
];

export const getModelCreationPageFooters = (projectSlug: string): FooterBtnGroupT[] => [
	{
		prevBtn: { label: "Neural Networks", route: neuralNetworkRoute(projectSlug) },
		nextBtn: { label: getModelCreationPageHeadings()[1], route: runSimulationRoute(projectSlug) },
	},
	{
		prevBtn: { label: getModelCreationPageHeadings()[0], route: createModelRoute(projectSlug) },
		nextBtn: { label: "Results Analysis", route: resultsAnalysisRoute(projectSlug) },
	},
];
