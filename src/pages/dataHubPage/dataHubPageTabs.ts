import { dataSetupRoute, dataVizRoute } from "../../routes";
import type { PageTabT } from "../../components/pageTabs/PageTabs";

export const getDataHubPageTabs = (projectSlug: string): PageTabT[] => [
	{
		label: "Data Setup",
		route: dataSetupRoute(projectSlug),
	},
	{
		label: "Visualize Data",
		route: dataVizRoute(projectSlug),
	},
];
