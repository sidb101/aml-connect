import React, { useState } from "react";
import "./Accordion.scss";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AccordionProps = {
	defaultIsOpen?: boolean;
	header: React.ReactNode;
	bodyMaxHeight?: string;
	className?: string;
};

export const accordionActiveClass = "Accordion_active";
export const accordionInactiveClass = "Accordion_inactive";

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

	const active = isActive ? accordionActiveClass : accordionInactiveClass;

	return (
		<div className={`white-panel Accordion_container ${className} ${active}`}>
			<div className={`Accordion_headerContainer ${active}`} onClick={onTitleClick}>
				<div className={`section-heading-text Accordion_header`}>{header}</div>
				<i className={`green-text Accordion_dropdown`}>
					<FontAwesomeIcon icon={faAngleDown} />
				</i>
			</div>
			<div className={`Accordion_body ${active}`} style={isActive ? { maxHeight: bodyMaxHeight } : {}}>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Accordion;
