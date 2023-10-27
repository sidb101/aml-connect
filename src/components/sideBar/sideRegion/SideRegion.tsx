import "./SideRegion.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import type { PropsWithChildren, ReactNode } from "react";

export type SideRegionT = {
	heading: string;
	isVisible?: boolean;
	region?: ReactNode;
};

type SideRegionProps = {
	heading: string;
	isVisible?: boolean;
};

export const SideRegion = ({ heading, children, isVisible = true }: PropsWithChildren<SideRegionProps>) =>
	isVisible && (
		<div className={"SideRegion_container"}>
			<div className={"small-text light-text SideRegion_heading"}>
				{heading} &nbsp;
				<FontAwesomeIcon icon={faChevronRight} />
			</div>
			{children}
		</div>
	);
