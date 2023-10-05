import "./Dropdown.scss";
import React from "react";
import type { ElementT } from "../../../../../../tests/mockdata/getElementsMockData";
import DropdownOption from "./DropdownOption";

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
				<DropdownOption key={option.element_type} option={option} onOptionClick={onOptionClick} />
			))}
		</div>
	);
};

export default Dropdown;
