import type { NavSectionT } from "../NavSection/NavSection";

export const newProjectSection: NavSectionT = {
	heading: "New Project",
	navLinks: [
		{
			index: 0,
			label: "Overview",
			route: "",
			isEnabled: true,
		},
		{
			index: 1,
			label: "Data Hub",
			route: "",
			isEnabled: false,
		},
		{
			index: 2,
			label: "Model Creation",
			route: "",
			isEnabled: false,
		},
		{
			index: 3,
			label: "Results",
			route: "",
			isEnabled: false,
		},
		{
			index: 4,
			label: "Send to Hardware",
			route: "",
			isEnabled: false,
		},
	],
	selectedIndex: 0,
};
