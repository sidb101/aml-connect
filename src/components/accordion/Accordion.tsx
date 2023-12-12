import React, { useEffect, useState } from "react";
import "./Accordion.scss";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { testIds } from "../../tests/test-utils";

type AccordionProps = {
	defaultIsOpen?: boolean;
	header: React.ReactNode;
	maxBodyHeight?: string;
	className?: string;
	onOpen?: () => void; //called when an accordion is open
};

export const accordionActiveClass = "Accordion_active";
export const accordionInactiveClass = "Accordion_inactive";

const Accordion: React.FC<React.PropsWithChildren<AccordionProps>> = ({
	defaultIsOpen = true,
	header,
	children,
	maxBodyHeight,
	className = "",
	onOpen,
}) => {
	const [isActive, setIsActive] = useState(defaultIsOpen);

	const onTitleClick = () => {
		setIsActive(!isActive);
	};

	useEffect(() => {
		if (isActive) {
			onOpen?.(); //optional chain-> calls only if onOpen is defined (recommended TypeScript practice as opposed to using &&)
		}
	}, [isActive]);

	const active = isActive ? accordionActiveClass : accordionInactiveClass;

	return (
		<div className={`white-panel Accordion_container ${className} ${active}`} data-testid={testIds.accordion}>
			<div
				className={`Accordion_headerContainer ${active}`}
				data-testid={testIds.accordionHeaderContainer}
				onClick={onTitleClick}
			>
				<div className={`section-heading-text Accordion_header`} data-testid={testIds.accordionHeader}>
					{header}
				</div>
				<i className={`green-text Accordion_dropdown`}>
					<FontAwesomeIcon icon={faAngleDown} />
				</i>
			</div>
			<div
				className={`Accordion_bodyContainer ${active}`}
				style={isActive ? { maxHeight: maxBodyHeight } : {}}
				data-testid={testIds.accordionBody}
			>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Accordion;
