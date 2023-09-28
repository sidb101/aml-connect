//This module will transform all the tauri specific API calls related to File System, to the current system

import { BaseDirectory, readBinaryFile, writeBinaryFile } from "@tauri-apps/api/fs";
import type { StorageClient } from "./StorageClient";
import type { InputFileDataT, InputFileMetaDataT } from "../../../redux/slices/DataHubSlice";

class TauriFsClient implements StorageClient {
	/**
	 * This method would write the file into the path relative to local app dir.
	 * @param fileData: Data for given file
	 * @param path: Relative path from the LocalAppDir (should have trailing '/')
	 */
	async writeInputFileToStorage(fileData: InputFileDataT, path: string): Promise<InputFileDataT> {
		//TODO: create a directory for the project if it doesn't exist

		console.log("Writing file: ", fileData.metadata.name);
		try {
			const fileBinary = await dataUrlToArrayBuffer(fileData.dataUrl);
			await writeBinaryFile(path + fileData.metadata.name, fileBinary, { dir: BaseDirectory.AppLocalData });
			console.log("File Written: ", fileData.metadata.name);
			return fileData;
		} catch (e) {
			return Promise.reject("Couldn't write the file: " + fileData.metadata.name + ". Error: " + e);
		}
	}

	/**
	 * This method would read the audio file into the path relative to local app dir.
	 * @param fileMetaData: Metadata of the audio file to be read
	 * @param path: Relative path from LocalAppDir (should have trailing '/')
	 */
	async readInputFileFromStorage(fileMetaData: InputFileMetaDataT, path: string): Promise<InputFileDataT> {
		console.log("Reading file: ", path + fileMetaData.name);

		try {
			const fileData = await readBinaryFile(path + fileMetaData.name, { dir: BaseDirectory.AppLocalData });
			const dataUrl = uInt8ArrayToDataUrl(fileData, fileMetaData.mediaType);
			console.log("Read file: ", fileMetaData.name);
			return { metadata: fileMetaData, dataUrl };
		} catch (e) {
			return Promise.reject("Couldn't read the file: " + fileMetaData.name + ". Error: " + e);
		}
	}
}

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
 * @param u8a: Binary data present in the UInt8Array form
 * @param mediaType: Representing the string in form: audio/wav, audio/mp3, image/jpeg, text/html, etc.
 * UInt8Array format used when reading the file using Tauri APIs.
 */
function uInt8ArrayToDataUrl(u8a: Uint8Array, mediaType: string) {
	const dataRaw = uint8ArrayToString(u8a);
	// return dataRaw;
	const b64 = btoa(dataRaw);
	return `data:${mediaType};base64,` + b64;
}

/**
 * Method to convert the input array data to string by using small chunks to avoid Maximum Call stack size
 * https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
 * @param u8a: Input array to convert
 */
function uint8ArrayToString(u8a: Uint8Array) {
	const CHUNK_SZ = 0x8000;
	let c: string[] = [];
	for (let i = 0; i < u8a.length; i += CHUNK_SZ) {
		c.push(String.fromCharCode.apply(null, Array.from<number>(u8a.subarray(i, i + CHUNK_SZ))));
	}
	return c.join("");
}

const storageClient = new TauriFsClient();
export default storageClient;
