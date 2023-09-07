import type { PageTabT } from "./PageTabs/PageTabs";
import { modelRoute, neuralNetworkRoute } from "../../../routes";

export const getPageTabs = (projectSlug: string): PageTabT[] => {
	return [
		{
			label: "Model",
			route: modelRoute(projectSlug),
		},
		{
			label: "Neural Networks",
			route: neuralNetworkRoute(projectSlug),
		},
	];
};
