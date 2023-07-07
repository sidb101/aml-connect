import type { NavSectionT } from "../navSection/NavSection";

export const newProjectSection: NavSectionT[] = [
	{
		heading: "New Project",
		isOpen: true,
		navLinks: [
			{
				label: "Overview",
				isEnabled: true,
				isSelected: true,
			},
			{
				label: "Data Hub",
				isEnabled: false,
			},
			{
				label: "Model Creation",
				isEnabled: false,
			},
			{
				label: "Results",
				isEnabled: false,
			},
			{
				label: "Send to Hardware",
				isEnabled: false,
			},
		],
		selectedIndex: 0,
	},
];
