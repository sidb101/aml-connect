type TerminalT = {
	[key: string]: string | null;
};

type ParametersT = {
	[key: string]: string | number | (number | number[])[] | null;
};

export type ElementT = {
	short_description: string;
	long_description: string;
	element_type: string;
	terminals: TerminalT;
	parameters?: ParametersT;
};

const backendElements = {
	AcDiff: {
		short_description: "Ac Diff",
		long_description: "I am an AC diff...",
		element_type: "AcDiff",
		terminals: {
			pos: "mid",
			neg: "mid",
			output: null,
		},
		parameters: {
			bias: 5e-8,
			gain: 9,
		},
	},
	AsymmetricIntegrator: {
		short_description: "Asymmetric Integrator",
		long_description: "I am an asymmetric integrator",
		element_type: "AsymmetricIntegrator",
		terminals: {
			input: null,
			output: null,
		},
		parameters: {
			down: 10,
			up: 100,
			up_down_type: "UpDownType.Rate",
		},
	},
	Comparator: {
		short_description: "Comparator",
		long_description: "I am a Comparator...",
		element_type: "Comparator",
		terminals: {
			positive: "mid",
			negative: "mid",
			vdd: "vdd",
			output: null,
		},
		parameters: {
			threshold: 0,
		},
	},
	Filter: {
		short_description: "Filter",
		long_description: "I am a filter",
		element_type: "Filter",
		terminals: {
			input: "mid",
			output: "mid",
		},
		parameters: {
			characteristic_frequency: 1000,
			quality_factor: 2,
			filter_type: "<<non-serializable: FilterType>>",
		},
	},
	Filterbank: {
		short_description: "Filter Bank",
		long_description: "I am a Filter Bank...",
		element_type: "Filterbank",
		terminals: {
			input: "mid",
			out_0: "out0",
			out_1: "out1",
			out_2: "out2",
			out_3: "out3",
			out_4: "out4",
			out_5: "out5",
			out_6: "out6",
			out_7: "out7",
		},
		parameters: {
			band_frequencies: [1000, 5000],
			quality_factor: [1, 1],
			attack_rates: [1889.5335725101413, 9447.66786255071],
			decay_rates: [61.96125855086389, 309.80629275431954],
		},
	},
	GainOpamp: {
		short_description: "Gain OpAmp",
		long_description: "I am a gain operational amplifier...",
		element_type: "GainOpamp",
		terminals: {
			input: null,
			output: null,
		},
		parameters: {
			feedback_cap_count: 0,
			gain_mode: "GainOpampMode.Inverting10x",
		},
	},
	LookupTable: {
		short_description: "Look-up Table",
		long_description: "I am a Look-up Table...",
		element_type: "LookupTable",
		terminals: {
			A: "Gnd",
			B: "Gnd",
			C: "Gnd",
			output: null,
		},
		parameters: {
			expression: "1",
		},
	},
	DelayFlipFlop: {
		short_description: "Delay Flip Flop",
		long_description: "I am a Delay Flip Flop",
		element_type: "DelayFlipFlop",
		terminals: {
			input: "vdd",
			clock: "Gnd",
			reset: "Gnd",
			output: null,
		},
	},
	Multiplier: {
		short_description: "Multiplier",
		long_description: "I am a multiplier",
		element_type: "Multiplier",
		terminals: {
			x_pos: "mid",
			x_neg: "mid",
			y_pos: "mid",
			y_neg: "mid",
			output: null,
		},
		parameters: {
			slope: 0.005,
		},
	},
	Mux2: {
		short_description: "Multiplexer",
		long_description: "I am a multiplexer...",
		element_type: "Mux2",
		terminals: {
			in0: "mid",
			in1: "mid",
			select: "gnd",
			output: null,
		},
	},
	NeuralNet: {
		short_description: "Neural Network",
		long_description: "I am a Neural Network...",
		element_type: "NeuralNet",
		terminals: {
			pos_0: null,
			pos_1: null,
			pos_2: null,
			pos_3: null,
			pos_4: null,
			pos_5: null,
			pos_6: null,
			pos_7: null,
			neg_0: null,
			neg_1: null,
			neg_2: null,
			neg_3: null,
			neg_4: null,
			neg_5: null,
			neg_6: null,
			neg_7: null,
			out_0: null,
			out_1: null,
			out_2: null,
			out_3: null,
			out_4: null,
			out_5: null,
			out_6: null,
			out_7: null,
		},
		parameters: {
			weights: null,
			biases: null,
			activation_function: null,
		},
	},
	PeakDetector: {
		short_description: "Peak Detector",
		long_description: "I am a peak detector...",
		element_type: "PeakDetector",
		terminals: {
			input: "mid",
			output: null,
		},
		parameters: {
			atk: 10000,
			dec: 50,
			model_version: "ModelVersion.SecondOrder",
		},
	},
	PGA: {
		short_description: "Programmable Gate Array",
		long_description: "I am a programmable gate array...",
		element_type: "PGA",
		terminals: {
			pos1: "mid",
			neg1: "mid",
			pos2: "mid",
			reference: "mid",
			output: null,
		},
		parameters: {
			Av1: 1,
			Av2: 0.5,
		},
	},
	SynthesizedFilter: {
		short_description: "Synthesized Filter",
		long_description: "I am a synthesized filter...",
		element_type: "SynthesizedFilter",
		terminals: {
			input: "mid",
			output: null,
		},
		parameters: {
			coefficients: [
				[0, 0, 10000, 1, 88.3540548, 33298.8686],
				[1, 0, 0, 1, 53.0673014, 12012.4201],
			],
		},
	},
};

export const getElements: ElementT[] = Object.values(backendElements);
