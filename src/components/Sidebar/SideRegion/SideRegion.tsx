import "./SideRegion.scss";
import type { JSX } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

export type SideRegionT = {
	heading: string;
	region: JSX.Element | JSX.Element[]; // Any React Component to render in that region
};

export const SideRegion = ({ heading, region, ...props }: SideRegionT) => (
	<div className={"SideRegion_container"}>
		<div className={"small-text light-text SideRegion_heading"}>
			{heading} &nbsp;
			<FontAwesomeIcon icon={faChevronRight} />
		</div>
		{region}
	</div>
);
