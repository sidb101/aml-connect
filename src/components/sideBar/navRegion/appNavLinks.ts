import type { NavLinkT } from "./navLink/NavLink";
import {
	dataHubRoute,
	dataSetupRoute,
	modelCreationRoute,
	createModelRoute,
	projectOverviewRoute,
	resultsRoute,
	sendToHardwareRoute,
	resultsAnalysisRoute,
	neuralNetworkRoute,
} from "../../../routes";

/**
 * This module will provide methods to various nav links used at different places in the app
 */

/**
 * Nav links for an open project
 * @param projectSlug: The project slug of project that is to be opened
 */
export const getOpenProjectNavLinks = (projectSlug: string): NavLinkT[] => [
	{
		label: "Overview",
		route: projectOverviewRoute(projectSlug),
	},
	{
		label: "Data Hub",
		route: dataSetupRoute(projectSlug),
		parentLink: { route: dataHubRoute(projectSlug) },
	},
	{
		label: "Neural Networks",
		route: neuralNetworkRoute(projectSlug),
	},
	{
		label: "Model Creation",
		route: createModelRoute(projectSlug),
		parentLink: { route: modelCreationRoute(projectSlug) },
	},
	{
		label: "Results",
		route: resultsAnalysisRoute(projectSlug),
		parentLink: { route: resultsRoute(projectSlug) },
	},
	{
		label: "Send to Hardware",
		route: sendToHardwareRoute(projectSlug),
	},
];
