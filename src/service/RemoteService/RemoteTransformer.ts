import type { InputFileDataT, InputFileMetaDataT } from "../../redux/slices/DataHubSlice";
import { DataSetT } from "../../redux/slices/DataHubSlice";
import type { FilesUploadRequest } from "./client/bindings/FilesUploadRequest";
import type { FilesUploadResponse } from "./client/bindings/FilesUploadResponse";
import type { GetFilesRequest } from "./client/bindings/GetFilesRequest";
import type { GetFilesResponse } from "./client/bindings/GetFilesResponse";
import type { ListProjectsRequest } from "./client/bindings/ListProjectsRequest";
import type { ListProjectsResponse } from "./client/bindings/ListProjectsResponse";
import type { ProjectDetails } from "./client/bindings/ProjectDetails";
import type { CreateProjectRequest } from "./client/bindings/CreateProjectRequest";
import type { CreateProjectResponse } from "./client/bindings/CreateProjectResponse";
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
			const extension = this.getFileExtension(file.file_name);
			return {
				name: file.file_name,
				extension,
				mediaType: `audio/${extension}`, //TODO: Maybe think about if we want to store various mediaTypes, or somehow deduce it from the file data itself.
			};
		});
	},

	getFileExtension(fileName: string): string {
		const tokens = fileName.split(".");
		if (tokens.length < 2) {
			//means the extension is not present
			throw new Error("File needs a valid extension.");
		}

		return tokens[tokens.length - 1];
	},

	createTheCreateProjectRequest(name: string, description: string): CreateProjectRequest {
		return {
			name,
			description,
		};
	},

	parseCreateProjectResponse(createProjectResponse: CreateProjectResponse): ProjectDetails[] {
		const { projects } = createProjectResponse;

		return projects;
	},

	createGetProjectsRequest(limit: bigint, offset: bigint): ListProjectsRequest {
		return {
			limit,
			offset,
		};
	},

	parseGetProjectsResponse(getProjectsResponse: ListProjectsResponse): ProjectDetails[] {
		const { projects } = getProjectsResponse;

		return projects;
	},
};

export default remoteTransformer;
