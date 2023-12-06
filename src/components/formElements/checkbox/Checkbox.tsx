import React from "react";
import "./Checkbox.scss";

type CheckboxProps = {
	name?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	className?: string;
	testId?: string;
	checked?: boolean;
};

function Checkbox(props : CheckboxProps) {
	return (
		<label className={"Checkbox_label"}>
			<input
				{...props}
				type="checkbox"
				className={`${props.className}`}
			/>
			<span className={`light-grey-panel`}></span>
		</label>
	);
}

export default Checkbox;
