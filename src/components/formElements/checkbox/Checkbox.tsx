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

function Checkbox({ name, value, onChange, required, className = "", testId, checked }: CheckboxProps) {
	return (
		<label className={"Checkbox_label"}>
			<input
				type="checkbox"
				checked={checked}
				name={name}
				value={value}
				onChange={onChange}
				{...(required ? { required: true } : {})}
				className={`${className}`}
				data-testid={testId}
			/>
			<span className={`light-grey-panel`}></span>
		</label>
	);
}

export default Checkbox;
