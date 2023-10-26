import "./DisplayCard.scss";
import { Link } from "react-router-dom";
import DisplayPanel from "../displayPanel/DisplayPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons/faCircleXmark";

export type DisplayCardT = {
	title: string;
	labels?: string[];
	description: string;
	buttonText: string;
	route: string;
	showCross?: boolean;
};

type DisplayCardProps = {
	displayCard: DisplayCardT;
};

export default function DisplayCard({ displayCard }: DisplayCardProps) {
	const { showCross = false } = displayCard;

	return (
		<DisplayPanel>
			<div className={`DisplayCard_container`}>
				<div className={`DisplayCard_headingContainer`}>
					<div className={`section-heading-text`}>{displayCard.title}</div>
					<i className={`green-text section-heading-text`}>
						{showCross && <FontAwesomeIcon icon={faCircleXmark} />}
					</i>
				</div>
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
