import Header from "../../../../../components/header/Header";
import ProjectForm from "../../../../../components/projectForm/ProjectForm";
import type { ReactNode } from "react";
import View from "../../../../../components/view/View";

function CreateNewProjectView() {
	const header: ReactNode = <Header headerTitle={`New Project > Create New Project`} />;
	const main: ReactNode = (
		<ProjectForm
			heading={`Create New Project`}
			buttonText={{ isSubmitting: "Creating new project...", notSubmitting: "Create Project" }}
		/>
	);

	return <View header={header} main={main} />;
}

export default CreateNewProjectView;
