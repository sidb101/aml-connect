import React from "react";
import "./OverviewInput.scss";

type OverviewInputProps = {
	heading: string;
	value: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function OverviewInput({ heading, value, onChange }: OverviewInputProps) {
	return (
		<>
			<div className={`green-text section-heading-text`}>{heading}</div>
			<input
				className={`regular-text light-grey-text light-grey-panel OverviewInput_input`}
				value={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					onChange(e.target.value);
				}}
			/>
		</>
	);
}
