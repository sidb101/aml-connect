import "./DisplayCard.scss";
import { Form, Link } from "react-router-dom";
import DisplayPanel from "../displayPanel/DisplayPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons/faCircleXmark";
import { testIds } from "../../tests/test-utils";

export type DisplayCardFormT = {
	projectSlug: string;
};

export type DisplayCardT = {
	title: string;
	labels?: string[];
	description: string;
	buttonText: string;
	route: string;
	deletable?: {
		showCross: boolean;
		projectSlug: string;
	};
};

type DisplayCardProps = {
	displayCard: DisplayCardT;
};

export default function DisplayCard({ displayCard }: DisplayCardProps) {
	return (
		<DisplayPanel>
			<div className={`DisplayCard_container`}>
				<div className={`DisplayCard_headingContainer`}>
					<div className={`section-heading-text`} data-testid={testIds.displayCardLinks}>
						{displayCard.title}
					</div>
					{displayCard.deletable && (
						<Form method="DELETE">
							<input type="hidden" name="projectSlug" value={displayCard.deletable.projectSlug} />
							<button className={`green-text section-heading-text`}>
								<FontAwesomeIcon icon={faCircleXmark} className={`DisplayCard_cross`} />
							</button>
						</Form>
					)}
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
					<Link to={displayCard.route} className={`btn btn-outline DisplayCard_link`}>
						{displayCard.buttonText}
					</Link>
				</div>
			</div>
		</DisplayPanel>
	);
}
