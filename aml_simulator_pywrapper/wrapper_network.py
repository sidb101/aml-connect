"""Implementation of Wrapped Network class for the Aspinity AML simulator"""
import importlib
from jinja2 import Environment, FileSystemLoader

import soundfile as sf
import numpy as np
import aspinity

class WavFileManager:
    """For managing loading of wav file(s) from disk for passing to the network"""

    def __init__(self):
        # pylint: disable=W
        # TODO: implement with a JSON paramater
        pass

    @staticmethod
    def load_wav(file_path: str):
        """loads the wav file at file_path, returns times and samples as np arrays"""
        samples, sample_rate = sf.read(file_path)
        times = np.arange(len(samples)) / sample_rate
        return times, samples


class Network():
    """Handles the loading of a network from a JSON file, and exporting of 
    dynamically generated source code for the network"""
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
        """Loads a network from a JSON dict"""
        self.orig_network = aspinity.Network()
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

    def export_sourcecode(self, wavfile_path):
        """Exports the source code for the network to a file"""
        def get_type(var):
            return type(var).__name__

        def get_items(var):
            return var.items()

        env = Environment(loader=FileSystemLoader("templates"))
        env.filters["get_type"] = get_type
        env.filters["get_items"] = get_items
        self.context['wav_file_path'] = wavfile_path
        template = env.get_template("network_template.py.j2")
        with open('output.py', 'w', encoding="utf-8") as output_file:
            output_file.write(template.render(self.context))
        del self.context['wav_file_path']
        return template.render(self.context)
