import "./ParameterFormView.scss";
import React, { type ReactNode, useEffect, useState } from "react";
import { type ParameterT, ParamTypeT, UIComponentT } from "../../../../../redux/slices/ModelCreationSlice";
import Input from "../../../../../components/formElements/input/Input";
import Checkbox from "../../../../../components/formElements/checkbox/Checkbox";
import Select from "../../../../../components/formElements/select/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";

type ParameterFormViewProps = {
	elementType?: string;
	initialParamData: ParameterDataT;
	onParameterSave?: (params: Record<string, string>) => void;
	onSimulate?: () => void;
};

type ParameterDataT = {
	parameterInfo: Record<string, ParameterT>;
	params: Record<string, string>; //would be determined on runtime
};

function ParameterFormView({ initialParamData, elementType, onParameterSave, onSimulate }: ParameterFormViewProps) {
	const [paramData, setParamData] = useState<ParameterDataT>({
		parameterInfo: initialParamData.parameterInfo,
		params: initialParamData.params,
	});

	//Change the form based on the default params.
	useEffect(() => {
		setParamData({
			parameterInfo: initialParamData.parameterInfo,
			params: initialParamData.params,
		});
	}, [initialParamData]);

	const onTextBoxInputChange = (event: React.ChangeEvent<HTMLInputElement>, parameterName: string) => {
		setParamData((oldData) => {
			const newData = { ...oldData, params: { ...oldData.params } };
			newData.params[parameterName] = event.target.value || "";
			return newData;
		});
	};

	const onCheckBoxInputChange = (event: React.ChangeEvent<HTMLInputElement>, parameterName: string) => {
		setParamData((oldData) => {
			const newData = { ...oldData, params: { ...oldData.params } };
			newData.params[parameterName] = event.target.checked.toString();
			return newData;
		});
	};

	const onSelectInputChange = (event: React.ChangeEvent<HTMLSelectElement>, parameterName: string) => {
		setParamData((oldData) => {
			const newData = { ...oldData, params: { ...oldData.params } };
			newData.params[parameterName] = event.target.value;
			return newData;
		});
	};

	function getInput(paramName: string, param: ParameterT): ReactNode {
		const { params } = paramData;
		switch (param.uiComponent) {
			case UIComponentT.TEXTBOX:
				return (
					<Input
						type={`${param.parameterType === ParamTypeT.NUMBER ? "number" : "text"}`}
						value={params[paramName] || ""}
						onChange={(e) => {
							onTextBoxInputChange(e, paramName);
						}}
						className={`general-padding`}
					/>
				);

			case UIComponentT.CHECKBOX:
				return (
					<Checkbox
						className={`general-padding`}
						type={"checkbox"}
						checked={JSON.parse(params[paramName]) as boolean}
						onChange={(e) => {
							onCheckBoxInputChange(e, paramName);
						}}
					/>
				);
			case UIComponentT.DROPDOWN:
				return (
					<Select
						onChange={(e) => {
							onSelectInputChange(e, paramName);
						}}
						value={params[paramName]}
						className={`general-padding`}
					>
						{param.range?.map((option, key) =>
							option ? (
								<option value={option} key={key} className={``}>
									{" "}
									{option}{" "}
								</option>
							) : (
								<></>
							)
						)}
					</Select>
				);

			default:
				return param.parameterType;
		}
	}

	return (
		<>
			{elementType ? (
				<div className={`white-panel ParameterForm_container`}>
					<div className={`section-subheading-text ParameterForm_headingContainer`}>
						<div>{elementType} Parameters</div>
						<FontAwesomeIcon icon={faTimes} />
					</div>
					<br />
					{Object.entries(paramData.parameterInfo).map(([parameterName, val], key) => (
						<div key={key} className={`ParameterForm_paramContainer`}>
							<label title={val.description}>
								{parameterName} {val.unit ? `(${val.unit})` : ""}:
							</label>{" "}
							{getInput(parameterName, val)}
						</div>
					))}
					<button
						className={`btn btn-outline`}
						onClick={() => {
							onParameterSave?.(paramData.params);
						}}
					>
						{" "}
						Submit{" "}
					</button>
					&nbsp;
					{onSimulate ? (
						<button
							onClick={() => {
								onSimulate();
							}}
						>
							Simulate
						</button>
					) : (
						<></>
					)}
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export default ParameterFormView;
