import "./OverviewView.scss";
import Footer from "../../../components/footer/Footer";
import { dataSetupRoute } from "../../../routes";
import Header from "../../../components/header/Header";
import OverviewColumn from "./components/OverviewColumn";
import OverviewForm from "./components/OverviewForm";

export type OverviewViewT = {
	projectName: string;
	onProjectTitleChange: (newProjectName: string) => void;
	projectSlug: string;
};

const OverviewView = ({ projectName, onProjectTitleChange, projectSlug }: OverviewViewT) => {
	return (
		<>
			<Header headerTitle={`${projectName} > Overview`} />
			<div className={`body-content-container-no-header-btns OverviewView_container`}>
				<OverviewColumn heading={`Overview`}>
					<OverviewForm projectName={projectName} onProjectTitleChange={onProjectTitleChange} />
				</OverviewColumn>
				{/*<OverviewColumn heading={`Power Estimation`}>Power estimation</OverviewColumn>*/}
			</div>
			<Footer nextBtn={{ label: "Data Hub", route: dataSetupRoute(projectSlug) }} />
		</>
	);
};

export default OverviewView;
