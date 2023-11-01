// import "./ParameterForm.scss";
import type { ParameterT } from "../../redux/slices/ModelCreationSlice";
import { ParamTypeT, UIComponentT } from "../../redux/slices/ModelCreationSlice";
import React, { type ReactNode, useState } from "react";
import { transformedElements } from "../../tests/mockdata/allElementsMock";

export type ParameterFormT = {
	elementType: string;
	parameterInfo: Record<string, ParameterT>;
	defaultParams: Record<string, string>; //would be determined on runtime
};

function ParameterFormDriver() {
	return (
		<>
			{Object.entries(transformedElements).map(([elName, el], key) => {
				return el.parameters ? (
					<ParameterForm
						key={key}
						elementType={elName}
						parameterInfo={el.parameters}
						defaultParams={getParamObject(el.parameters)}
					/>
				) : (
					<></>
				);
			})}
		</>
	);
}

function ParameterForm({ defaultParams, parameterInfo, elementType, ...props }: ParameterFormT) {
	const [params, setParam] = useState<Record<string, string>>(defaultParams);

	const onTextBoxInputChange = (event: React.ChangeEvent<HTMLInputElement>, parameterName: string) => {
		setParam((oldParams) => {
			const newParams = { ...oldParams };
			newParams[parameterName] = event.target.value;
			return newParams;
		});
	};

	const onCheckBoxInputChange = (event: React.ChangeEvent<HTMLInputElement>, parameterName: string) => {
		setParam((oldParams) => {
			const newParams = { ...oldParams };
			newParams[parameterName] = event.target.checked.toString();
			return newParams;
		});
	};

	const onSelectInputChange = (event: React.ChangeEvent<HTMLSelectElement>, parameterName: string) => {
		setParam((oldParams) => {
			const newParams = { ...oldParams };
			newParams[parameterName] = event.target.value;
			return newParams;
		});
	};

	function getInput(paramName: string, param: ParameterT): ReactNode {
		switch (param.uiComponent) {
			case UIComponentT.TEXTBOX:
				return (
					<input
						type={`${param.parameterType === ParamTypeT.NUMBER ? "number" : "text"}`}
						value={params[paramName] || ""}
						onChange={(e) => {
							onTextBoxInputChange(e, paramName);
						}}
					/>
				);

			case UIComponentT.CHECKBOX:
				return (
					<input
						type={"checkbox"}
						checked={JSON.parse(params[paramName]) as boolean}
						onChange={(e) => {
							onCheckBoxInputChange(e, paramName);
						}}
					/>
				);
			case UIComponentT.DROPDOWN:
				return (
					<select
						onChange={(e) => {
							onSelectInputChange(e, paramName);
						}}
						value={params[paramName]}
					>
						{param.range?.map((option, key) =>
							option ? (
								<option value={option} key={key}>
									{" "}
									{option}{" "}
								</option>
							) : (
								<></>
							)
						)}
					</select>
				);

			default:
				return param.parameterType;
		}
	}

	return (
		<>
			<h1>ParameterForm - {elementType}</h1>
			{Object.entries(parameterInfo).map(([parameterName, val], key) => (
				<div key={key}>
					{parameterName}: {getInput(parameterName, val)}
					<br />
					<br />
				</div>
			))}

			<button
				onClick={() => {
					const typedParams: Record<string, unknown> = {};
					typedParams[elementType] = params;
					console.log(typedParams);
				}}
			>
				{" "}
				Submit{" "}
			</button>
		</>
	);
}

export const getParamObject = (paramInfo: Record<string, ParameterT>): Record<string, string> => {
	const paramEntries = Object.entries(paramInfo).map(([key, value]) => [key, value.default]);
	return Object.fromEntries(paramEntries) as Record<string, string>;
};

export default ParameterFormDriver;
