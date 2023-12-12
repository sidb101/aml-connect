import "./OverviewView.scss";
import ProjectForm from "../../../components/projectForm/ProjectForm";

type OverviewViewProps = {
	currentProjectName: string;
	currentProjectDescription?: string;
};

const OverviewView = ({ currentProjectName, currentProjectDescription }: OverviewViewProps) => {
	return (
		<ProjectForm
			heading={`Overview`}
			projectName={currentProjectName}
			projectDescription={currentProjectDescription}
			buttonText={{ isSubmitting: "Saving...", notSubmitting: "Save" }}
		/>
	);
};

export default OverviewView;
