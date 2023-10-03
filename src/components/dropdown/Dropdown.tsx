import "./Dropdown.scss";
import React from "react";
import ReactFlow, { type Node } from "reactflow";
import type { OptionT } from "../../tests/mockdata/allNodesAndEdges";

type DropdownProps = {
	options: string[];
	// options: OptionT[];
	onOptionClick: (option: string) => void;
	onClose: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onOptionClick, onClose }) => {
	return (
		<div
			className={`Dropdown_container`}
			onBlur={onClose} // close dropdown when it loses focus
			tabIndex={0}
			role="listbox"
		>
			{options.map((option, index) => (
				<div
					className={`regular-text Dropdown_option`}
					key={option}
					// key={option.label}
					onClick={() => {
						onOptionClick(option);
					}}
				>
					{option}
					{/*{option.menuLabel}*/}
				</div>
			))}
		</div>
	);
};

export default Dropdown;
