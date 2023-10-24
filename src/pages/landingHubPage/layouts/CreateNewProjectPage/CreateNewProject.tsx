import { redirect, useNavigation } from "react-router-dom";
import { BASE_ROUTE } from "../../../../routes";
import CreateNewProjectForm from "./components/CreateNewProjectForm";
import Header from "../../../../components/header/Header";

function CreateNewProject() {
	return (
		<>
			<Header headerTitle={`New Project > Create New Project`} />
			<div className={`body-content-container-with-header-btns-no-footer`}>
				<div className={`main-content-container`}>
					<CreateNewProjectForm />
				</div>
			</div>
		</>
	);
}

export default CreateNewProject;
