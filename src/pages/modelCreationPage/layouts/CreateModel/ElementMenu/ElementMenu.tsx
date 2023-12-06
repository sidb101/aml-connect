import "./ElementMenu.scss";
import React from "react";
import type { ElementT } from "../../../../../redux/slices/ModelCreationSlice";
import ElementMenuItem from "./ElementMenuItem";

type ElementMenuProps = {
	childRef: React.RefObject<HTMLDivElement>
	elements: ElementT[];
	onMenuItemClick: (element: ElementT) => void;
	onClose: () => void;
};

const ElementMenu: React.FC<ElementMenuProps> = ({ elements, onMenuItemClick, childRef, onClose }) => {
	return (
		<div
			ref={childRef}
			className={`ElementMenu_container`}
		>
			{elements.map((element, index) => (
				<ElementMenuItem key={index} element={element} onItemClick={onMenuItemClick} />
			))}
		</div>
	);
};

export default ElementMenu;
