import type { NavSectionT } from "../NavSection/NavSection";

export const newProjectSection: NavSectionT[] = [
	{
		heading: "New Project",
		isOpen: true,
		navLinks: [
			{
				label: "Overview",
				route: "",
				isEnabled: true,
				isSelected: true,
			},
			{
				label: "Data Hub",
				route: "",
				isEnabled: false,
			},
			{
				label: "Model Creation",
				route: "",
				isEnabled: false,
			},
			{
				label: "Results",
				route: "",
				isEnabled: false,
			},
			{
				label: "Send to Hardware",
				route: "",
				isEnabled: false,
			},
		],
		selectedIndex: 0,
	},
];
