export type InputFileDataT = {
	metadata: InputFileMetaDataT;
	dataUrl?: string;
};

export type InputFileMetaDataT = {
	name: string;
	length?: string;
};
