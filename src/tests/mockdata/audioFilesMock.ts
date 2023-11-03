import risingChirp from "./assets/rising-chirp.wav";
import bearingFaults from "./assets/bearing-faults.wav";
import type { InputFileDataT } from "../../redux/slices/DataHubSlice";

export const audioFilesMock: InputFileDataT[] = [
	{
		metadata: {
			name: "rising-chirp.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "00:01",
		},
		dataUrl: risingChirp,
	},
	{
		metadata: {
			name: "bearing-faults.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "00:34",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "glass-breaking-onsite.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "00:45",
		},

		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "glass-breaking-bin.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "01:18",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file5isWayToLonggggggggggggggggggggggggggggggggggggggggggg.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "00:10",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file6.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "00:17",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file7.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "01:07",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file8.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "05:10",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file9.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "02:17",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file10.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "33:07",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file11.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "05:10",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file12.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "02:17",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file13.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "04:29",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file14.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "05:45",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "file15.wav",
			extension: "wav",
			mediaType: "audio/wav",
			length: "23:18",
		},
		dataUrl: bearingFaults,
	},
];
