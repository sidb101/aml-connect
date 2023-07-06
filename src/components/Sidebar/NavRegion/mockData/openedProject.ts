import type { NavSectionT } from "../NavSection/NavSection";

const openProjectsSection: NavSectionT = {
	heading: "Glass Break Detection",
	navLinks: [
		{
			index: 0,
			label: "Overview",
			route: "/project/1/overview",
		},
		{
			index: 1,
			label: "Data Hub",
			route: "/project/1/data-hub",
		},
		{
			index: 2,
			label: "Model Creation",
			route: "/project/1/model-creation",
		},
		{
			index: 3,
			label: "Results",
			route: "/project/1/results",
		},
		{
			index: 4,
			label: "Send to Hardware",
			route: "/project/1/send-to-hardware",
		},
	],
};

export default openProjectsSection;
