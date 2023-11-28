import React from "react";

type InputProps = {
	type?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	className?: string;
	testId?: string;
};

function Input({ type, name, placeholder, value, onChange, required, className = "", testId }: InputProps) {
	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			{...(required ? { required: true } : {})}
			className={`regular-text light-grey-text light-grey-panel ${className}`}
			data-testid={testId}
		/>
	);
}

export default Input;
