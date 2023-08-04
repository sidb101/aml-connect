/***
 * This module would convert the UI objects to Data Transfer Objects (DTO) that can be used to communicate with the
 * backend.
 */
import type { InputFileDataT } from "../../redux/slices/DataHubSlice";
import { DataSetT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "./bindings/FilesUploadRequest";
import type { FilesUploadResponse } from "./bindings/FilesUploadResponse";
import type { GetFilesRequest } from "./bindings/GetFilesRequest";
import type { GetFilesResponse } from "./bindings/GetFilesResponse";

export const createFilesUploadRequest = (
	projectSlug: string,
	inputFiles: InputFileDataT[],
	dataSet: DataSetT
): FilesUploadRequest => {
	return {
		proj_slug: projectSlug,
		input_files: inputFiles.map((inputFile) => ({
			file_name: inputFile.metadata.name,
			dataset_type: dataSet,
		})),
	};
};

export const parseSuccessFilesUploadResponse = (
	filesUploadResponse: FilesUploadResponse,
	inputFiles: InputFileDataT[]
): InputFileDataT[] => {
	const successfulUploads = filesUploadResponse.upload_success_files;
	return inputFiles.filter((inputFile) =>
		successfulUploads.find((successFile) => successFile.file_name == inputFile.metadata.name)
	);
};

export const createFilesGetRequest = (projectSlug: string, dataSet: DataSetT): GetFilesRequest => {
	return {
		proj_slug: projectSlug,
		dataset_type: dataSet,
	};
};

export const parseFilesGetResponse = (filesGetResponse: GetFilesResponse): InputFileDataT[] => {
	const files = filesGetResponse.files;
	return files.map((file) => ({
		metadata: {
			name: file.file_name,
		},
		dataUrl: "",
	}));
};
