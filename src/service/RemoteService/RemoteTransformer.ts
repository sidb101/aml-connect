import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";
import { DataSetT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "./client/bindings/FilesUploadRequest";
import type { FilesUploadResponse } from "./client/bindings/FilesUploadResponse";
import type { GetFilesRequest } from "./client/bindings/GetFilesRequest";
import type { GetFilesResponse } from "./client/bindings/GetFilesResponse";
import {
	DirectionT,
	type ElementT,
	type NetworkT,
	type NodeDataT,
	type ParameterT,
	ParamTypeT,
	RangeT,
	type TerminalT,
	UIComponentT,
} from "../../redux/slices/ModelCreationSlice";
import type { ElementMetadata } from "./client/bindings/ElementMetadata";
import type { SimulateNetworkRequest } from "./client/bindings/SimulateNetworkRequest";
import type { Terminal } from "./client/bindings/Terminal";
import type { Edge, Node } from "reactflow";
import type { SimulateNetworkResponse } from "./client/bindings/SimulateNetworkResponse";
import type { NetworkVO } from "./client/bindings/NetworkVO";
import { USER_ID } from "../../constants";
import type { ShallowProjectDetails } from "redux/slices/ProjectSlice";
import type { GetProjectsResponse } from "./client/bindings/GetProjectsResponse";
import { getTerminalType } from "../../pages/modelCreationPage/layouts/CreateModel/Canvas/canvasUtils";
/* eslint-disable  @typescript-eslint/naming-convention */

/***
 * This object would convert the UI objects to Data Transfer Objects (DTO) that can be used to communicate with the
 * Remote backend.
 */
const remoteTransformer = {
	createFilesUploadRequest(projectSlug: string, inputFiles: InputFileDataT[], dataSet: DataSetT): FilesUploadRequest {
		return {
			proj_slug: projectSlug,
			input_files: inputFiles.map((inputFile) => ({
				file_name: inputFile.metadata.name,
				dataset_type: dataSet,
			})),
		};
	},

	parseSuccessFilesUploadResponse(
		filesUploadResponse: FilesUploadResponse,
		inputFiles: InputFileDataT[]
	): InputFileDataT[] {
		const successfulUploads = filesUploadResponse.upload_success_files;
		return inputFiles.filter((inputFile) =>
			successfulUploads.find((successFile) => successFile.file_name === inputFile.metadata.name)
		);
	},

	createFilesGetRequest(projectSlug: string, dataSet: DataSetT): GetFilesRequest {
		return {
			proj_slug: projectSlug,
			dataset_type: dataSet,
		};
	},

	parseFilesGetResponse(filesGetResponse: GetFilesResponse): InputFileMetaDataT[] {
		const { files } = filesGetResponse;

		//read the content of all the files in the
		return files.map((file) => {
			const extension = getFileExtension(file.file_name);
			return {
				name: file.file_name,
				extension,
				mediaType: `audio/${extension}`, //TODO: Maybe think about if we want to store various mediaTypes, or somehow deduce it from the file data itself.
			};
		});
	},

	parseGetElementsResponse(getElementsResponse: Record<string, ElementMetadata>): Record<string, ElementT> {
		const elementEntries: Array<[string, ElementT]> = Object.entries(getElementsResponse).map(
			([elType, elData]): [string, ElementT] => {
				//get transformed parameter entries
				const parameterEntries: Array<[string, ParameterT]> | undefined = elData.parameters
					? Object.entries(elData.parameters)
							.map(([pName, pData]): [string, ParameterT] => {
								try {
									return [
										pName,
										{
											parameterType: getEnumValue(ParamTypeT, pData.parameter_type) as ParamTypeT,
											description: pData.description,
											default: pData.default,
											rangeType: pData.range_type
												? (getEnumValue(RangeT, pData.range_type) as RangeT)
												: undefined,
											range: pData.range || undefined,
											unit: pData.unit || undefined,
											uiComponent: getEnumValue(UIComponentT, pData.ui_component) as UIComponentT,
										},
									];
								} catch (e) {
									console.error("ERROR: Skipping parameter..", e);
									// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
									return ["", {} as ParameterT];
								}
							})
							.filter(([pName]) => pName !== "")
					: undefined;

				//get transformed terminal entries
				const terminalEntries: Array<[string, TerminalT]> = Object.entries(elData.terminals)
					.map(([tName, tData]): [string, TerminalT] => {
						try {
							return [
								tName,
								{
									description: tData.description,
									direction: tData.direction
										? (getEnumValue(DirectionT, tData.direction) as DirectionT)
										: undefined,
									default: tData.default,
									dcRange: tData.dc_range || undefined,
									acRange: tData.ac_range || undefined,
								},
							];
						} catch (e) {
							console.error("ERROR: Skipping terminal..", e);
							// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
							return ["", {} as TerminalT];
						}
					})
					.filter(([tName]) => tName !== "");

				return [
					elType,
					{
						typeName: elData.type_name,
						shortDescription: elData.short_description,
						longDescription: elData.long_description,
						parameters: parameterEntries ? Object.fromEntries(parameterEntries) : undefined,
						terminals: Object.fromEntries(terminalEntries),
					},
				];
			}
		);

		const allElements = Object.fromEntries(elementEntries);

		//Add Source and Sink elements from Terminal Element
		const terminalElement = allElements.Terminal;
		allElements.Source = {
			...terminalElement,
			typeName: "Source",
			shortDescription: "Source Terminal Element for the Network",
			longDescription: "Source Terminal Element for the Network",
			parameters: { ...terminalElement.parameters },
			terminals: { ...terminalElement.terminals },
		};

		allElements.Sink = {
			...terminalElement,
			typeName: "Sink",
			shortDescription: "Sink Terminal Element for the Network",
			longDescription: "Sink Terminal Element for the Network",
			parameters: { ...terminalElement.parameters },
			terminals: { ...terminalElement.terminals },
		};

		delete allElements.Terminal;

		return allElements;
	},

	parseGetProjectsResponse(getProjectsResponse: GetProjectsResponse): ShallowProjectDetails[] {
		const { projects } = getProjectsResponse;

		return projects.map((project) => {
			return {
				id: project.id,
				slug: project.slug,
				name: project.name,
				description: project.description === null ? undefined : project.description,
			};
		});
	},

	createSimulateRequest(
		network: NetworkT,
		projectSlug: string,
		inputFile: InputFileMetaDataT
	): SimulateNetworkRequest {
		//TODO: Perform the validations on network

		const terminalMap: Map<string, Terminal[]> = getTerminalMap(network.edges);

		const networkToSimulate: NetworkVO = {
			id: network.metaData.id,
			creator_id: USER_ID,
			name: network.metaData.name,
			elements: network.nodes.map((node: Node<NodeDataT>) => {
				//create the params object
				const params: Record<string, Record<string, string>> = {};
				const { elementType } = node.data;
				const actualElementType = elementType === "Source" || elementType === "Sink" ? "Terminal" : elementType;

				params[actualElementType] = network.params[node.id];
				return {
					id: node.id,
					name: node.data.label,
					parent_network_id: network.metaData.id,
					type_name: actualElementType,
					element_type_params: params, //consider the given params object as Parameters
					terminals: terminalMap.get(node.id) || [], //empty terminals in case the node is not connected anything
					position: {
						x: node.position.x,
						y: node.position.y,
					},
				};
			}),
			nodes: network.edges.map((edge: Edge) => ({
				id: edge.id,
				name: edge.id,
				parent_network_id: network.metaData.id,
				terminal_ids: [edge.sourceHandle || "", edge.targetHandle || ""], //source and target terminal ids
			})),
		};
		return {
			network: networkToSimulate,
			project_slug: projectSlug,
			audio_file_path: inputFile.name,
		};
	},

	parseSimulationResponse(simulateNetworkResponse: SimulateNetworkResponse): Record<string, string> {
		return {
			code: simulateNetworkResponse.py_code_path,
			viz: simulateNetworkResponse.visualization_path,
		};
	},
};

/**** Helper Functions ****/

function getFileExtension(fileName: string): string {
	const tokens = fileName.split(".");
	if (tokens.length < 2) {
		//means the extension is not present
		throw new Error("File needs a valid extension.");
	}

	return tokens[tokens.length - 1];
}

/**
 * To get Enum Key from its corresponding string value
 * @throws Error: if can't convert to specific enum
 */
function getEnumValue<T extends Record<string, string>>(myEnum: T, value: string): string {
	const values = Object.values(myEnum).filter((val) => val === value);
	if (values.length > 0) {
		return values[0];
	}

	throw new Error("Can't convert : '" + value + "'");
}

/**
 * Would generate a map having List of Terminals for every node.
 * @param edges Representing connection between nodes
 * @return Map having key as nodeId and value as list of Terminals for that nodeId
 */
function getTerminalMap(edges: Edge[]): Map<string, Terminal[]> {
	const terminalMap: Map<string, Terminal[]> = new Map<string, Terminal[]>();

	edges.forEach((edge) => {
		//Add a terminal for the source node
		const sourceNode = edge.source;
		const sourceTerminals: Terminal[] = terminalMap.get(sourceNode) || new Array<Terminal>();
		sourceTerminals.push({
			id: edge.sourceHandle || "",
			parent_element_id: sourceNode,
			type_name: getTerminalType(edge.sourceHandle) || "",
			node_name: edge.id,
		});
		terminalMap.set(sourceNode, sourceTerminals);

		//Add a terminal for the target node
		const targetNode = edge.target;
		const targetTerminals: Terminal[] = terminalMap.get(targetNode) || new Array<Terminal>();
		targetTerminals.push({
			id: edge.targetHandle || "",
			parent_element_id: targetNode,
			type_name: getTerminalType(edge.targetHandle) || "",
			node_name: edge.id,
		});
		terminalMap.set(targetNode, targetTerminals);
	});

	return terminalMap;
}

export default remoteTransformer;
