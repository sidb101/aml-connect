import "./ProjectsRegion.scss";
import { Link } from "react-router-dom";
import { projectOverviewRoute } from "../../../routes";
import React from "react";
import { testIds } from "../../../tests/test-utils";
import type { ProjectDetails } from "../../../service/RemoteService/client/bindings/ProjectDetails";

export type ProjectsRegionT = {
	projects: ProjectDetails[];
};

function ProjectsRegion({ projects }: ProjectsRegionT) {
	return (
		<div className={"ProjectsRegion_container"}>
			{projects.map((project: ProjectDetails) => (
				<Link key={project.id} to={projectOverviewRoute(project.slug)} data-testid={testIds.projectLinks}>
					<div className={"btn btn-solid ProjectsRegion_projectName"}>{project.name}</div>
				</Link>
			))}
		</div>
	);
}

export default ProjectsRegion;
