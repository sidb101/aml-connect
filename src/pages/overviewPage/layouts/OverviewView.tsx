import "./OverviewView.scss";
import OverviewForm from "./components/OverviewForm";
import DisplayPanel from "../../../components/displayPanel/DisplayPanel";

type OverviewViewProps = {
	currentProjectName: string;
	onProjectTitleChange: (newProjectName: string) => void;
	currentProjectDescription: string;
};

const OverviewView = ({ currentProjectName, onProjectTitleChange, currentProjectDescription }: OverviewViewProps) => {
	return (
		<>
			<div className={`body-content-container-no-header-btns-with-footer`}>
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
