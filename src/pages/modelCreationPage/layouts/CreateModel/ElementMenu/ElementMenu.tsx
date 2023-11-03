import "./ElementMenu.scss";
import React from "react";
import type { ElementT } from "../../../../../redux/slices/ModelCreationSlice";
import ElementMenuItem from "./ElementMenuItem";

type ElementMenuProps = {
	elements: ElementT[];
	onMenuItemClick: (element: ElementT) => void;
	onClose: () => void;
};

const ElementMenu: React.FC<ElementMenuProps> = ({ elements, onMenuItemClick, onClose }) => {
	return (
		<div
			className={`ElementMenu_container`}
			onBlur={onClose} // close menu when it loses focus
			tabIndex={0}
			role="listbox"
		>
			{elements.map((element, index) => (
				<ElementMenuItem key={index} element={element} onItemClick={onMenuItemClick} />
			))}
		</div>
	);
};

export default ElementMenu;
