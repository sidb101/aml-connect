import "./DisplayPanel.scss";
import type { PropsWithChildren } from "react";

type DisplayPanelProps = {
	heading?: string;
	headingClass?: string;
};

export default function DisplayPanel({ heading, headingClass, children }: PropsWithChildren<DisplayPanelProps>) {
	return (
		<div className={`white-panel DisplayPanel_container`}>
			{heading && (
				<div className={`section-superheading-text DisplayPanel_heading ${headingClass || ""}`}>{heading}</div>
			)}
			<div className={`DisplayPanel_body`}>{children}</div>
		</div>
	);
}
