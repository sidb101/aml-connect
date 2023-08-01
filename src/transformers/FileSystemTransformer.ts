//This module will transform all the tauri specific API calls related to File System, to the current system

import type { InputFileDataT } from "../redux/slices/DataHubSlice";
import { BaseDirectory, writeBinaryFile } from "@tauri-apps/api/fs";

export type FileSystemTransformerT = {
	/**
	 * Used for writing given file to the given path. It uses tauri API to write the file.
	 * @param fileData : Object having name and data-url of the file
	 * @param path: Path related to the storage, where files need to be saved.
	 */
	writeFileToAppStorage(fileData: InputFileDataT, path: string): Promise<InputFileDataT>;
};

const fileSystemTransformer: FileSystemTransformerT = {
	async writeFileToAppStorage(fileData: InputFileDataT, path: string): Promise<InputFileDataT> {
		console.log("Writing file: ", fileData.metadata.name);
		try {
			const fileBinary = await dataUrlToArrayBuffer(fileData.dataUrl);
			await writeBinaryFile(path + fileData.metadata.name, fileBinary, { dir: BaseDirectory.AppLocalData });
			console.log("File Written: ", fileData.metadata.name);
			return fileData;
		} catch (e) {
			return Promise.reject("Couldn't uploaded file: " + fileData.metadata.name + ". Error: " + e);
		}
	},
};

/**
 * This method would convert the audio files from data url format to ArrayBuffer format.
 * Array buffer format is used by Tauri APIs to write the binary
 * @param dataUrl: Audio file content in dataUrl format
 */
async function dataUrlToArrayBuffer(dataUrl: string) {
	const blob = await (await fetch(dataUrl)).blob();
	return await blob.arrayBuffer();
}

/**
 * This method would convert the audio files from array buffer to dataUrl.
 * @param binaryData: Binary data present in the UInt8Array form
 * @param extension: The extension of type of file it represents (without the '.'). Eg: wav, mp3
 *
 * UInt8Array format used when reading the file using Tauri APIs.
 */
async function uInt8ArrayToDataUrl(binaryData: Uint8Array, extension: string) {
	const dataRaw = String.fromCharCode.apply(null, Array.from<number>(binaryData));
	const b64 = btoa(dataRaw);
	return `data:audio/${extension};base64,` + b64;
}

export default fileSystemTransformer;
