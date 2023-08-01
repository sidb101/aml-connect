import { type DisplayCardT } from "../../components/displayCard/DisplayCard";
import { projectOverviewRoute } from "../../routes";

export const projectCards: DisplayCardT[] = [
	{
		route: projectOverviewRoute("project-1"),
		title: "Glass Break Detection",
		labels: ["94.3% Accuracy", "97.6% True Positive Rate", "3sec in 24hr False Positive Rate"],
		description:
			"We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.",
		buttonText: "Open Project",
	},
];
