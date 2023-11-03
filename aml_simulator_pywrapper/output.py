
# pylint: skip-file
# !/usr/bin/python3
from aspinity import Network, simulate
import soundfile as sf
import numpy as np
from aspinity import FilterType, GainOpampMode, ActivationFunction, ModelVersion
from aspinity import (
    Terminal,
	AcDiff,
	PeakDetector,
	Comparator,
)

def load_wav():
    samples, sample_rate = sf.read("/home/sbhatna2/Music/heart-rate.wav")
    times = np.arange(len(samples)) / sample_rate
    return times, samples

network = Network()
network.add(
    Terminal(
        net = "noninverting",
		is_input = True,
		is_output = False,
		hardware_pin = "A0",
		is_ac_coupled = False,
		is_extern = False,
	),
	Terminal(
        net = "inverting",
		is_input = True,
		is_output = False,
		hardware_pin = "A2",
		is_ac_coupled = False,
		is_extern = False,
	),
	AcDiff(
        pos = "noninverting",
		neg = "inverting",
		output = "diff_output",
		bias = 5e-08,
		gain = 9.0,
	),
	PeakDetector(
        input = "diff_output",
		output = "peak",
		atk = 500.0,
		dec = 10.0,
		model_version = ModelVersion.SecondOrder,
	),
	Comparator(
        positive = "peak",
		negative = "diff_output",
		vdd = None,
		output = "detection",
		threshold = 0.03,
	),
	Terminal(
        net = "peak",
		is_input = False,
		is_output = True,
		hardware_pin = "A3",
		is_ac_coupled = False,
		is_extern = False,
	),
	Terminal(
        net = "detection",
		is_input = False,
		is_output = True,
		hardware_pin = "D3",
		is_ac_coupled = False,
		is_extern = False,
	),
)

times, samples = load_wav()
res = simulate(network, times, samples)
print(*res.items(), sep="\n")