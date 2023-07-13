import type { NavLinkT } from "./navLink/NavLink";
import {
	dataHubRoute,
	modelCreationRoute,
	projectOverviewRoute,
	resultsRoute,
	sendToHardwareRoute,
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
		route: dataHubRoute(projectSlug),
	},
	{
		label: "Model Creation",
		route: modelCreationRoute(projectSlug),
	},
	{
		label: "Results",
		route: resultsRoute(projectSlug),
	},
	{
		label: "Send to Hardware",
		route: sendToHardwareRoute(projectSlug),
	},
];
