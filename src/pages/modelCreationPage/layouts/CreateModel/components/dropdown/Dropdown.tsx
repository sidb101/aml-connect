import "./Dropdown.scss";
import React from "react";
import ReactFlow, { type Node } from "reactflow";
import type { OptionT } from "../../../../../../tests/mockdata/allNodesAndEdges";
import type { ElementT } from "../../../../../../tests/mockdata/getElementsMockData";

type DropdownProps = {
	options: ElementT[];
	onOptionClick: (option: ElementT) => void;
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
					key={option.element_type}
					onClick={() => {
						onOptionClick(option);
					}}
				>
					{option.short_description}
				</div>
			))}
		</div>
	);
};

export default Dropdown;
