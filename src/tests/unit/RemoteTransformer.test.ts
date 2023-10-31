import "@testing-library/jest-dom";
import type { ElementT } from "../../redux/slices/ModelCreationSlice";
import { backendElements, transformedElements } from "../mockdata/getElementsMockData";
import remoteTransformer from "../../service/RemoteService/RemoteTransformer";

describe("Testing parseGetElementsResponse()", () => {
	test("Normal Test", () => {
		const expectedTransformation: Record<string, ElementT> = transformedElements;

		const actualTransformation: Record<string, ElementT> =
			remoteTransformer.parseGetElementsResponse(backendElements);

		expect(actualTransformation).toStrictEqual(expectedTransformation);
	});
});
