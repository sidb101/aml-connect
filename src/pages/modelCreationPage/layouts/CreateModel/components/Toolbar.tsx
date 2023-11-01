import "./Toolbar.scss";
import Dropdown, { type OptionT } from "../../../../../components/dropdown/Dropdown";
import React, { useEffect, useRef, useState } from "react";
import type { ElementT } from "../../../../../redux/slices/ModelCreationSlice";

export type ToolbarT = {
	allElements: ElementT[];
	handleAddElement?: (option: string) => void;
};

// TODO: Remove this and use all elements fetched from backend 'ElementT'
const allNodes: OptionT[] = [
	{
		label: "IN",
		menuLabel: "Input",
	},
	{
		label: "BPF",
		menuLabel: "Band Pass Filter",
	},
	{
		label: "GAIN",
		menuLabel: "Gain",
	},
	{
		label: "OUT",
		menuLabel: "Output",
	},
];

const Toolbar = ({ handleAddElement }: ToolbarT) => {
	const [showDropdown, setShowDropdown] = useState<boolean>(false);

	const toolBarRef = useRef<HTMLDivElement | null>(null);

	/**
	 * To close toolbar when clicked outside
	 */
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (toolBarRef.current && !toolBarRef.current.contains(event.target)) {
				setShowDropdown(false);
			}
		};

		window.addEventListener("click", handleClickOutside);

		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	// Handle the click event of the dropdown option.
	const addElementClick = (option: OptionT) => {
		handleAddElement?.(option.label);
		setShowDropdown(false); // close the dropdown when an option is clicked
	};

	return (
		<>
			<div className={`Toolbar_container`} ref={toolBarRef}>
				<div className={`Toolbar_sideContainer`}>
					<div className={`Toolbar_sideBtnContainer`}>
						<button
							onClick={() => {
								setShowDropdown((s) => !s);
							}}
						>
							+
						</button>
					</div>
				</div>
				<div className={`Toolbar_sideContainer`}>
					<div className={`Toolbar_sideNodeMenuContainer`}>
						{showDropdown && (
							<Dropdown
								options={allNodes}
								onOptionClick={addElementClick}
								onClose={() => {
									setShowDropdown(false);
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Toolbar;
