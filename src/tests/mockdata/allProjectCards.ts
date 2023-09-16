import { projectOverviewRoute } from "../../routes";
import type { DisplayCardT } from "../../components/displayCard/DisplayCard";
import { mockProjects } from "./allProjects";

export const projectCards: DisplayCardT[] = [
	{
		route: projectOverviewRoute(mockProjects[0].slug),
		title: "Glass Break Detection",
		labels: ["94.3% Accuracy", "97.6% True Positive Rate", "3sec in 24hr False Positive Rate"],
		description:
			"We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.",
		buttonText: "Open Project",
	},
	{
		route: projectOverviewRoute(mockProjects[1].slug),
		title: mockProjects[1].name,
		labels: ["95.1% Accuracy", "96.3% True Positive Rate", "1sec in 24hr False Positive Rate"],
		description:
			"We are developing a smart device for home pet monitoring. This device would detect the sounds of dog barking to notify the owners or take necessary actions.",
		buttonText: "Open Project",
	},
	{
		route: projectOverviewRoute(mockProjects[2].slug),
		title: mockProjects[2].name,
		labels: ["96.4% Accuracy", "97.8% True Positive Rate", "2sec in 24hr False Positive Rate"],
		description:
			"We are improving the sensitivity of Alexa's wakeword detection. By increasing its detection accuracy, we aim to make the user interaction with the device more smooth and efficient.",
		buttonText: "Open Project",
	},
	{
		route: projectOverviewRoute(mockProjects[3].slug),
		title: mockProjects[3].name,
		labels: ["97.2% Accuracy", "98.1% True Positive Rate", "1.5sec in 24hr False Positive Rate"],
		description:
			"We are developing a smart device that detects abnormal vibrations. The device can be used in various contexts such as industrial machinery monitoring or building stability assessment.",
		buttonText: "Open Project",
	},
	{
		route: projectOverviewRoute(mockProjects[4].slug),
		title: mockProjects[4].name,
		labels: ["98.5% Accuracy", "99.2% True Positive Rate", "0.5sec in 24hr False Positive Rate"],
		description:
			"We are creating a wearable device that helps to monitor heart rhythms. The device aims to detect irregular heartbeat patterns to provide early warnings of potential health issues.",
		buttonText: "Open Project",
	},
];
