import CreateModelView from "./CreateModelView";
import Canvas from "./Canvas/Canvas";

function CreateModel() {
	return (
		<>
			<CreateModelView canvas={<Canvas />} />
		</>
	);
}

export default CreateModel;
