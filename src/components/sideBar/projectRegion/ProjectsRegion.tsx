import "./ProjectsRegion.scss";
import { Link } from "react-router-dom";
import { projectOverviewRoute } from "../../../routes";
import React from "react";
import { testIds } from "../../../tests/test-utils";
import type { ProjectDetails } from "../../../service/RemoteService/client/bindings/ProjectDetails";

export type ProjectsRegionT = {
	projects: ProjectDetails[];
	onClick: (project: ProjectDetails) => void;
};

function ProjectsRegion({ projects, onClick }: ProjectsRegionT) {
	return (
		<div className={"ProjectsRegion_container"}>
			{projects.map((project: ProjectDetails) => (
				<Link
					key={project.id}
					onClick={() => {
						onClick(project);
					}}
					to={projectOverviewRoute(project.slug)}
					data-testid={testIds.projectLinks}
				>
					<div className={"btn btn-solid ProjectsRegion_projectName"}>{project.name}</div>
				</Link>
			))}
		</div>
	);
}

export default ProjectsRegion;
