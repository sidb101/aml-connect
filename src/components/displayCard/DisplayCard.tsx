import "./DisplayCard.scss";
import { Link } from "react-router-dom";

export type DisplayCardT = {
	route: string;
	title: string;
	labels?: string[];
	description: string;
	buttonText: string;
};

type ProjectCardProps = {
	displayCard: DisplayCardT;
};

export default function DisplayCard({ displayCard }: ProjectCardProps) {
	return (
		<div className={`white-panel DisplayCard_container`}>
			<div className={`section-heading-text`}>{displayCard.title}</div>
			<div className={`DisplayCard_labels`}>
				{displayCard.labels?.map((label: string, index: number) => (
					<label key={index} className={`DisplayCard_label`}>
						{label}
					</label>
				))}
			</div>
			<div className={`regular-text grey-text`}>{displayCard.description}</div>
			<div className={`DisplayCard_buttonContainer`}>
				<Link to={displayCard.route} className={`DisplayCard_link`}>
					<button className={`btn btn-outline DisplayCard_button`}>{displayCard.buttonText}</button>
				</Link>
			</div>
		</div>
	);
}
