import "./NavLink.scss";

export type NavLinkT = {
	label: string;
	route?: string;
	isEnabled?: boolean;
	isSelected?: boolean;
};

export const NavLink = ({ label, route, isEnabled = true, isSelected = false, ...props }: NavLinkT) => {
	const isSelectedClass = isSelected ? "NavLink_link___selected" : "";
	const isEnabledClass = isEnabled ? "NavLink_link___enabled" : "";

	return (
		<div className={"NavLink_container"}>
			<div className={`NavLink_link ${isSelectedClass} ${isEnabledClass}`} data-testid={"NavLink_label"}>
				{label}
			</div>
		</div>
	);
};
