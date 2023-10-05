import "./DropdownOption.scss";
import React, { useState } from "react";
import type { ElementT } from "../../../../../../tests/mockdata/getElementsMockData";

type OptionProps = {
	option: ElementT;
	onOptionClick: (option: ElementT) => void;
};

function DropdownOption({ option, onOptionClick }: OptionProps) {
	const [isHovering, setIsHovering] = useState<boolean>(false);

	return (
		<div
			className={`regular-text DropdownOption_option`}
			key={option.element_type}
			onClick={() => {
				onOptionClick(option);
			}}
			onMouseEnter={() => {
				setIsHovering(true);
			}}
			onMouseLeave={() => {
				setIsHovering(false);
			}}
		>
			{option.short_description}
			{isHovering && (
				<>
					<div className={`DropdownOption_hoverDescriptionTriangle`}></div>
					<div className={`small-text DropdownOption_hoverDescription`}>{option.long_description}</div>
				</>
			)}
		</div>
	);
}

export default DropdownOption;
