import Header from "../../../../../components/header/Header";
import ProjectForm from "../../../../../components/projectForm/ProjectForm";

function CreateNewProjectView() {
	return (
		<>
			<Header headerTitle={`New Project > Create New Project`} />
			<div className={`body-content-container-no-header-btns-no-footer`}>
				<ProjectForm
					heading={`Create New Project`}
					buttonText={{ isSubmitting: "Creating new project...", notSubmitting: "Create Project" }}
				/>
			</div>
		</>
	);
}

export default CreateNewProjectView;
