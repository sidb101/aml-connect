import { Outlet } from "react-router-dom";

type LandingHubPageProps = {
	data?: string;
};

function LandingHubPage({ data }: LandingHubPageProps) {
	return <Outlet />;
}

export default LandingHubPage;
