import "./OverviewColumn.scss";
import type { PropsWithChildren } from "react";

type OverviewColumnProps = {
	heading: string;
};

export default function OverviewColumn({ heading, children }: PropsWithChildren<OverviewColumnProps>) {
	return (
		<div className={`white-panel OverviewColumn_container`}>
			<div className={`section-superheading-text OverviewColumn_heading`}>{heading}</div>
			<div className={`OverviewColumn_body`}>{children}</div>
		</div>
	);
}
