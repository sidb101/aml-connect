import {
	checkSeparationRoute,
	createModelRoute,
	dataVizRoute,
	makeYourNeuralNetRoute,
	resultsAnalysisRoute,
	runSimulationRoute,
	trainYourNeuralNetRoute,
} from "../../routes";
import type { PageTabT } from "../../components/pageTabs/PageTabs";
import type { FooterBtnGroupT } from "../../components/footer/Footer";

export const getModelCreationPageHeadings = (): string[] => [
	"Create Model",
	"Check Separation",
	"Make your Neural Net",
	"Train your Neural Net",
	"Run Simulation",
];

export const getModelCreationPageTabs = (projectSlug: string): PageTabT[] => [
	{
		label: getModelCreationPageHeadings()[0],
		route: createModelRoute(projectSlug),
	},
	{
		label: getModelCreationPageHeadings()[1],
		route: checkSeparationRoute(projectSlug),
	},
	{
		label: getModelCreationPageHeadings()[2],
		route: makeYourNeuralNetRoute(projectSlug),
	},
	{
		label: getModelCreationPageHeadings()[3],
		route: trainYourNeuralNetRoute(projectSlug),
	},
	{
		label: getModelCreationPageHeadings()[4],
		route: runSimulationRoute(projectSlug),
	},
];

export const getModelCreationPageFooters = (projectSlug: string): FooterBtnGroupT[] => [
	// Create Model
	{
		prevBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
		nextBtn: { label: getModelCreationPageHeadings()[1], route: checkSeparationRoute(projectSlug) },
	},
	// Check Separation
	{
		prevBtn: { label: getModelCreationPageHeadings()[0], route: createModelRoute(projectSlug) },
		nextBtn: { label: getModelCreationPageHeadings()[2], route: makeYourNeuralNetRoute(projectSlug) },
	},
	// Make your Neural Net
	{
		prevBtn: { label: getModelCreationPageHeadings()[1], route: checkSeparationRoute(projectSlug) },
		nextBtn: { label: getModelCreationPageHeadings()[3], route: trainYourNeuralNetRoute(projectSlug) },
	},
	// Train your Neural Net
	{
		prevBtn: { label: getModelCreationPageHeadings()[2], route: makeYourNeuralNetRoute(projectSlug) },
		nextBtn: { label: getModelCreationPageHeadings()[4], route: runSimulationRoute(projectSlug) },
	},
	// Run Simulation
	{
		prevBtn: { label: getModelCreationPageHeadings()[3], route: trainYourNeuralNetRoute(projectSlug) },
		nextBtn: { label: "Results Analysis", route: resultsAnalysisRoute(projectSlug) },
	},
];
