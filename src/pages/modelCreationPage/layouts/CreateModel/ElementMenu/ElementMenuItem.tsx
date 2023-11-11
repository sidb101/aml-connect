import "./ElementMenuItem.scss";
import React, { useState } from "react";
import type { ElementT } from "../../../../../redux/slices/ModelCreationSlice";

type ElementMenuItemProps = {
	element: ElementT;
	onItemClick: (element: ElementT) => void;
};

function ElementMenuItem({ element, onItemClick }: ElementMenuItemProps) {
	const [isHovering, setIsHovering] = useState<boolean>(false);

	return (
		<div
			className={`regular-text ElementMenuItem_item`}
			key={element.typeName}
			onClick={() => {
				onItemClick(element);
			}}
			onMouseEnter={() => {
				setIsHovering(true);
			}}
			onMouseLeave={() => {
				setIsHovering(false);
			}}
		>
			{element.typeName}
			{isHovering && (
				<>
					<div className={`ElementMenuItem_hoverDescriptionTriangle`}></div>
					<div className={`small-text ElementMenuItem_hoverDescription`}>{element.longDescription}</div>
				</>
			)}
		</div>
	);
}

export default ElementMenuItem;
