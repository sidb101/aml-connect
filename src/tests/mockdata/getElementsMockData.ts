import type { Parameters } from "../../service/RemoteService/client/bindings/Parameters";

/*
 TODO: Should be coming from backend contract of getElements()
 */
export type TerminalT = {
	[key: string]: string | null;
};

/*
 TODO: Should be coming from backend contract of getElements()
 */
type ParametersT = {
	[key: string]: string | number | (number | number[])[] | null;
};

/*
 TODO: Should be coming from backend contract of getElements()
 */
export type ElementT = {
	short_description: string;
	long_description: string;
	element_type: string;
	terminals: TerminalT;
	parameters?: ParametersT;
};

//TODO: Different from Element.ts given by Henk. So need to reconcile. Also, there are two instances: Element in general giving the meta data, and element present in the network
const backendElements = {
	AcDiff: {
		short_description: "AC-Coupled Difference Amplifier",
		long_description:
			"Amplifies the ac difference between the input terminals. Specifically, the response is: output=gain(hpf(pos)−hpf(neg))\n" +
			" \n" +
			"where hpf\n" +
			" is a low-frequency (i.e. sub-Hz) highpass filter.\n" +
			"\n" +
			"AcDiff is often used to interface with external signals for which the dc operating point is unknown.",
		element_type: "AcDiff",
		terminals: {
			//TODO: What is this?
			pos: "mid",
			neg: "mid",
			output: null,
		},
		parameters: {
			bias: 5e-8, // TODO: Are these default values?
			gain: 9, //TODO: Should also have human readable labels that need to be shown at UI, in case we want to populate things dynamically
		},
	},
	AsymmetricIntegrator: {
		short_description: "Asymmetric Integrator",
		long_description:
			"An integrator in measurement and control applications is an element whose output signal is the time integral of its input signal. It accumulates the input quantity over a defined time to produce a representative output. The integrator produces a voltage output proportional to the product of the input voltage and time. The asymmetric integrator can integrate the rise and fall of the input signal at different rates (different slopes used to integrate the rise and fall of the input).\n" +
			"\n" +
			"These are generally used as part of decision making in an application. For example, asymmetric integrators can be used to reject spurious triggers (triggers that are either too long or too short that we don't want to catch).",
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
		long_description:
			"The comparator compares one analog voltage level with another analog voltage level (or some preset reference voltage), and produces an output signal based on this voltage comparison. In other words, the voltage comparator compares the magnitudes of two voltage inputs and determines which is the largest of the two.",
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
		long_description:
			"A filter is a circuit capable of passing (or amplifying) certain frequencies while attenuating other frequencies. A filter can extract important frequencies from signals that also contain undesirable or irrelevant frequencies. The four primary types of filters include the low-pass filter, the high-pass filter, the band-pass filter, and the notch filter (or the band-reject or band-stop filter).",
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
		short_description: "Filterbank",
		long_description:
			"A filterbank is an array of bandpass filters that separates the input signal into multiple components, each one carrying a single frequency subband of the original signal. Applications of filterbank include signal decomposition, generation of spectral features, signal compression etc.\n" +
			"\n" +
			"The filterbank network consists of multiple subband components corresponding to the specified band frequencies. Each subband component consists of a bandpass Filter followed by a PeakDetector which tracks the energy of the input signal in that frequency band.",
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
		long_description:
			"GainOpamp is one of several ways to amplify signals. Other amplification blocks provide a more flexible range of gains or lower power, but GainOpamp is useful for it's wide output range and buffering capabilities. It is commonly used to interface with sensors.",
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
		short_description: "Lookup Table",
		long_description:
			"LookupTable implements arbitrary 3-input logic functions.  output=expression(𝑎,𝑏,𝑐)\n" +
			"  where output, a, b, and c are all digital logic signals.",
		element_type: "LUT",
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
		long_description: "DelayFlipFlop implements a standard delay flip-flop.",
		element_type: "D",
		terminals: {
			input: "vdd",
			clock: "Gnd",
			reset: "Gnd",
			output: null,
		},
	},
	Multiplier: {
		short_description: "Multiplier",
		long_description:
			"Multiplier can multiply two signals. The two signal inputs are differential, so it can simultaneously perform subtraction.",
		element_type: "X",
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
		short_description: "Two-input Analog Multiplexer",
		long_description: "Mux2 allows selecting between two signals.",
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
		long_description:
			"Neural networks are a set of algorithms modeled loosely after the human brain, that are designed to recognize patterns.The layers of the neural network are made of nodes. A node is a place where the computation happens, loosely patterned on a neuron in the human brain, which fires when it encounters sufficient stimuli. A node combines input from the data with a set of coefficients, or weights, that either amplify or dampen that input, thereby assigning significance to inputs with regard to the task the algorithm is trying to learn; e.g. which input is most helpful is classifying data without error? These input-weight products are summed and then the sum is passed through a node’s activation function, to determine whether and to what extent that signal should progress further through the network to affect the ultimate outcome, say, an act of classification. If the signal passes through, the neuron has been “activated.”",
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
		long_description:
			"A peak detector is also called an energy detector or an envelope detector. It tracks the envelope of the input signal. The peak detector can be set to track the envelope at different rates. Higher rates can be used to track the peaks of the envelope, and lower rates can be used to track the baseline. RMS tracking, demodulation and baseline tracking are a few examples where the peak detector can be used.",
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
		long_description:
			"PGA performs the operation  𝐴𝑣,1(𝑉1,+−𝑉1,−)+𝐴𝑣,2𝑉2\n" +
			" , making it useful for linear function synthesis to add, subtract, and scale signals.",
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
		long_description:
			"This component is used to synthesize higher order filters from a set of coefficients. Higher order and other complex filters of different types like Butterwoth, Chebyshev, Bessel etc can be designed and synthesized. Filter coefficients of these filters need to be decomposed into multiple second order filter sections (can contain a first order section for odd-order filters). These multiple second order sections are then cascaded together to produce the required filter design. Each decomposed second order section uses the Filter component and a PGA to produce the required filter response. Refer to the component page for more information on these components.",
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
