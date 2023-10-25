import "./OverviewView.scss";
import OverviewForm from "./components/OverviewForm";
import DisplayPanel from "../../../components/displayPanel/DisplayPanel";
import ProjectForm from "../../../components/projectForm/ProjectForm";

type OverviewViewProps = {
	currentProjectName: string;
	onProjectTitleChange: (newProjectName: string) => void;
	currentProjectDescription: string;
};

const OverviewView = ({ currentProjectName, onProjectTitleChange, currentProjectDescription }: OverviewViewProps) => {
	return (
		<>
			<div className={`body-content-container-no-header-btns-with-footer`}>
				<ProjectForm heading={`Overview`} />
				<DisplayPanel heading={`Overview`}>
					<OverviewForm
						currentProjectName={currentProjectName}
						onProjectTitleChange={onProjectTitleChange}
						currentProjectDescription={currentProjectDescription}
					/>
				</DisplayPanel>
			</div>
		</>
	);
};

export default OverviewView;
