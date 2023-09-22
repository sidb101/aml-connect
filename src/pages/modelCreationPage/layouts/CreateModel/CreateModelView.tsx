import "./CreateModelView.scss";
import React from "react";
import Canvas from "./components/Canvas";

export type CreateModelViewProps = {
	data?: string;
};

const CreateModelView = (props: CreateModelViewProps) => {
	return (
		<div className={`CreateModelView_canvas`}>
			<Canvas />
		</div>
	);
};

export default CreateModelView;
