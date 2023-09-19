import React from "react";
import "./FormInput.scss";

type OverviewInputProps = {
	heading: string;
	value: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function FormInput({ heading, value, onChange }: OverviewInputProps) {
	return (
		<>
			<div className={`green-text section-heading-text`}>{heading}</div>
			<input
				type={"text"}
				className={`regular-text light-grey-text light-grey-panel FormInput_input`}
				value={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					onChange(e.target.value);
				}}
			/>
		</>
	);
}
