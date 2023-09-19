import "./DisplayPanel.scss";
import type { PropsWithChildren } from "react";

type DisplayPanelProps = {
	heading?: string;
};

export default function DisplayPanel({ heading, children }: PropsWithChildren<DisplayPanelProps>) {
	return (
		<div className={`white-panel DisplayPanel_container`}>
			{heading && <div className={`section-superheading-text DisplayPanel_heading`}>{heading}</div>}
			<div className={`DisplayPanel_body`}>{children}</div>
		</div>
	);
}
