"""Implementation of the Simulator Wrapper Interface"""
import argparse
import json
import os
import matplotlib.pyplot as plt
import numpy as np
import soundfile as sf

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

SIMULATOR_RESPONSE_KEY = "response"
VISUALIZE_KEY = "visualization_path"
VISUALIZE_DIRECTORY = "tmp"
VISUALIZE_FILE_NAME = "Network_Visual.png"


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
                obj2): return f"<<non-serializable: {type(obj2).__qualname__}>>"
            return json.dumps(obj, default=default)

        res = {
            element.__class__.__name__: element.as_dict() for element in elements
        }
        return safe_serialize(res)

    @classmethod
    def simulate_network(cls, network_json_path: str, audio_file_path: str) -> dict:
        """Returns a simulated network's output dict"""

        network, times, samples = cls._simulate_network_setup(network_json_path, audio_file_path)
        response = aspinity.simulate(network, times, samples)
        visual_file_path = cls._visualize_response(network, times, samples, response, audio_file_path)

        #generate dictionary
        output = {
            SIMULATOR_RESPONSE_KEY: response,
            VISUALIZE_KEY: visual_file_path
        }

        return output

    @classmethod
    def simulate_network_heartrate_network(cls, network_json_path: str, audio_file_path: str) -> dict:
        """
        Method ONLY for heartrate network, as this network requires two input terminals, thus requiring two samples
        Returns a simulated network's output dict
        """

        # check network_json_path exists
        if not os.path.exists(network_json_path):
            raise FileNotFoundError(
                f"Network JSON file not found at {network_json_path}"
            )

        # check audio_file_path exists
        if not os.path.exists(audio_file_path):
            raise FileNotFoundError(
                f"Audio file not found at {audio_file_path}")

        with open(network_json_path, "r", encoding="utf-8") as network_json_file:
            network_json = json.load(network_json_file)
            network = Network(network_json)
            network.export_sourcecode(audio_file_path)
            network = network.orig_network

            # process audio file
            samples, sample_rate = sf.read(audio_file_path)
            segment_start = 170
            segment_end = 190
            samples = samples[int(sample_rate*segment_start):int(sample_rate*segment_end)][:,0] #one dimension
            times = np.arange(len(samples)) / sample_rate

            tone = 0.01 * np.sin(2 * np.pi * 60 * times)
            noninverting_samples = tone + samples
            inverting_samples = tone - samples
            samples = np.array([noninverting_samples, inverting_samples]) #concat the two samples

            #simulate
            response = aspinity.simulate(network, times, samples)

            #visualize
            _, (input_subplot, output_subplot) = plt.subplots(2, 1, figsize=(10, 8))

            input_subplot.plot(times, noninverting_samples, label="noninvert")
            input_subplot.plot(times, inverting_samples, label="invert")
            input_subplot.set_ylabel("Amplitude")
            input_subplot.legend()
            input_subplot.set_title("Input")

            for terminal in network.output_terminal_names:
                terminal_name = terminal[:terminal.rfind("_out_")]
                output_subplot.plot(times, response[terminal_name], label=terminal_name)

            output_subplot.set_xlabel("Time (s)")
            output_subplot.set_ylabel("Amplitude")
            output_subplot.legend()
            output_subplot.set_title("Output")

            # configure where to store files ----------------------
            # 1) extract audio file path, get audio directory path (appData\local\com.aml...\project_slug\audio)
            # 2) go out of audio, and go into tmp
            curr_dir = os.path.dirname(audio_file_path)
            parent_dir = os.path.dirname(curr_dir)
            visualize_dir = os.path.join(parent_dir, VISUALIZE_DIRECTORY)
            if not os.path.exists(visualize_dir):
                os.makedirs(visualize_dir)

            file_path = os.path.join(visualize_dir, VISUALIZE_FILE_NAME)

            counter = 1
            while os.path.exists(file_path):
                base_name, extension = os.path.splitext(VISUALIZE_FILE_NAME)
                file_path = os.path.join(visualize_dir, f"{base_name}_{counter}{extension}")
                counter += 1

            plt.savefig(file_path)
            plt.close()

            # Return the absolute file path
            visual_file_path = file_path

            #generate dictionary
            output = {
                SIMULATOR_RESPONSE_KEY: response,
                VISUALIZE_KEY: visual_file_path
            }

            return output

    @classmethod
    def _visualize_response(cls, network, times, samples, result, audio_file_path) -> str:
        """Returns a simulated network's visualized graph filepaths in a list"""

        # generate graph (1 subplot for input, 1 subplot for output)
        _, (input_subplot, output_subplot) = plt.subplots(2, 1, figsize=(10, 8))

        input_subplot.plot(times, samples, label="wav file")
        input_subplot.set_ylabel("Amplitude")
        input_subplot.legend()
        input_subplot.set_title("Input")

        for terminal in network.output_terminal_names:
            #finds the last appearance of _out_ and removes it and anything after that
            #reasoning: after running simulate, the edges will automatically append _out_ to the keys
            terminal_name = terminal[:terminal.rfind("_out_")]
            output_subplot.plot(times, result[terminal_name], label=terminal_name)

        output_subplot.set_xlabel("Time (s)")
        output_subplot.set_ylabel("Amplitude")
        output_subplot.legend()
        output_subplot.set_title("Output")

        # audio_file_path = os.path.join(
        # parent_dir, "test_resources", "rising-chirp.wav")

        # configure where to store files ----------------------
        # 1) extract audio file path, get audio directory path (appData\local\com.aml...\project_slug\audio)
        # 2) go out of audio, and go into tmp
        curr_dir = os.path.dirname(audio_file_path)
        parent_dir = os.path.dirname(curr_dir)
        visualize_dir = os.path.join(parent_dir, VISUALIZE_DIRECTORY)
        if not os.path.exists(visualize_dir):
            os.makedirs(visualize_dir)

        file_path = os.path.join(visualize_dir, VISUALIZE_FILE_NAME)

        # if file name exists, will append _1, _2 and so on...
        counter = 1
        while os.path.exists(file_path):
            base_name, extension = os.path.splitext(VISUALIZE_FILE_NAME)
            file_path = os.path.join(visualize_dir, f"{base_name}_{counter}{extension}")
            counter += 1

        plt.savefig(file_path)
        plt.close()

        # Return the absolute file path
        return file_path

    @classmethod
    def _simulate_network_setup(cls, network_json_path: str, audio_file_path: str) -> tuple:
        """Returns aspinity.Network, times array, samples array"""

        # check network_json_path exists
        if not os.path.exists(network_json_path):
            raise FileNotFoundError(
                f"Network JSON file not found at {network_json_path}"
            )

        # check audio_file_path exists
        if not os.path.exists(audio_file_path):
            raise FileNotFoundError(
                f"Audio file not found at {audio_file_path}")

        with open(network_json_path, "r", encoding="utf-8") as network_json_file:
            network_json = json.load(network_json_file)
            network = Network(network_json)
            network.export_sourcecode(audio_file_path)
            times, samples = WavFileManager.load_wav(audio_file_path)
            return network.orig_network, times, samples

if __name__ == "__main__":  # pragma: no cover
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
