import { LandingPageHeader } from "./components/LandingPageHeader";
import "./LandingView.scss";
import Header from "../../../components/header/Header";
import DisplayCard, { type DisplayCardT } from "../../../components/displayCard/DisplayCard";

type LandingPageViewProps = {
	projectCards?: DisplayCardT[];
};

const LandingView = ({ projectCards }: LandingPageViewProps) => {
	return (
		<>
			<Header headerTitle={"Projects"} element={<LandingPageHeader />} />
			<div className={`body-content-container-no-footer`}>
				<div className={`main-content-container`}>
					<div className={`LandingView_container`}>
						{projectCards?.map((projectCard: DisplayCardT, index: number) => (
							<DisplayCard key={index} displayCard={projectCard} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingView;
