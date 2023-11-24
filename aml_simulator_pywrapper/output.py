
# pylint: skip-file
# !/usr/bin/python3
from aspinity import Network, simulate
import soundfile as sf
import numpy as np
from aspinity import FilterType, GainOpampMode, ActivationFunction, ModelVersion
from aspinity import (
    Terminal,
	Filter,
	PeakDetector,
)

def load_wav():
    samples, sample_rate = sf.read("/home/sbhatna2/workspace/aml-connect/test_resources/bearing-faults.wav")
    times = np.arange(len(samples)) / sample_rate
    return times, samples

network = Network()
network.add(
    Terminal(
        net = "in",
		is_input = True,
		is_output = False,
		hardware_pin = "",
		is_ac_coupled = False,
		is_extern = False,
	),
	Filter(
        input = "in",
		output = "filter_0",
		characteristic_frequency = 400.0,
		quality_factor = 3.0,
		filter_type = FilterType.bpf2,
	),
	PeakDetector(
        input = "filter_0",
		output = "output_0",
		atk = 40000.0,
		dec = 5.0,
		model_version = ModelVersion.FirstOrder,
	),
	Filter(
        input = "in",
		output = "filter_1",
		characteristic_frequency = 555.7981977492551,
		quality_factor = 3.0,
		filter_type = FilterType.bpf2,
	),
	PeakDetector(
        input = "filter_1",
		output = "output_1",
		atk = 40000.0,
		dec = 5.0,
		model_version = ModelVersion.FirstOrder,
	),
	Filter(
        input = "in",
		output = "filter_2",
		characteristic_frequency = 772.2790915533001,
		quality_factor = 3.0,
		filter_type = FilterType.bpf2,
	),
	PeakDetector(
        input = "filter_2",
		output = "output_2",
		atk = 40000.0,
		dec = 5.0,
		model_version = ModelVersion.FirstOrder,
	),
	Filter(
        input = "in",
		output = "filter_3",
		characteristic_frequency = 1073.0783181118902,
		quality_factor = 3.0,
		filter_type = FilterType.bpf2,
	),
	PeakDetector(
        input = "filter_3",
		output = "output_3",
		atk = 40000.0,
		dec = 5.0,
		model_version = ModelVersion.FirstOrder,
	),
	Filter(
        input = "in",
		output = "filter_4",
		characteristic_frequency = 1491.0374881259756,
		quality_factor = 3.0,
		filter_type = FilterType.bpf2,
	),
	PeakDetector(
        input = "filter_4",
		output = "output_4",
		atk = 40000.0,
		dec = 5.0,
		model_version = ModelVersion.FirstOrder,
	),
	Filter(
        input = "in",
		output = "filter_5",
		characteristic_frequency = 2071.7898716924856,
		quality_factor = 3.0,
		filter_type = FilterType.bpf2,
	),
	PeakDetector(
        input = "filter_5",
		output = "output_5",
		atk = 40000.0,
		dec = 5.0,
		model_version = ModelVersion.FirstOrder,
	),
	Filter(
        input = "in",
		output = "filter_6",
		characteristic_frequency = 2878.742692004609,
		quality_factor = 3.0,
		filter_type = FilterType.bpf2,
	),
	PeakDetector(
        input = "filter_6",
		output = "output_6",
		atk = 40000.0,
		dec = 5.0,
		model_version = ModelVersion.FirstOrder,
	),
	Filter(
        input = "in",
		output = "filter_7",
		characteristic_frequency = 4000.000000000001,
		quality_factor = 3.0,
		filter_type = FilterType.bpf2,
	),
	PeakDetector(
        input = "filter_7",
		output = "output_7",
		atk = 40000.0,
		dec = 5.0,
		model_version = ModelVersion.FirstOrder,
	),
	Terminal(
        net = "output_0",
		is_input = False,
		is_output = True,
		hardware_pin = "",
		is_ac_coupled = False,
		is_extern = False,
	),
	Terminal(
        net = "output_1",
		is_input = False,
		is_output = True,
		hardware_pin = "",
		is_ac_coupled = False,
		is_extern = False,
	),
	Terminal(
        net = "output_2",
		is_input = False,
		is_output = True,
		hardware_pin = "",
		is_ac_coupled = False,
		is_extern = False,
	),
	Terminal(
        net = "output_3",
		is_input = False,
		is_output = True,
		hardware_pin = "",
		is_ac_coupled = False,
		is_extern = False,
	),
	Terminal(
        net = "output_4",
		is_input = False,
		is_output = True,
		hardware_pin = "",
		is_ac_coupled = False,
		is_extern = False,
	),
	Terminal(
        net = "output_5",
		is_input = False,
		is_output = True,
		hardware_pin = "",
		is_ac_coupled = False,
		is_extern = False,
	),
	Terminal(
        net = "output_6",
		is_input = False,
		is_output = True,
		hardware_pin = "",
		is_ac_coupled = False,
		is_extern = False,
	),
	Terminal(
        net = "output_7",
		is_input = False,
		is_output = True,
		hardware_pin = "",
		is_ac_coupled = False,
		is_extern = False,
	),
)

times, samples = load_wav()
res = simulate(network, times, samples)
print(*res.items(), sep="\n")