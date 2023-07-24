import type { PageTabT } from "./NavTabs/PageTabs";
import { dataSetupRoute, dataVizRoute } from "../../../routes";

export const getPageTabs = (projectSlug: string): PageTabT[] => {
	return [
		{
			label: "Data Setup",
			route: dataSetupRoute(projectSlug),
		},
		{
			label: "Visualize Data",
			route: dataVizRoute(projectSlug),
		},
	];
};
