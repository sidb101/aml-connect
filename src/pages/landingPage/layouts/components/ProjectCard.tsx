import "./ProjectCard.scss";
import { Link } from "react-router-dom";
import { projectOverviewRoute } from "../../../../routes";

export type ProjectCardT = {
	projectSlug: string;
	projectTitle: string;
	projectLabel?: string[];
	projectDescription: string;
};

type ProjectCardProps = {
	projectCard: ProjectCardT;
};

export default function ProjectCard({ projectCard }: ProjectCardProps) {
	return (
		<div className={`white-panel ProjectCard_container`}>
			<div className={`section-heading-text`}>{projectCard.projectTitle}</div>
			<div className={`ProjectCard_labels`}>
				{projectCard.projectLabel?.map((label: string, index: number) => (
					<label key={index} className={`ProjectCard_label`}>
						{label}
					</label>
				))}
			</div>
			<div className={`regular-text grey-text`}>{projectCard.projectDescription}</div>
			<div className={`ProjectCard_buttonContainer`}>
				<Link to={projectOverviewRoute(projectCard.projectSlug)} className={`ProjectCard_link`}>
					<button className={`btn btn-outline ProjectCard_button`}>Open Project</button>
				</Link>
			</div>
		</div>
	);
}
