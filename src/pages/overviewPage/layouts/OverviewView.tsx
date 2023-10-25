import "./OverviewView.scss";
import ProjectForm from "../../../components/projectForm/ProjectForm";

type OverviewViewProps = {
	currentProjectName: string;
};

const OverviewView = ({ currentProjectName }: OverviewViewProps) => {
	return (
		<div className={`body-content-container-no-header-btns-with-footer`}>
			<ProjectForm
				heading={`Overview`}
				projectNamePlaceholder={currentProjectName}
				buttonText={{ isSubmitting: "Saving...", notSubmitting: "Save" }}
			/>
		</div>
	);
};

export default OverviewView;
