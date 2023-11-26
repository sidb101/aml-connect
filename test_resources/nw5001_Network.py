
# pylint: skip-file
# !/usr/bin/python3
from aspinity import Network, simulate
import soundfile as sf
import numpy as np
from aspinity import FilterType, GainOpampMode, ActivationFunction, ModelVersion
from aspinity import (
    Terminal,
    PeakDetector,
    Comparator,
    Filter,
)

def load_wav():
    samples, sample_rate = sf.read(r"C:\Users\koolj\AppData\Local\com.aml-connect.aspinity\test_project\audio\rc1.wav")
    times = np.arange(len(samples)) / sample_rate
    return times, samples

network = Network()
network.add(
    Terminal(
        net = "1~net",
        is_input = True,
        is_output = False,
        hardware_pin = "A0",
        is_ac_coupled = False,
        is_extern = False,
    ),
    PeakDetector(
        input = "1~net",
        output = "2~output",
        atk = 20000.0,
        dec = 100.0,
        model_version = ModelVersion.SecondOrder,
    ),
    Comparator(
        positive = "2~output",
        negative = "4~output",
        vdd = None,
        output = "3~output",
        threshold = 0.09,
    ),
    Filter(
        input = "2~output",
        output = "4~output",
        characteristic_frequency = 20.0,
        quality_factor = 2.0,
        filter_type = FilterType.lpf1,
    ),
    Terminal(
        net = "4~output",
        is_input = False,
        is_output = True,
        hardware_pin = "",
        is_ac_coupled = False,
        is_extern = False,
    ),
    Terminal(
        net = "2~output",
        is_input = False,
        is_output = True,
        hardware_pin = "",
        is_ac_coupled = False,
        is_extern = False,
    ),
    Terminal(
        net = "3~output",
        is_input = False,
        is_output = True,
        hardware_pin = "D3",
        is_ac_coupled = False,
        is_extern = False,
    ),
)

times, samples = load_wav()
res = simulate(network, times, samples)
print(res)