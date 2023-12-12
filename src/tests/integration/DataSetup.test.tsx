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
import { accordionActiveClass, accordionInactiveClass } from "../../components/accordion/Accordion";
import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";
import { DataSetT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "../../service/RemoteService/client/bindings/FilesUploadRequest";
import type { ShallowProjectDetails } from "../../redux/slices/ProjectSlice";
import { mockProjects } from "../mockdata/allProjectsMock";
import remoteService from "../../service/RemoteService/RemoteService";
import storageService from "../../service/StorageService/StorageService";
import type { FilesUploadResponse } from "../../service/RemoteService/client/bindings/FilesUploadResponse";

jest.mock("../../service/RemoteService/RemoteService");
jest.mock("../../service/StorageService/StorageService");

describe("Testing the Data Setup Functionality", () => {
	//define the routing for given test suite
	const routes = appRoutes;

	test(
		"that starting from main page when initially training dataset is empty, if files are " +
			"imported then files are shown in the training data set. Test also, that if the files are " +
			"imported in different datasets, then they appear on those accordions",

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
			const {
				mockFiles: trainingMockFiles,
				mockFilesInputData: mockTrainingInputFileData,
				mockFilesInputMetaData: mockTrainingInputFileMetaData,
			} = getMockFilesAndFileData(DataSetT.TRAINING);
			const {
				mockFiles: testingMockFiles,
				mockFilesInputData: mockTestingInputFileData,
				mockFilesInputMetaData: mockTestingInputFileMetaData,
			} = getMockFilesAndFileData(DataSetT.TESTING);
			const {
				mockFiles: validationMockFiles,
				mockFilesInputData: mockValidationInputFileData,
				mockFilesInputMetaData: mockValidationInputFileMetaData,
			} = getMockFilesAndFileData(DataSetT.VALIDATION);

			//set the values of mocked functions (initially no files are uploaded)
			when(remoteService.getFilesMetaData)
				.expectCalledWith(expect.anything(), expect.anything())
				.mockResolvedValue([]);

			//Mock the writing of files once they are uploaded
			when(storageService.readInputFilesFromStorage)
				.calledWith([], `${projects[0].slug}/audio/`)
				.mockResolvedValue([])
				.calledWith(mockTrainingInputFileMetaData, `${projects[0].slug}/audio/`)
				.mockResolvedValue(mockTrainingInputFileData)
				.calledWith(mockTestingInputFileMetaData, `${projects[0].slug}/audio/`)
				.mockResolvedValue(mockTestingInputFileData)
				.calledWith(mockValidationInputFileMetaData, `${projects[0].slug}/audio/`)
				.mockResolvedValue(mockValidationInputFileData);

			//Mock uploading of files when uploaded
			//NOTE: Can't put constraints on request because can't mock the file picker
			when(remoteService.sendFilesMetaData)
				.calledWith(expect.anything(), expect.anything(), expect.anything())
				.mockResolvedValueOnce(mockTrainingInputFileData)
				.mockResolvedValueOnce(mockTestingInputFileData)
				.mockResolvedValueOnce(mockValidationInputFileData);

			//ACT - 1
			//go to first project
			const sideBarLinks = await screen.findAllByTestId(testIds.projectLinks);
			fireEvent.click(sideBarLinks[0]);

			//go to the data hub page
			const navLinks = await screen.findAllByTestId(testIds.navLinks);
			fireEvent.click(navLinks[1]);

			//ASSERT - 1
			//check the initial state and contents of the accordions
			const accordions = await screen.findAllByTestId(testIds.accordion);

			//check that Training Data accordion is active and has no files initially
			const trainingAccordion = checkInitialTrainingAccordion(accordions);
			const testingAccordion = checkInitialTestingAccordion(accordions);
			const validationAccordion = checkInitialValidationAccordion(accordions);

			//ACT - 2
			//Open the other two accordions
			fireEvent.click(within(testingAccordion).getByTestId(testIds.accordionHeaderContainer));
			fireEvent.click(within(testingAccordion).getByTestId(testIds.accordionHeaderContainer));

			//ASSERT - 2
			//No files present in the testing and validation accordion
			expect(within(testingAccordion).getByTestId(testIds.audioTableBody)).toBeEmptyDOMElement();
			expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();

			expect(within(validationAccordion).getByTestId(testIds.audioTableBody)).toBeEmptyDOMElement();
			expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();

			//ACT - 3
			//import the files in training section (default radio)
			await actUploadFiles(trainingMockFiles);

			//ASSERT - 3
			expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();
			await checkFinalTrainingAccordion(trainingMockFiles);

			//ACT - 4
			//upload Testing Files
			fireEvent.click(screen.getByTestId(testIds.testingRadioBtn));
			await actUploadFiles(testingMockFiles);

			//ASSERT - 4
			expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();
			await checkFinalTestingAccordion(testingMockFiles);

			//ACT - 5
			//upload Testing Files
			fireEvent.click(screen.getByTestId(testIds.validationRadioBtn));
			await actUploadFiles(validationMockFiles);

			//ASSERT - 5
			expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();
			await checkFinalValidationAccordion(validationMockFiles);
		}
	);
});

