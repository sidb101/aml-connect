import "./SideRegion.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import type { ReactNode } from "react";

export type SideRegionT = {
	heading: string;
	isVisible?: boolean;
	region?: ReactNode;
};

function SideRegion({ heading, isVisible = true, region }: SideRegionT) {
	return (
		isVisible && (
			<div className={"SideRegion_container"}>
				<div className={"small-text light-text SideRegion_heading"}>
					{heading} &nbsp;
					<FontAwesomeIcon icon={faChevronRight} />
				</div>
				{region}
			</div>
		)
	);
}

export default SideRegion;
