/***
 * This module would convert the UI objects to Data Transfer Objects (DTO) that can be used to communicate with the
 * backend.
 */
import type { InputFileDataT } from "../../redux/slices/DataHubSlice";
import { DataSetT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "./bindings/FilesUploadRequest";
import type { FilesUploadResponse } from "./bindings/FilesUploadResponse";

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
