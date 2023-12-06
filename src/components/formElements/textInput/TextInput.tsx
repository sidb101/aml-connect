import React from "react";

type InputProps = {
	type: "text" | "number";
	name?: string;
	placeholder?: string;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	className?: string;
	testId?: string;
	min?: string;
	max?: string;
	step?: string;
};

function TextInput(props: InputProps) {
	return <input {...props} className={`regular-text  light-grey-panel ${props.className || ""}`} />;
}

export default TextInput;
