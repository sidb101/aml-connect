import "./CreateModelView.scss";
import React, { type ReactNode } from "react";

export type CreateModelViewProps = {
	canvas: ReactNode;
};

const CreateModelView = ({ canvas }: CreateModelViewProps) => {
	return <div className={`CreateModelView_canvas`}>{canvas}</div>;
};

export default CreateModelView;
