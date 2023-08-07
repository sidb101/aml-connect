import { type DisplayCardT } from "../../components/displayCard/DisplayCard";
import { projectOverviewRoute } from "../../routes";

export const projectCards: DisplayCardT[] = [
	{
		route: projectOverviewRoute("test_project"),
		title: "Glass Break Detection",
		labels: ["94.3% Accuracy", "97.6% True Positive Rate", "3sec in 24hr False Positive Rate"],
		description:
			"We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.",
		buttonText: "Open Project",
	},
	{
		route: projectOverviewRoute("project-2"),
		title: "Dog Bark Detection",
		labels: ["95.1% Accuracy", "96.3% True Positive Rate", "1sec in 24hr False Positive Rate"],
		description:
			"We are developing a smart device for home pet monitoring. This device would detect the sounds of dog barking to notify the owners or take necessary actions.",
		buttonText: "Open Project",
	},
	{
		route: projectOverviewRoute("project-3"),
		title: "Alexa Wakeword Detection",
		labels: ["96.4% Accuracy", "97.8% True Positive Rate", "2sec in 24hr False Positive Rate"],
		description:
			"We are improving the sensitivity of Alexa's wakeword detection. By increasing its detection accuracy, we aim to make the user interaction with the device more smooth and efficient.",
		buttonText: "Open Project",
	},
	{
		route: projectOverviewRoute("project-4"),
		title: "Vibration Detection",
		labels: ["97.2% Accuracy", "98.1% True Positive Rate", "1.5sec in 24hr False Positive Rate"],
		description:
			"We are developing a smart device that detects abnormal vibrations. The device can be used in various contexts such as industrial machinery monitoring or building stability assessment.",
		buttonText: "Open Project",
	},
	{
		route: projectOverviewRoute("project-5"),
		title: "Irregular Heartbeat Detection",
		labels: ["98.5% Accuracy", "99.2% True Positive Rate", "0.5sec in 24hr False Positive Rate"],
		description:
			"We are creating a wearable device that helps to monitor heart rhythms. The device aims to detect irregular heartbeat patterns to provide early warnings of potential health issues.",
		buttonText: "Open Project",
	},
];
