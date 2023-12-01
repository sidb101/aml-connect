"""Implementation of Wrapped Network class for the Aspinity AML simulator"""
import importlib
import os
from jinja2 import Environment, FileSystemLoader

import numpy as np
import soundfile as sf

import aspinity


class WavFileManager:
    """For managing loading of wav file(s) from disk for passing to the aspinity.simulate_network"""

    @staticmethod
    def load_wav(file_path: str):
        """loads the wav file at file_path, returns times and samples as np arrays"""
        samples, sample_rate = sf.read(file_path)
        times = np.arange(len(samples)) / sample_rate
        # reduce from stereo to mono i.e. from (m, n) to (m, )
        #   m is the number of samples, n is the number of channels
        if len(samples.shape) == 2:
            samples = samples[:, 0] # pick channel 0
        # else if samples.shape is higher than 2-d (m, n, k, ....) 
        elif len(samples.shape) > 2:
            raise ValueError("Unidentified wav file format")
        return times, samples


class Network:
    """Handles the loading of a network from a JSON file, and exporting of
    dynamically generated source code for the network"""

    @staticmethod
    def __load_element(element_json: dict):
        """Loads an element from a JSON dict, returns element_class type object"""
        element_class = getattr(
            importlib.import_module("wrapper_components"), element_json["type_name"]
        )
        element = element_class(element_json)
        return element

    def __init__(self, network_json: dict):
        """Loads a network from a JSON dict"""
        self.orig_network = aspinity.Network()
        self.network_id = network_json["id"]
        self.context = {"element_imports": [], "elements": []}

        for element_json in network_json["elements"]:
            if element_json["type_name"] not in self.context["element_imports"]:
                self.context["element_imports"].append(element_json["type_name"])
            element = Network.__load_element(element_json)
            self.context["elements"].append(element.as_dict())
            self.orig_network.add(element.orig_element)

    def export_context(self) -> dict:
        """Returns the context used for rendering the source code"""
        return self.context

    def export_sourcecode(self, wavfile_path, output_dir):
        """Exports the source code for the network to a file"""

        def get_type(var):
            return type(var).__name__

        def get_items(var):
            return var.items()

        # Get the absolute path of the directory of the current script
        dir_path = os.path.dirname(os.path.realpath(__file__))

        # Use the absolute path to correctly locate the "templates" directory
        env = Environment(loader=FileSystemLoader(os.path.join(dir_path, "templates")))
        env.filters["get_type"] = get_type
        env.filters["get_items"] = get_items
        self.context["wav_file_path"] = wavfile_path
        template = env.get_template("network_template.py.j2")

        output_file_path = os.path.join(output_dir, f"nw{self.network_id}_Network.py")

        # mode='w' overwrites the file if it exists
        with open(output_file_path, "w", encoding="utf-8") as output_file:
            output_file.write(template.render(self.context))

        del self.context["wav_file_path"]
        return output_file_path
