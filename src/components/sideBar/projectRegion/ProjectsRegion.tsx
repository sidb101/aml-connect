import "./ProjectsRegion.scss";
import { Link } from "react-router-dom";
import { projectOverviewRoute } from "../../../routes";
import React from "react";
import type { BasicProjectDataT } from "../../../redux/slices/GeneralSlice";
import { testIds } from "../../../tests/test-utils";

export type ProjectsRegionT = {
	projects: BasicProjectDataT[];
};

export const ProjectsRegion = ({ projects, ...props }: ProjectsRegionT) => (
	<div className={"ProjectsRegion_container"}>
		{projects.map((project: BasicProjectDataT, index) => (
			<Link key={index} to={projectOverviewRoute(project.slug)} data-testid={testIds.projectLinks}>
				<div className={"ProjectsRegion_projectName btn btn-solid"}>{project.name}</div>
			</Link>
		))}
	</div>
);
