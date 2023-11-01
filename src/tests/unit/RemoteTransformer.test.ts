import "@testing-library/jest-dom";
import type { ElementT } from "../../redux/slices/ModelCreationSlice";
import { backendElements, transformedElements } from "../mockdata/allElementsMock";
import remoteTransformer from "../../service/RemoteService/RemoteTransformer";
import type { SimulateNetworkRequest } from "../../service/RemoteService/client/bindings/SimulateNetworkRequest";
import { mockExpectedNetworkTransform, mockNetwork } from "../mockdata/networkMock";
import { audioFilesMock } from "../mockdata/audioFilesMock";

describe("Testing parseGetElementsResponse()", () => {
	test("Normal Test", () => {
		const expectedTransformation: Record<string, ElementT> = transformedElements;

		const actualTransformation: Record<string, ElementT> =
			remoteTransformer.parseGetElementsResponse(backendElements);

		expect(actualTransformation).toStrictEqual(expectedTransformation);
	});
});

describe("Testing createSimulateRequest()", () => {
	test("Normal Test", () => {
		const expectedTransformation: SimulateNetworkRequest = {
			network: mockExpectedNetworkTransform,
			audio_file_path: audioFilesMock[0].metadata.name,
		};

		const actualTransformation: SimulateNetworkRequest = remoteTransformer.createSimulateRequest(
			mockNetwork,
			audioFilesMock[0].metadata
		);

		expect(actualTransformation).toStrictEqual(expectedTransformation);
	});
});
