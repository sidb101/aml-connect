"""Implementation of the Simulator Wrapper Interface"""
import argparse
import json
import os

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


class AspinitySimulatorWrapper(AspinitySimulatorWrapperInterFace):
    """Wrapper class for Aspinity's Simulator"""

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
            def default(
                o): return f"<<non-serializable: {type(o).__qualname__}>>"
            return json.dumps(obj, default=default)

        res = {
            element.__class__.__name__: element.as_dict() for element in elements
        }
        return safe_serialize(res)

    @classmethod
    def simulate_network(cls, network_json_path: str, audio_file_path: str) -> dict:
        """Returns a simulated network's output dict"""

        # check network_json_path exists
        if not os.path.exists(network_json_path):
            raise FileNotFoundError(
                f"Network JSON file not found at {network_json_path}"
            )

        # check audio_file_path exists
        if not os.path.exists(audio_file_path):
            raise FileNotFoundError(
                f"Audio file not found at {audio_file_path}")

        with open(network_json_path, "r") as network_json_file:
            network_json = json.load(network_json_file)
            network = Network(network_json)
            network.export_sourcecode()
            times, samples = WavFileManager.load_wav(audio_file_path)
            result = aspinity.simulate(network.orig_network, times, samples)
            return result


if __name__ == "__main__":
    PARSER = argparse.ArgumentParser(description="Wrapper to AML Simulator")

    # Option that returns all elements
    PARSER.add_argument("--get_elements", action="store_true",
                        help="Returns all aspinity elements")

    # Option to simulate network with supporting parameters
    network_group = PARSER.add_argument_group("Network Simulation Options")
    network_group.add_argument("--simulate_network", action="store_true")
    network_group.add_argument("-network", help="Path to network file")
    network_group.add_argument("-wavfile", help="Path to WAV file")

    ARGS = PARSER.parse_args()

    if ARGS.get_elements:
        print(AspinitySimulatorWrapper.get_elements())
    elif ARGS.simulate_network:
        network_path = ARGS.network
        wavfile_path = ARGS.wavfile

        print(*AspinitySimulatorWrapper.simulate_network(network_path,
              wavfile_path).items(), sep="\n")
