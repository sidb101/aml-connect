"""Implementation of the Simulator Wrapper Interface"""
import argparse
import json

import aspinity
from simulator_interface import AspinitySimulatorWrapperInterFace

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

        res = {
            element.__class__.__name__: element.as_dict() for element in elements
        }
        return json.dumps(res)

    @classmethod
    def simulate_network(cls, network_json: str, audio_files_json: str) -> dict:
        """Returns a simulated network's output dict as-is"""
        network = __parse_network_json(network_json)
        times, sample = __parse_audio_files(audio_files_json)

        res = aspinity.simulate_network(network, audio_files)
        return res

if __name__ == "__main__":
    PARSER = argparse.ArgumentParser(description="Wrapper to AML Simulator")

    # option that returns all elements
    PARSER.add_argument("--get_elements", action="store_true")
    ARGS = PARSER.parse_args()

    if ARGS.get_elements:
        print(AspinitySimulatorWrapper.get_elements())
