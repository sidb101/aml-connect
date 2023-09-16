import "./ProjectCard.scss";
import { Link } from "react-router-dom";
import DisplayCard from "../displayCard/DisplayCard";

export type ProjectCardT = {
	title: string;
	labels?: string[];
	description: string;
	buttonText: string;
	route: string;
};

type ProjectCardProps = {
	projectCard: ProjectCardT;
};

export default function ProjectCard({ projectCard }: ProjectCardProps) {
	return (
		<DisplayCard title={projectCard.title}>
			<div className={`ProjectCard_labels`}>
				{projectCard.labels?.map((label: string, index: number) => (
					<label key={index} className={`ProjectCard_label`}>
						{label}
					</label>
				))}
			</div>
			<div className={`regular-text grey-text`}>{projectCard.description}</div>
			<div className={`ProjectCard_buttonContainer`}>
				<Link to={projectCard.route} className={`ProjectCard_link`}>
					<button className={`btn btn-outline ProjectCard_button`}>{projectCard.buttonText}</button>
				</Link>
			</div>
		</DisplayCard>
	);
}
