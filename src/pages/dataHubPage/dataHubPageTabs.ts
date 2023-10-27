import { createModelRoute, dataSetupRoute, dataVizRoute, projectOverviewRoute } from "../../routes";
import type { PageTabT } from "../../components/pageTabs/PageTabs";
import type { FooterBtnGroupT } from "../../components/footer/Footer";

export const getDataHubPageHeadings = (): string[] => ["Data Setup", "Visualize Data"];

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

export const getDataHubPageFooters = (projectSlug: string): FooterBtnGroupT[] => [
	{
		prevBtn: { label: "Overview", route: projectOverviewRoute(projectSlug) },
		nextBtn: { label: "Visualize Data", route: dataVizRoute(projectSlug) },
	},
	{
		prevBtn: { label: "Data Setup", route: dataSetupRoute(projectSlug) },
		nextBtn: { label: "Create Model", route: createModelRoute(projectSlug) },
	},
];
