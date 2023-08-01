/**
 * This slice would deal with all the basic data related parts of the state, which are
 * mostly data and meta-data of the audio files
 * The slice would give different actions that can be dispatched to update the
 * given data hub state
 */

export type InputFileDataT = {
	metadata: InputFileMetaDataT;
	dataUrl: string;
};

export type InputFileMetaDataT = {
	name: string;
	length?: string;
};
