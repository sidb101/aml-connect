import "./DisplayCard.scss";
import type { PropsWithChildren } from "react";

type DisplayCardProps = {
	title: string;
};

export default function DisplayCard({ children, title }: PropsWithChildren<DisplayCardProps>) {
	return (
		<div className={`white-panel DisplayCard_container`}>
			<div className={`section-heading-text`}>{title}</div>
			{children}
		</div>
	);
}
