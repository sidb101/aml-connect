import "./ProjectsRegion.scss";
import { Link } from "react-router-dom";
import type React from "react";

export type ProjectsRegionT = {
	projects: string[];
	setProjectOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProjectsRegion = ({ projects, ...props }: ProjectsRegionT) => (
	<div className={"ProjectsRegion_container"}>
		{projects.map((project: string, index) => (
			<div
				key={index}
				className={"btn btn-solid ProjectsRegion_projectName"}
				onClick={() => {
					props.setProjectOpened(true);
				}}
			>
				<Link to={"/project/1/overview"}> {project} </Link>
			</div>
		))}
	</div>
);