const getMockFilesAndFileData = (
	dataSet: DataSetT
): { mockFiles: File[]; mockFilesInputData: InputFileDataT[]; mockFilesInputMetaData: InputFileMetaDataT[] } => {
	const mockFiles = [
		new File(["fakeFile"], `${dataSet}Test1.wav`, { type: "audio/wav" }),
		new File(["fakeFile"], `${dataSet}Test2.wav`, { type: "audio/wav" }),
		new File(["fakeFile"], `${dataSet}Test3.wav`, { type: "audio/wav" }),
	];

	const mockFilesInputData: InputFileDataT[] = mockFiles.map((file) => ({
		metadata: {
			name: file.name,
			mediaType: file.type,
			extension: "wav",
		},
		dataUrl: "fakeFile",
	}));

	const mockFilesInputMetaData: InputFileMetaDataT[] = mockFilesInputData.map((file) => file.metadata);

	return { mockFiles, mockFilesInputData, mockFilesInputMetaData };
};

const checkInitialTrainingAccordion = (accordions: HTMLElement[]) => {
	const trainingAccordion = accordions.find(
		(accordion) =>
			accordion.querySelector(`[data-testid=${testIds.accordionHeader}]`)?.textContent === "Training Dataset"
	);

	if (!trainingAccordion) {
		throw new Error("Training DataSet not present");
	}
	expect(trainingAccordion).toHaveClass(accordionActiveClass);
	expect(within(trainingAccordion).getByTestId(testIds.audioTableBody)).toBeEmptyDOMElement();
	expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();

	return trainingAccordion;
};

const checkInitialTestingAccordion = (accordions: HTMLElement[]) => {
	const testingAccordion = accordions.find(
		(accordion) =>
			accordion.querySelector(`[data-testid=${testIds.accordionHeader}]`)?.textContent === "Testing Dataset"
	);

	if (!testingAccordion) {
		throw new Error("Testing DataSet not present");
	}
	expect(testingAccordion).toHaveClass(accordionInactiveClass);

	return testingAccordion;
};

const checkInitialValidationAccordion = (accordions: HTMLElement[]) => {
	const validationAccordion = accordions.find(
		(accordion) =>
			accordion.querySelector(`[data-testid=${testIds.accordionHeader}]`)?.textContent === "Validation Dataset"
	);

	if (!validationAccordion) {
		throw new Error("Validation DataSet not present");
	}
	expect(validationAccordion).toHaveClass(accordionInactiveClass);

	return validationAccordion;
};

const actUploadFiles = async (files: File[]) => {
	//ACT - 1
	fireEvent.click(screen.getByTestId(testIds.importFilesBtn));

	//ASSERT - 1
	//check if Import Modal is opened with BROWSE YOUR PC text
	const importModalBody = screen.getByTestId(testIds.importModalBody);
	expect(importModalBody).toBeInTheDocument();

	const browsePCLink = screen.getByTestId(testIds.browsePcLink);
	expect(browsePCLink).toHaveTextContent(getExactText("BROWSE YOUR PC"));

	//ACT - 2
	fireEvent.click(browsePCLink);
	//upload some files
	const fileInput = document.querySelector('input[type="file"]');
	if (!fileInput) {
		throw new Error("File Upload not present");
	}
	//NOTE: Right now this is not working because it is facilitated by external library "filePicker"
	act(() => {
		fireEvent.change(fileInput, {
			target: {
				files: files,
			},
		});
	});

	//click on import button
	await act(async () => fireEvent.click(screen.getByTestId(testIds.modalImportFilesBtn)));
};

const checkFinalTrainingAccordion = async (trainingFiles: File[]) => {
	const accordions = await screen.findAllByTestId(testIds.accordion);
	const trainingAccordion = accordions.find(
		(accordion) =>
			accordion.querySelector(`[data-testid=${testIds.accordionHeader}]`)?.textContent === "Training Dataset"
	);

	if (!trainingAccordion) {
		throw new Error("Training DataSet not present");
	}
	expect(trainingAccordion).toHaveClass(accordionActiveClass);
	trainingFiles.forEach((file) => {
		expect(within(trainingAccordion).getByTestId(testIds.audioTableBody)).toHaveTextContent(file.name);
	});
	expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();
};

const checkFinalTestingAccordion = async (testingFiles: File[]) => {
	const accordions = await screen.findAllByTestId(testIds.accordion);
	const testingAccordion = accordions.find(
		(accordion) =>
			accordion.querySelector(`[data-testid=${testIds.accordionHeader}]`)?.textContent === "Testing Dataset"
	);

	if (!testingAccordion) {
		throw new Error("Testing DataSet not present");
	}

	expect(await within(testingAccordion).findByTestId(testIds.audioTableBody)).toBeInTheDocument();
	testingFiles.forEach((file) => {
		expect(within(testingAccordion).getByTestId(testIds.audioTableBody)).toHaveTextContent(file.name);
	});
	expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();
};

const checkFinalValidationAccordion = async (validationFiles: File[]) => {
	const accordions = await screen.findAllByTestId(testIds.accordion);
	const validationAccordion = accordions.find(
		(accordion) =>
			accordion.querySelector(`[data-testid=${testIds.accordionHeader}]`)?.textContent === "Validation Dataset"
	);

	if (!validationAccordion) {
		throw new Error("Validation DataSet not present");
	}

	expect(await within(validationAccordion).findByTestId(testIds.audioTableBody)).toBeInTheDocument();
	validationFiles.forEach((file) => {
		expect(within(validationAccordion).getByTestId(testIds.audioTableBody)).toHaveTextContent(file.name);
	});
	expect(screen.queryByTestId(testIds.importModalBody)).not.toBeInTheDocument();
};
