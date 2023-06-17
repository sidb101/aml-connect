import "./NavLink.scss";
export interface INavLink {
    label: string;
    route?: string;
    isEnabled?: boolean;
    isSelected?: boolean;
};

export const NavLink = ({label, route, isEnabled = true, isSelected = false, ...props}: INavLink) => {

    console.log(label,":", isSelected);
    const isSelectedClass = isSelected ? "NavLink_link___selected" : "";
    const isEnabledClass = isEnabled ? "NavLink_link___enabled" : "";

    return (
        <div className={"NavLink_container"}>
            <div className={`NavLink_link ${isSelectedClass} ${isEnabledClass}`}>{label}</div>
        </div>
    );
}