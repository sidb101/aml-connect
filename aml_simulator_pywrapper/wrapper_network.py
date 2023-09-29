"""Implementation of Wrapped Network class for the Aspinity AML simulator"""
import importlib
import json
from jinja2 import Environment, FileSystemLoader

import soundfile as sf
import numpy as np
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

    @staticmethod
    def load_wav(file_path: str):
        samples, sample_rate = sf.read(file_path)
        times = np.arange(len(samples)) / sample_rate
        return times, samples


class Network():
    @staticmethod
    def __load_element(element_json: dict):
        """Loads an element from a JSON dict, returns element_class type object"""
        element_class = getattr(
            importlib.import_module(
                "wrapper_components"), element_json["type_name"]
        )
        element = element_class(element_json)
        return element

    def __init__(self, network_json: dict):
        self.orig_network = aspinity.Network()
        self.context = {"element_imports": [], "elements": []}

        for element_json in network_json["elements"]:
            self.context["element_imports"].append(element_json["type_name"])
            element = Network.__load_element(element_json)
            self.context["elements"].append(element.as_dict())
            self.orig_network.add(element.orig_element)

    def export_context(self) -> dict:
        return self.context

    def export_sourcecode(self):
        def get_type(var):
            return type(var).__name__

        def get_items(var):
            return var.items()

        env = Environment(loader=FileSystemLoader("templates"))
        env.filters["get_type"] = get_type
        env.filters["get_items"] = get_items

        template = env.get_template("network_template.py.j2")
        with open('output.py', 'w') as f:
            f.write(template.render(self.context))
        return template.render(self.context)
