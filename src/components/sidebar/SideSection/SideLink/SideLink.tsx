
export interface ISideLink{
    label: string;
    route?: string;
    isEnabled?: boolean;
};

export const SideLink = ({label, route, isEnabled = true, ...props}: ISideLink) => {
    return (
        <>
            <h3>{label}</h3>
        </>
    );
}