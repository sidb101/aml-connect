

# !/usr/bin/python3
from aspinity import Network, simulate
import soundfile as sf
import numpy as np
from aspinity import (
    Terminal,
	Filter,
	Terminal,
)

def load_wav():
    samples, sample_rate = sf.read("/home/sbhatna2/workspace/aml-connect/src-tauri/tests/rising-chirp.wav")
    times = np.arange(len(samples)) / sample_rate
    return times, samples

newtork = Network()
network.add(
    Terminal(
        net = "in",
		is_input = True,
		is_output = False,
		hardware_pin = "A0",
		is_ac_coupled = False,
		is_extern = False,
	),
	Filter(
        input = "in",
		output = "filter_out",
		characteristic_frequency = 1000.0,
		quality_factor = 1.0,
		filter_type = FilterType.bpf2,
	),
	Terminal(
        net = "out",
		is_input = False,
		is_output = True,
		hardware_pin = "D0",
		is_ac_coupled = False,
		is_extern = False,
	),
)

times, samples = load_wav()
res = simulate(network, times, samples)