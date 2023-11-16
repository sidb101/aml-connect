/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

/**
 * Performing tests on Data Input functionality
 */

import { routes as appRoutes } from "../../App";
import { when } from "jest-when";
import { BASE_ROUTE } from "../../routes";
import { getExactText, renderWithProviders, testIds } from "../test-utils";
import { act, fireEvent, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { accordionActiveClass } from "../../components/accordion/Accordion";
import type { InputFileDataT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "../../service/RemoteService/client/bindings/FilesUploadRequest";
import remoteClient from "../../service/RemoteService/client/TauriApiClient";
import storageClient from "../../service/StorageService/client/TauriFsClient";
import type { ShallowProjectDetails } from "../../redux/slices/ProjectSlice";
import { mockProjects } from "../mockdata/allProjectsMock";
import remoteService from "../../service/RemoteService/RemoteService";

jest.mock("../../service/RemoteService/client/TauriApiClient");
jest.mock("../../service/StorageService/client/TauriFsClient");
jest.mock("../../service/RemoteService/RemoteService");

describe("Testing the Data Setup Functionality", () => {
	//define the routing for given test suite
	const routes = appRoutes;

	test(
		"that starting from main page when initially training dataset is empty, if files are " +
			"imported then files are shown in the training data set",
		async () => {
			//ARRANGE
			//should start with empty store
			const storeState = {};

			//get the mock projects
			const projects: ShallowProjectDetails[] = mockProjects;
			when(remoteService.getAllProjects).mockResolvedValue(projects);

			//Need to start from the base route
			const routeToRender = [BASE_ROUTE];
			renderWithProviders(routes, {
				preloadedState: storeState,
				initialEntries: routeToRender,
			});

			//Files to upload
			const mockFiles = [
				new File(["fakeFile"], "test1.wav", { type: "audio/wav" }),
				new File(["fakeFile"], "test2.wav", { type: "audio/wav" }),
				new File(["fakeFile"], "test3.wav", { type: "audio/wav" }),
			];

			const mockInputFileData: InputFileDataT[] = mockFiles.map((file) => ({
				metadata: {
					name: file.name,
					mediaType: file.type,
					extension: "wav",
				},
				dataUrl: "fakeFile",
			}));

			const mockUploadFilesRequest: FilesUploadRequest = {
				proj_slug: projects[0].slug,
				input_files: mockFiles.map((file) => ({ file_name: file.name, dataset_type: "Training" })),
			};

			//set the values of mocked functions
			when(remoteClient.getInputFiles)
				.expectCalledWith({
					dataset_type: "Training",
					proj_slug: projects[0].slug,
				})
				.mockResolvedValue({
					files: [],
				});

			mockInputFileData.forEach((fileData) => {
				when(storageClient.writeInputFileToStorage)
					.calledWith(expect.anything(), `${projects[0].slug}/audio`)
					.mockResolvedValue(fileData);
			});

			when(remoteClient.uploadInputFiles)
				.calledWith(expect.anything())
				.mockResolvedValue({
					upload_success_files: mockFiles.map((file) => ({
						file_id: "1",
						file_name: file.name,
						dataset_type: "Training",
					})),
					upload_failed_files: [],
					failed: 0,
					attempted: mockFiles.length,
					succeeded: mockFiles.length,
				});

			//ACT - 1
			//go to first project
			const sideBarLinks = await screen.findAllByTestId(testIds.projectLinks);
			fireEvent.click(sideBarLinks[0]);

			//go to the data hub page
			const navLinks = await screen.findAllByTestId(testIds.navLinks);
			fireEvent.click(navLinks[1]);

			//ASSERT - 1
			//check that Training Data has no files initially
			const accordions = await screen.findAllByTestId(testIds.accordion);
			let trainingAccordion = accordions.find(
				(accordion) =>
					accordion.querySelector(`[data-testid=${testIds.accordionHeader}]`)?.textContent ===
					"Training Dataset"
			);

			if (!trainingAccordion) {
				throw new Error("Training DataSet not present");
			}
			expect(trainingAccordion).toHaveClass(accordionActiveClass);
			expect(within(trainingAccordion).getByTestId(testIds.audioTableBody)).toBeEmptyDOMElement();
			expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();

			//ACT - 2
			//import the files
			fireEvent.click(screen.getByTestId(testIds.importFilesBtn));

			//ASSERT - 2
			//check if Import Modal is opened with BROWSE YOUR PC text
			const importModalBody = screen.getByTestId(testIds.importModalBody);
			expect(importModalBody).toBeInTheDocument();

			const browsePCLink = screen.getByTestId(testIds.browsePcLink);
			expect(browsePCLink).toHaveTextContent(getExactText("BROWSE YOUR PC"));

			//ACT - 3
			fireEvent.click(browsePCLink);
			//upload some files
			const fileInput = document.querySelector('input[type="file"]');
			if (!fileInput) {
				throw new Error("File Upload not present");
			}
			act(() => {
				fireEvent.change(fileInput, {
					target: {
						files: mockFiles,
					},
				});
			});
			//click on import button
			await act(async () => fireEvent.click(screen.getByTestId(testIds.modalImportFilesBtn)));

			//ASSERT - 3
			expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();
			trainingAccordion = accordions.find(
				(accordion) =>
					accordion.querySelector(`[data-testid=${testIds.accordionHeader}]`)?.textContent ===
					"Training Dataset"
			);
			if (!trainingAccordion) {
				throw new Error("Training DataSet not present");
			}
		}
	);
});
