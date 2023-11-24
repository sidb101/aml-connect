import type { Node } from "reactflow";
import type { NodeDataT } from "../../../../../redux/slices/ModelCreationSlice";
import { modelCreationActions, selectNodeParams } from "../../../../../redux/slices/ModelCreationSlice";
import ParameterFormView from "./ParameterFormView";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";

type ParameterFormProps = {
	node?: Node<NodeDataT>;
	onSimulate?: () => void;
};

const ParameterForm = ({ node, onSimulate }: ParameterFormProps) => {
	if (node) {
		const dispatch = useAppDispatch();

		//get the parameters and its information from the global state
		const currentParams = useAppSelector((state) => selectNodeParams(state, node.id));
		const parameterInfo = useAppSelector(
			(state) => state.modelCreation.allElements[node.data.elementType].parameters
		);

		const handleParameterSave = (params: Record<string, string>) => {
			//save the parameters in the redux state
			dispatch(modelCreationActions.setParameters({ nodeId: node.id, params }));
		};

		return currentParams && parameterInfo ? (
			<ParameterFormView
				initialParamData={{
					params: currentParams,
					parameterInfo: parameterInfo,
				}}
				elementType={node.data.elementType}
				onParameterSave={handleParameterSave}
				onSimulate={node.data.elementType === "Sink" ? onSimulate : undefined}
			/>
		) : (
			<></>
		);
	}

	return <></>;
};

export default ParameterForm;
