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