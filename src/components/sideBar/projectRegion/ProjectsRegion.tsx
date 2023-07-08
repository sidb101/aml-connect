import "./ProjectsRegion.scss";
import { Link } from "react-router-dom";
import { PROJECT_SLUG, projectOverviewRoute } from "../../../routes";
import React from "react";

export type ProjectsRegionT = {
	projects: string[];
};

export const ProjectsRegion = ({ projects, ...props }: ProjectsRegionT) => (
	<div className={"ProjectsRegion_container"}>
		{projects.map((project: string, index) => (
			<div key={index} className={"btn btn-solid ProjectsRegion_projectName"}>
				{/* TODO: Try to wrap this link across whole div */}
				<Link to={projectOverviewRoute(PROJECT_SLUG)} className={"ProjectsRegion_link"}>
					{project}{" "}
				</Link>
			</div>
		))}
	</div>
);
