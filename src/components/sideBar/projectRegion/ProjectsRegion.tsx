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
			<div key={index} className={"btn btn-solid ProjectsRegion_projectName"}>
				{/* TODO: Try to wrap this link across whole div */}
				<Link
					to={projectOverviewRoute(project.slug)}
					className={"ProjectsRegion_link"}
					data-testid={testIds.projectLinks}
				>
					{project.name}{" "}
				</Link>
			</div>
		))}
	</div>
);
