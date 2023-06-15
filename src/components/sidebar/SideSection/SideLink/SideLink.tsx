
export interface ISideLink{
    label: string;
    route?: string;
};

export const SideLink = ({label, route, ...props}: ISideLink) => {
    return (
        <>
            <h3>{label}</h3>
        </>
    );
}