import { projectOverviewRoute } from "../../routes";
import type { DisplayCardT } from "../../components/displayCard/DisplayCard";
import { mockProjects } from "./allProjects";
import type { ProjectDetails } from "../../service/RemoteService/client/bindings/ProjectDetails";

export const projectCards: ProjectDetails[] = [
	{
		id: 1,
		slug: "test_project",
		name: "Glass Break Detection",
		description:
			"We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.",
	},
	{
		id: 2,
		slug: "project-2",
		name: mockProjects[1].name,
		description:
			"We are developing a smart device for home pet monitoring. This device would detect the sounds of dog barking to notify the owners or take necessary actions.",
	},
	{
		id: 3,
		slug: "project-3",
		name: mockProjects[2].name,
		description:
			"We are improving the sensitivity of Alexa's wakeword detection. By increasing its detection accuracy, we aim to make the user interaction with the device more smooth and efficient.",
	},
	{
		id: 4,
		slug: "project-4",
		name: mockProjects[3].name,
		description:
			"We are developing a smart device that detects abnormal vibrations. The device can be used in various contexts such as industrial machinery monitoring or building stability assessment.",
	},
	{
		id: 5,
		slug: "project-5",
		name: mockProjects[4].name,
		description:
			"We are creating a wearable device that helps to monitor heart rhythms. The device aims to detect irregular heartbeat patterns to provide early warnings of potential health issues.",
	},
];
