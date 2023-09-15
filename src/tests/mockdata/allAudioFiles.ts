import risingChirp from "./assets/rising-chirp.wav";
import bearingFaults from "./assets/bearing-faults.wav";
import type { InputFileDataT } from "../../redux/slices/DataHubSlice";

export const audioFiles: InputFileDataT[] = [
	{
		metadata: {
			name: "rising-chirp.wav",
			length: "00:01",
		},
		dataUrl: risingChirp,
	},
	{
		metadata: {
			name: "bearing-faults.wav",
			length: "00:34",
		},
		dataUrl: bearingFaults,
	},
	{
		metadata: {
			name: "glass-breaking-onsite.wav",
			length: "00:45",
		},
	},
	{
		metadata: {
			name: "glass-breaking-bin.wav",
			length: "01:18",
		},
	},
	{
		metadata: {
			name: "file5isWayToLonggggggggggggggggggggggggggggggggggggggggggg.wav",
			length: "00:10",
		},
	},
	{
		metadata: {
			name: "file6.wav",
			length: "00:17",
		},
	},
	{
		metadata: {
			name: "file7.wav",
			length: "01:07",
		},
	},
	{
		metadata: {
			name: "file8.wav",
			length: "05:10",
		},
	},
	{
		metadata: {
			name: "file9.wav",
			length: "02:17",
		},
	},
	{
		metadata: {
			name: "file10.wav",
			length: "33:07",
		},
	},
	{
		metadata: {
			name: "file11.wav",
			length: "05:10",
		},
	},
	{
		metadata: {
			name: "file12.wav",
			length: "02:17",
		},
	},
	{
		metadata: {
			name: "file13.wav",
			length: "04:29",
		},
	},
	{
		metadata: {
			name: "file14.wav",
			length: "05:45",
		},
	},
	{
		metadata: {
			name: "file15.wav",
			length: "23:18",
		},
	},
];
