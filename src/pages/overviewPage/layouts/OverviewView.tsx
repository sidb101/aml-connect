import "./OverviewView.scss";
import ProjectForm from "../../../components/projectForm/ProjectForm";
import type { ProjectDetails } from "../../../service/RemoteService/client/bindings/ProjectDetails";

type OverviewViewProps = {
	currentProject: ProjectDetails;
};

const OverviewView = ({ currentProject }: OverviewViewProps) => {
	return (
		<div className={`body-content-container-no-header-btns-with-footer`}>
			<ProjectForm
				heading={`Overview`}
				projectName={currentProject.name}
				projectDescription={currentProject.description || undefined}
				buttonText={{ isSubmitting: "Saving...", notSubmitting: "Save" }}
			/>
		</div>
	);
};

export default OverviewView;
