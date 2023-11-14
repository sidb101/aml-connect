import "./CreateModelView.scss";
import React, { type ReactNode, useState } from "react";
import ParameterFormView from "./ParameterForm/ParameterFormView";

export type CreateModelViewProps = {
	canvas: ReactNode;
	form: ReactNode;
	showSideForm?: boolean;
};

const CreateModelView = ({ canvas, showSideForm = false, form }: CreateModelViewProps) => {
	return (
		<>
			<div className={showSideForm ? `CreateModelView_smallCanvas` : `CreateModelView_fullCanvas`}>{canvas}</div>
			{showSideForm && <div className={`CreateModelView_sideMenu`}>{form}</div>}
		</>
	);
};

export default CreateModelView;
