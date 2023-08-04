import React, { useState } from "react";
import "./Accordion.scss";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AccordionProps = {
	defaultIsOpen?: boolean;
	header: React.ReactNode;
	bodyMaxHeight?: string;
	className?: string;
};

const Accordion: React.FC<React.PropsWithChildren<AccordionProps>> = ({
	defaultIsOpen = true,
	header,
	children,
	bodyMaxHeight,
	className = "",
}) => {
	const [isActive, setIsActive] = useState(defaultIsOpen);

	const onTitleClick = () => {
		setIsActive(!isActive);
	};

	const active = isActive ? "Accordion_active" : "Accordion_inactive";

	return (
		<div className={`white-panel Accordion_container ${className} ${active}`}>
			<div className={`Accordion_headerContainer ${active}`} onClick={onTitleClick}>
				<div className={`section-heading-text Accordion_header`}>{header}</div>
				<i className={`green-text Accordion_dropdown`}>
					<FontAwesomeIcon icon={faAngleUp} />
				</i>
			</div>
			<div className={`Accordion_bodyContainer ${active}`} style={isActive ? { maxHeight: bodyMaxHeight } : {}}>
				{children}
			</div>
		</div>
	);
};

export default Accordion;
