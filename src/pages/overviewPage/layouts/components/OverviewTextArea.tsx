import React from "react";
import "./OverviewTextArea.scss";

const descriptionPlaceholder =
	"For example:\n\nWe are developing a ...\nfor ...\n\nThis device would ...\nto ...\n\nOur goal is ...";

type OverviewTextAreaProps = {
	heading: string;
	value: string;
	onChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function OverviewTextArea({ heading, value, onChange }: OverviewTextAreaProps) {
	return (
		<>
			<div className={`green-text section-heading-text`}>{heading}</div>
			<textarea
				className={`regular-text light-grey-text light-grey-panel OverviewTextArea_textarea`}
				placeholder={descriptionPlaceholder}
				value={value}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					onChange(e.target.value);
				}}
			></textarea>
		</>
	);
}
