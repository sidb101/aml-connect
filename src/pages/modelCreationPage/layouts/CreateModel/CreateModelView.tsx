import "./CreateModelView.scss";
import React, { useState } from "react";
import Canvas from "./components/canvas/Canvas";
import ParameterForm from "./components/parameterForm/ParameterForm";

export type CreateModelViewProps = {
	data?: string;
};

const CreateModelView = (props: CreateModelViewProps) => {
	const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

	return (
		<>
			<div className={showSideMenu ? `CreateModelView_smallCanvas` : `CreateModelView_fullCanvas`}>
				<Canvas setShowSideMenu={setShowSideMenu} />
			</div>
			{showSideMenu && (
				<div className={`CreateModelView_sideMenu`}>
					<ParameterForm />
				</div>
			)}
		</>
	);
};

export default CreateModelView;
