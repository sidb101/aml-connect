import CreateModelView from "./CreateModelView";

export type ModelPageT = {
	data?: string;
};

const CreateModel = (props: ModelPageT) => {
	return (
		<>
			<CreateModelView />
		</>
	);
};

export default CreateModel;
