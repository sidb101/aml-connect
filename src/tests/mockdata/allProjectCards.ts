import { projectOverviewRoute } from "../../routes";
import type { ProjectCardT } from "../../components/projectCard/ProjectCard";

export const projectCards: ProjectCardT[] = [
	{
		route: projectOverviewRoute("project-1"),
		title: "Glass Break Detection",
		labels: ["94.3% Accuracy", "97.6% True Positive Rate", "3sec in 24hr False Positive Rate"],
		description:
			"We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.",
		buttonText: "Open Project",
	},
];
