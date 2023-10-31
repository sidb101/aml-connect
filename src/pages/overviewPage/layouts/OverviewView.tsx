import "./OverviewView.scss";
import ProjectForm from "../../../components/projectForm/ProjectForm";

type OverviewViewProps = {
	currentProjectName: string;
	currentProjectDescription: string | undefined;
};

const OverviewView = ({ currentProjectName, currentProjectDescription }: OverviewViewProps) => {
	return (
		<div className={`body-content-container-no-header-btns-with-footer`}>
			<ProjectForm
				heading={`Overview`}
				projectName={currentProjectName}
				projectDescription={currentProjectDescription}
				buttonText={{ isSubmitting: "Saving...", notSubmitting: "Save" }}
			/>
		</div>
	);
};

export default OverviewView;
