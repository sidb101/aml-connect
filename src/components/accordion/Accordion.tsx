import "./Accordion.scss";
import { type JSX, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";

export type AccordionT = {
	defaultIsOpen?: boolean;
	bodyElement?: JSX.Element | JSX.Element[];
	maxHeight?: string;
	headerElement?: JSX.Element | JSX.Element[];
	className?: string;
};

const Accordion = ({ defaultIsOpen = true, bodyElement, maxHeight, headerElement, className = "" }: AccordionT) => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

	const accBodyRef = useRef<HTMLDivElement>(null);

	const closeAccordionClassName = isOpen ? "" : "Accordion_container___closed";

	return (
		<div className={`white-panel Accordion_container ${closeAccordionClassName} ${className}`}>
			<div
				className={`Accordion_headerContainer`}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<div className={`section-heading-text Accordion_header`}>{headerElement}</div>
				<div className={`green-text Accordion_toggleBtn`}>
					<FontAwesomeIcon icon={faAngleUp} />
				</div>
			</div>
			<div
				className={`Accordion_bodyContainer`}
				ref={accBodyRef}
				style={
					isOpen && accBodyRef.current
						? {
								height: String(accBodyRef.current.scrollHeight) + "px",
								maxHeight: maxHeight,
						  }
						: {
								height: 0,
								maxHeight: maxHeight,
						  }
				}
			>
				{bodyElement}
			</div>
		</div>
	);
};

export default Accordion;
