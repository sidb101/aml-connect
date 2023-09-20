import { modelRoute, neuralNetworkRoute } from "../../routes";
import type { PageTabT } from "../../components/pageTabs/PageTabs";

export const getModelCreationPageTabs = (projectSlug: string): PageTabT[] => [
	{
		label: "Create Model",
		route: modelRoute(projectSlug),
	},
	{
		label: "Neural Networks",
		route: neuralNetworkRoute(projectSlug),
	},
];
