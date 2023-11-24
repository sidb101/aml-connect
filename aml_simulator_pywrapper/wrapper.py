"""Implementation of the Simulator Wrapper Interface"""
import argparse
import json
import os
import matplotlib.pyplot as plt

import aspinity
from wrapper_interface import AspinitySimulatorWrapperInterFace
from wrapper_network import Network, WavFileManager
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
)

# Response dictionary keys (refer aml_core::network_manager::SimulateNetworkResponse)
SIMULATOR_RESPONSE_KEY = "response"
PY_CODE_KEY = "py_code_path"
VISUALIZE_KEY = "visualization_path"

# Output artefact filenames
VISUALIZE_FILE_NAME = "Network_Visual.png"


class AspinitySimulatorWrapper(AspinitySimulatorWrapperInterFace):
    """Wrapper class for Aspinity's Simulator"""

    def __init__(
        self, network_json_path: str, audio_file_path: str, project_tmp_dir: str
    ):
        """Initializes the wrapper"""

        if not os.path.exists(network_json_path):
            raise FileNotFoundError(
                f"Network JSON file not found at {network_json_path}"
            )

        if not os.path.exists(audio_file_path):
            raise FileNotFoundError(f"Audio file not found at {audio_file_path}")

        if not os.path.exists(project_tmp_dir):
            raise FileNotFoundError(
                f"Project tmp directory not found at {project_tmp_dir}"
            )

        self.network_json_path = network_json_path
        self.audio_file_path = audio_file_path
        self.project_tmp_dir = project_tmp_dir

        with open(self.network_json_path, "r", encoding="utf-8") as network_json_file:
            network_json = json.load(network_json_file)
            self.wrapped_network = Network(network_json)
            self.times, self.samples = WavFileManager.load_wav(audio_file_path)

    def _generate_source_code(self) -> str:
        """Returns the source code for the network"""

        return self.wrapped_network.export_sourcecode(
            self.audio_file_path, self.project_tmp_dir
        )

    def simulate_network(self) -> dict:
        """Returns a dictionary containing the simulated network's output,
        path to generated python code, and path to visualized graph file"""

        response = aspinity.simulate(
            self.wrapped_network.orig_network, self.times, self.samples
        )
        py_code_path = self._generate_source_code()
        visual_file_path = self._visualize_response(response)

        output = {
            SIMULATOR_RESPONSE_KEY: response,
            PY_CODE_KEY: py_code_path,
            VISUALIZE_KEY: visual_file_path,
        }

        return output

    def _visualize_response(self, response: dict) -> str:
        """Returns a simulated network's visualized graph filepaths in a list"""

        network = self.wrapped_network.orig_network
        times, samples = self.times, self.samples

        # generate graph (1 subplot for input, 1 subplot for output)
        _, (input_subplot, output_subplot) = plt.subplots(2, 1, figsize=(10, 8))

        input_subplot.plot(times, samples, label="wav file")
        input_subplot.set_ylabel("Amplitude")
        input_subplot.legend()
        input_subplot.set_title("Input")

        for terminal in network.output_terminal_names:
            # finds the last appearance of _out_ and removes it and anything after that
            # reasoning: after running simulate, the edges will automatically append _out_ to the keys
            terminal_name = terminal[: terminal.rfind("_out_")]
            output_subplot.plot(times, response[terminal_name], label=terminal_name)

        output_subplot.set_xlabel("Time (s)")
        output_subplot.set_ylabel("Amplitude")
        output_subplot.legend()
        output_subplot.set_title("Output")

        # overwrite the file if it exists, there's no purge mechanism yet
        file_path = os.path.join(self.project_tmp_dir, VISUALIZE_FILE_NAME)

        plt.savefig(file_path)
        plt.close()

        # Return the absolute file path
        return file_path

    @classmethod
    def get_elements(cls):
        """Returns json representation of list of Elements"""
        elements = [
            AcDiff(),
            AsymmetricIntegrator(),
            Comparator(),
            Filter(),
            Filterbank(),
            GainOpamp(),
            LookupTable(),
            DelayFlipFlop(),
            Multiplier(),
            Mux2(),
            NeuralNet(),
            PeakDetector(),
            PGA(),
            SynthesizedFilter(),
        ]

        def safe_serialize(obj):
            def default(obj2):
                return f"<<non-serializable: {type(obj2).__qualname__}>>"

            return json.dumps(obj, default=default)

        res = {element.__class__.__name__: element.as_dict() for element in elements}
        return safe_serialize(res)


if __name__ == "__main__":  # pragma: no cover
    PARSER = argparse.ArgumentParser(description="Wrapper to AML Simulator")

    # Option that returns all elements
    PARSER.add_argument(
        "--get_elements", action="store_true", help="Returns all aspinity elements"
    )

    # Option to simulate network with supporting parameters
    network_group = PARSER.add_argument_group("Network Simulation Options")
    network_group.add_argument("--simulate_network", action="store_true")
    network_group.add_argument("-network", help="Path to network file")
    network_group.add_argument("-wavfile", help="Path to WAV file")
    network_group.add_argument("-tmp_dir", help="Project tmp path to store output")

    ARGS = PARSER.parse_args()

    if ARGS.get_elements:
        print(AspinitySimulatorWrapper.get_elements())
    elif ARGS.simulate_network:
        network_path = ARGS.network
        wavfile_path = ARGS.wavfile
        tmp_dir = ARGS.tmp_dir
        sim_wrapper = AspinitySimulatorWrapper(network_path, wavfile_path, tmp_dir)
        ret = sim_wrapper.simulate_network()

        # Option 1 - convert the response values to lists, and store 2MB+ data
        # in a file, and return the file instead [[future]]
        ret["response"] = {key: list(value) for key, value in ret["response"].items()}
        output_json = json.dumps(ret, indent=4)
        with open(os.path.join(tmp_dir, "response.json"), "w") as f:
            f.write(output_json)

        # Option 2 - remove the response key, as it is not needed yet [[current]]
        del ret["response"]
        print(ret)
