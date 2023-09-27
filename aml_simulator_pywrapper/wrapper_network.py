"""Implementation of Wrapped Network class for the Aspinity AML simulator"""
import importlib

import aspinity
from wrapper_components import (
    AcDiff,
    AsymmetricIntegrator,
    Comparator,
    Filter,
    Filterbank,
    GainOpamp,
    LookupTable,
    DelayFlipFlop,
    Multiplier,
    Mux2,
    NeuralNet,
    PeakDetector,
    PGA,
    SynthesizedFilter,
    Terminal
)


class WavFileManager:
    def __init__(self):
        # TODO: implement with a JSON paramater
        pass

    @classmethod
    def load_wav(file_path: str):
        samples, sample_rate = sf.read(file_path)
        times = np.arange(len(samples)) / sample_rate
        return times, samples


class Network(aspinity.Network):
    def __load_element(self, element_json: dict):
        """Loads an element from a JSON dict"""
        element_class = getattr(
            importlib.import_module("wrapper_components"), element_json["type_name"]
        )
        element = element_class(element_json)
        return element

    def __init__(self, network_json: dict):
        super().__init__()
        for element_json in network_json["elements"]:
            element = self.__load_element(element_json)
            self.add(element)