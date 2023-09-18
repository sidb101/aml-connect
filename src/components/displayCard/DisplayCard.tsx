import "./DisplayCard.scss";
import { Link } from "react-router-dom";
import DisplayPanel from "../displayPanel/DisplayPanel";

export type DisplayCardT = {
	title: string;
	labels?: string[];
	description: string;
	buttonText: string;
	route: string;
};

type DisplayCardProps = {
	displayCard: DisplayCardT;
};

export default function DisplayCard({ displayCard }: DisplayCardProps) {
	return (
		<DisplayPanel>
			<div className={`DisplayCard_container`}>
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
		</DisplayPanel>
	);
}
