import "./DisplayCard.scss";
import { Link } from "react-router-dom";
import DisplayPanel from "../displayPanel/DisplayPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons/faCircleXmark";
import { testIds } from "../../tests/test-utils";
import { useState } from "react";
import TwoOptionForm from "../../pages/landingHubPage/layouts/LandingPage/layouts/components/twoOptionForm/TwoOptionForm";
import Backdrop from "../backdrop/Backdrop";

export type DisplayCardFormT = {
	projectId: string;
};

export type DisplayCardT = {
	title: string;
	labels?: string[];
	description: string;
	buttonText: string;
	route: string;
	deletable?: {
		showCross: boolean;
		projectId: number;
	};
};

type DisplayCardProps = {
	displayCard: DisplayCardT;
};

export default function DisplayCard({ displayCard }: DisplayCardProps) {
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

	return (
		<>
			{showConfirmation && (
				<Backdrop
					clickHandler={() => {
						setShowConfirmation(false);
					}}
				>
					{displayCard.deletable && (
						<TwoOptionForm
							title="Are you sure you want to delete this project?"
							onNoClick={() => {
								setShowConfirmation(false);
							}}
							projectId={displayCard.deletable.projectId}
						/>
					)}
				</Backdrop>
			)}
			<DisplayPanel>
				<div className={`DisplayCard_container`}>
					<div className={`DisplayCard_headingContainer`}>
						<div className={`section-heading-text`} data-testid={testIds.displayCardLinks}>
							{displayCard.title}
						</div>
						{displayCard.deletable && (
							<>
								<button
									className={`green-text section-heading-text`}
									onClick={() => {
										setShowConfirmation(true);
									}}
								>
									<FontAwesomeIcon icon={faCircleXmark} className={`DisplayCard_cross`} />
								</button>
							</>
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
		</>
	);
}
