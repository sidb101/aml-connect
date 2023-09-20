import { createModelRoute, neuralNetworkRoute } from "../../routes";
import type { PageTabT } from "../../components/pageTabs/PageTabs";

export const getModelCreationPageTabs = (projectSlug: string): PageTabT[] => [
	{
		label: "Create Model",
		route: createModelRoute(projectSlug),
	},
	{
		label: "Neural Networks",
		route: neuralNetworkRoute(projectSlug),
	},
];
