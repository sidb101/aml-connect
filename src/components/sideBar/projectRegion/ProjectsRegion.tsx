import "./ProjectsRegion.scss";
import { Link } from "react-router-dom";
import { projectOverviewRoute } from "../../../routes";
import React from "react";
import { testIds } from "../../../tests/test-utils";
import type { ShallowProjectDetails } from "../../../redux/slices/ProjectSlice";

export type ProjectsRegionT = {
	projects: ShallowProjectDetails[];
};

function ProjectsRegion({ projects }: ProjectsRegionT) {
	return (
		<div className={"ProjectsRegion_container"}>
			{projects.map((project: ShallowProjectDetails) => (
				<Link key={project.id} to={projectOverviewRoute(project.slug)} data-testid={testIds.projectLinks}>
					<div className={"btn btn-solid ProjectsRegion_projectName"}>{project.name}</div>
				</Link>
			))}
		</div>
	);
}

export default ProjectsRegion;
