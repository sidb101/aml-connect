import "./ElementMenuItem.scss";
import React, { useState } from "react";
import type { ElementT } from "../../../../../redux/slices/ModelCreationSlice";
import { usePopper } from "react-popper";

type ElementMenuItemProps = {
	element: ElementT;
	onItemClick: (element: ElementT) => void;
};



const hoverClass = "ElementMenuItem_item__hovered"

function ElementMenuItem({ element, onItemClick }: ElementMenuItemProps) {
	const [isHovering, setIsHovering] = useState<boolean>(false);

	const [parentElement, setParentElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);


	const {styles, attributes} = usePopper(parentElement, popperElement, {
		placement: "right",
        modifiers: [
			{
				name: 'arrow', 
				options: {
					element: arrowElement,
				}
			},
			{
				name: 'offset',
				options: {
					offset: [0, 30]
				}
			}
		]
    })


	return (
		<div className="ElementMenuItem_container"
			onMouseEnter={() => {
				setIsHovering(true);
			}}
			onMouseLeave={() => {
				setIsHovering(false);
			}}
		>
		<div
			className={`regular-text ElementMenuItem_item ${isHovering ? hoverClass: ""}`}
			key={element.typeName}
			onClick={() => {
				onItemClick(element);
			}}
			ref={setParentElement}
		>
			{element.typeName}
		</div>
		{isHovering && (
			<div  ref={setPopperElement} style={styles.popper}
            {...attributes.popper}>
				<div className={`small-text ElementMenuItem_hoverDescription`}>{element.longDescription}</div>
				<div className={`ElementMenuItem_hoverDescriptionTriangle`} ref={setArrowElement} style={styles.arrow} ></div>
			</div>
		 )}
		</div>
	);
}

export default ElementMenuItem;
