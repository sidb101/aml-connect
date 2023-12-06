import "./Toolbar.scss";
import React, { useEffect, useRef, useState } from "react";
import type { ElementT } from "../../../../../redux/slices/ModelCreationSlice";
import ElementMenu from "../ElementMenu/ElementMenu";

type ToolbarProps = {
	allElements: ElementT[];
	handleAddElement?: (element: ElementT) => void;
};

const Toolbar = ({ handleAddElement, allElements }: ToolbarProps) => {
	const [showElementMenu, setShowElementMenu] = useState<boolean>(false);

	const childRef = useRef<HTMLDivElement>(null);

	/**
	 * To close toolbar when clicked outside
	 */
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (childRef.current && !childRef.current.contains(event.target as Node)) {
				setShowElementMenu(false);
			}
		};

		window.addEventListener("click", handleClickOutside);

		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	// Handle the click event of the dropdown option.
	const addElementClick = (element: ElementT) => {
		handleAddElement?.(element);
		setShowElementMenu(false); // close the dropdown when an option is clicked
	};

	return (
		<>
			<div className={`Toolbar_container`}>
				<div className={`Toolbar_sideBtnContainer`}>
					<button
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							setShowElementMenu((s) => !s);
						}}
					>
						Add
					</button>
				</div>
				{showElementMenu && (
					<div className={`Toolbar_sideNodeMenuContainer`}>
						<ElementMenu
							childRef={childRef}
							elements={allElements}
							onMenuItemClick={addElementClick}
							onClose={() => {
								console.log("OnClopaw")
								setShowElementMenu(false);
							}}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default Toolbar;
