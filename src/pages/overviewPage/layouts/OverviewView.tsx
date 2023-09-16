import "./OverviewView.scss";
import OverviewForm from "./components/OverviewForm";
import OverviewColumn from "./components/OverviewColumn";

type OverviewViewProps = {
	currentProjectName: string;
	onProjectTitleChange: (newProjectName: string) => void;
	currentProjectDescription: string;
};

const OverviewView = ({ currentProjectName, onProjectTitleChange, currentProjectDescription }: OverviewViewProps) => {
	return (
		<>
			<div className={`body-content-container-no-header-btns OverviewView_container`}>
				<OverviewColumn heading={`Overview`}>
					<OverviewForm
						currentProjectName={currentProjectName}
						onProjectTitleChange={onProjectTitleChange}
						currentProjectDescription={currentProjectDescription}
					/>
				</OverviewColumn>
			</div>
		</>
	);
};

export default OverviewView;
