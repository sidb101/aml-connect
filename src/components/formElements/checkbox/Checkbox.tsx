import React from "react";
import "./Checkbox.scss";

type CheckboxProps = {
	type?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	className?: string;
	testId?: string;
	checked?: boolean;
};

function Checkbox({
	type,
	name,
	placeholder,
	value,
	onChange,
	required,
	className = "",
	testId,
	checked,
}: CheckboxProps) {
	return (
		<label className={"custom-checkbox"}>
			<input
				type={type}
				checked={checked}
				name={name}
				placeholder={placeholder}
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
