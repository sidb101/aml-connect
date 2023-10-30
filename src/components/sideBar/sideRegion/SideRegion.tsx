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
	sideRegion: SideRegionT;
};

function SideRegion({ sideRegion }: SideRegionProps) {
	const { heading, isVisible = true, region } = sideRegion;

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
