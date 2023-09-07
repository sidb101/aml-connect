import React, { useState } from "react";
import "./Accordion.scss";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { testIds } from "../../tests/test-utils";

type AccordionProps = {
	defaultIsOpen?: boolean;
	header: React.ReactNode;
	bodyMaxHeight?: string;
	className?: string;
};

export const accordionActiveClass = "Accordion_active";

const Accordion: React.FC<React.PropsWithChildren<AccordionProps>> = ({
	defaultIsOpen = true,
	header,
	children,
	bodyMaxHeight,
	className = "",
}) => {
	const [isActive, setIsActive] = useState(defaultIsOpen);

	const active = isActive ? accordionActiveClass : "Accordion_inactive";

	const onTitleClick = () => {
		setIsActive(!isActive);
	};

	return (
		<div className={`white-panel Accordion_container ${className} ${active}`} data-testid={testIds.accordion}>
			<div className={`Accordion_headerContainer ${active}`} onClick={onTitleClick}>
				<div className={`section-heading-text Accordion_header`} data-testid={testIds.accordionHeader}>
					{header}
				</div>
				<i className={`green-text Accordion_dropdown`}>
					<FontAwesomeIcon icon={faAngleDown} />
				</i>
			</div>
			<div
				className={`Accordion_bodyContainer ${active}`}
				style={isActive ? { maxHeight: bodyMaxHeight } : {}}
				data-testid={testIds.accordionBody}
			>
				{children}
			</div>
		</div>
	);
};

export default Accordion;
