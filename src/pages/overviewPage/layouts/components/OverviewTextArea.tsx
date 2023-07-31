import React from "react";
import "./OverviewTextArea.scss";

const dummyText =
	"e.g. We are developing a smart device for in-home surveillance. This device would " +
	"detect the sounds of glass break to help trigger a security alert within our " +
	"system.\n\n" +
	"Our goal is create a model that can detect the sound of glass break with " +
	"90% accuracy.\n\n" +
	"This model would be deployed in devices that would ideally live " +
	"indoor environments with various distances from potential sources of glass " +
	"environments (windows, doors, etc).";

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
				placeholder={dummyText}
				value={value}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					onChange(e.target.value);
				}}
			></textarea>
		</>
	);
}
