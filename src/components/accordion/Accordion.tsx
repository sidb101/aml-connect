import "./Accordion.scss";
import { type JSX, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";

export type AccordionT = {
	defaultIsOpen?: boolean;
	bodyElement?: JSX.Element | JSX.Element[];
	headerElement?: JSX.Element | JSX.Element[];
	className?: string;
};

const Accordion = ({ defaultIsOpen = true, bodyElement, headerElement, className = "" }: AccordionT) => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

	const openAccordionClassName = isOpen ? "Accordion_container___open" : "";
	return (
		<div className={`white-panel Accordion_container ${openAccordionClassName} ${className}`}>
			<div className={`Accordion_headerContainer`}>
				<div className={`section-heading-text Accordion_header`}>{headerElement}</div>
				<div
					className={`green-text Accordion_toggleBtn`}
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
			</div>
			<div className={`Accordion_bodyContainer`}>{bodyElement}</div>
		</div>
	);
};

export default Accordion;
