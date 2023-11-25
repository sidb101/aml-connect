import "@testing-library/jest-dom";
import type { ElementT } from "../../redux/slices/ModelCreationSlice";
import { backendElements, transformedElements } from "../mockdata/allElementsMock";
import remoteTransformer from "../../service/RemoteService/RemoteTransformer";
import type { SimulateNetworkRequest } from "../../service/RemoteService/client/bindings/SimulateNetworkRequest";
import { mockExpectedNetworkTransform, mockNetwork } from "../mockdata/networkMock";
import { audioFilesMock } from "../mockdata/audioFilesMock";
import type { ShallowProjectDetails } from "redux/slices/ProjectSlice";
import { returnedProjects, transformedProjects } from "../mockdata/allProjectsMock";
/* eslint-disable @typescript-eslint/naming-convention */

describe("Testing parseGetElementsResponse()", () => {
	test("Happy Path test", () => {
		const expectedTransformation: Record<string, ElementT> = transformedElements;

		const actualTransformation: Record<string, ElementT> =
			remoteTransformer.parseGetElementsResponse(backendElements);

		expect(actualTransformation).toStrictEqual(expectedTransformation);
	});
});

describe("Testing createSimulateRequest()", () => {
	test("Happy Path Test", () => {
		const expectedTransformation: SimulateNetworkRequest = {
			network: mockExpectedNetworkTransform,
			project_slug: "test_project",
			audio_file_path: audioFilesMock[0].metadata.name,
		};

		const actualTransformation: SimulateNetworkRequest = remoteTransformer.createSimulateRequest(
			mockNetwork,
			"test_project",
			audioFilesMock[0].metadata
		);

		expect(actualTransformation).toStrictEqual(expectedTransformation);
	});
});

describe("Testing parseGetProjectsResponse()", () => {
	test("Happy Path Test", () => {
		const expectedTransformation: ShallowProjectDetails[] = transformedProjects;

		const actualTransformation: ShallowProjectDetails[] = remoteTransformer.parseGetProjectsResponse({
			projects: returnedProjects,
		});

		expect(actualTransformation).toStrictEqual(expectedTransformation);
	});
});
