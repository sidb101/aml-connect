import type { ProjectDetails } from "service/RemoteService/client/bindings/ProjectDetails";
import type { ShallowProjectDetails } from "../../redux/slices/ProjectSlice";

export const returnedProjects: ProjectDetails[] = [
	{
		id: 0,
		slug: "test_project",
		name: "Glass Break Detection",
		description:
			"We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.",
		modified_at: new Date(Date.now()),
		created_at: new Date(Date.now()), 
	},
	{
		id: 1,
		slug: "project-2",
		name: "Dog Bark Detection",
		description: null,
		modified_at: new Date(Date.now()),
		created_at: new Date(Date.now()), 
	},
]

export const transformedProjects: ShallowProjectDetails[] = [
	{
		id: 0,
		slug: "test_project",
		name: "Glass Break Detection",
		description:
			"We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.",
	},
	{
		id: 1,
		slug: "project-2",
		name: "Dog Bark Detection",
		description: undefined,
	},
];

export const mockProjects: ShallowProjectDetails[] = [
	{
		id: 0,
		slug: "test_project",
		name: "Glass Break Detection",
		description:
			"We are developing a smart device for in-home surveillance. This device would detect the sounds of glass breaking to help trigger a security alert within our system.",
	},
	{
		id: 1,
		slug: "project-2",
		name: "Dog Bark Detection",
		description:
			"We are developing a smart device for home pet monitoring. This device would detect the sounds of dog barking to notify the owners or take necessary actions.",
	},
	{
		id: 2,
		slug: "project-3",
		name: "Alexa Wakeword Detection",
		description:
			"We are improving the sensitivity of Alexa's wakeword detection. By increasing its detection accuracy, we aim to make the user interaction with the device more smooth and efficient.",
	},
	{
		id: 3,
		slug: "project-4",
		name: "Vibration Detection",
		description:
			"We are developing a smart device that detects abnormal vibrations. The device can be used in various contexts such as industrial machinery monitoring or building stability assessment.",
	},
	{
		id: 4,
		slug: "project-5",
		name: "Irregular Heartbeat Detection",
		description:
			"We are creating a wearable device that helps to monitor heart rhythms. The device aims to detect irregular heartbeat patterns to provide early warnings of potential health issues.",
	},
];