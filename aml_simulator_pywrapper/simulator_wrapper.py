"""Importing the Simulator Interface to implement"""
import argparse
import json

import aspinity
from simulator_interface import AspinitySimulatorWrapperInterFace


class AcDiff(aspinity.AcDiff):
    """Wrapper for aspinity AcDiff"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {"pos": self.pos, "neg": self.neg, "output": self.output},
            "parameters": {"bias": self.bias, "gain": self.gain},
        }


class AsymmetricIntegrator(aspinity.AsymmetricIntegrator):
    """Wrapper for aspinity AsymmetricIntergrator"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {"input": self.input, "output": self.output},
            "parameters": {
                "down": self.down,
                "up": self.up,
                "up_down_type": str(self.up_down_type),
            },
        }


class Comparator(aspinity.Comparator):
    """Wrapper for aspinity Comparator"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {
                "positive": self.positive,
                "negative": self.negative,
                "vdd": self.vdd,
                "output": self.output,
            },
            "parameters": {
                "threshold": self.threshold,
            },
        }


class Filter(aspinity.Filter):
    """Wrapper for aspinity Filter"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {"input": self.input, "output": self.output},
            "parameters": {
                "characteristic_frequency": self.characteristic_frequency,
                "quality_factor": self.quality_factor,
                "filter_type": str(self.filter_type),
            },
        }


class Filterbank(aspinity.Filterbank):
    """Wrapper for aspinity Filterbank"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {
                "input": self.input,
                "out_0": self.out_0,
                "out_1": self.out_1,
                "out_2": self.out_2,
                "out_3": self.out_3,
                "out_4": self.out_4,
                "out_5": self.out_5,
                "out_6": self.out_6,
                "out_7": self.out_7,
            },
            "parameters": {
                "band_frequencies": self.band_frequencies,
                "quality_factor": self.quality_factor,
                "attack_rates": self.attack_rates,
                "decay_rates": self.decay_rates,
            },
        }


class GainOpamp(aspinity.GainOpamp):
    """Wrapper for aspinity GainOpamp"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {"input": self.input, "output": self.output},
            "parameters": {
                "feedback_cap_count": self.feedback_cap_count,
                "gain_mode": str(self.gain_mode),
            },
        }


class LookupTable(aspinity.LookupTable):
    """Wrapper for aspinity LookupTable"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {"A": self.A, "B": self.B, "C": self.C, "output": self.output},
            "parameters": {"expression": self.expression},
        }


class DelayFlipFlop(aspinity.DelayFlipFlop):
    """Wrapper for aspinity LookupTable"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {
                "input": self.input,
                "clock": self.clock,
                "reset": self.reset,
                "output": self.output,
            },
        }


class Multiplier(aspinity.Multiplier):
    """Wrapper for aspinity Multiplier"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {
                "x_pos": self.x_pos,
                "x_neg": self.x_neg,
                "y_pos": self.y_pos,
                "y_neg": self.y_neg,
                "output": self.output,
            },
            "parameters": {"slope": self.slope},
        }


class Mux2(aspinity.Mux2):
    """Wrapper for aspinity Mux2"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {
                "in0": self.in0,
                "in1": self.in1,
                "select": self.select,
                "output": self.output,
            },
        }


class NeuralNet(aspinity.NeuralNet):
    """Wrapper for aspinity NeuralNet"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {
                "pos_0": self.pos_0,
                "pos_1": self.pos_1,
                "pos_2": self.pos_2,
                "pos_3": self.pos_3,
                "pos_4": self.pos_4,
                "pos_5": self.pos_5,
                "pos_6": self.pos_6,
                "pos_7": self.pos_7,
                "neg_0": self.neg_0,
                "neg_1": self.neg_1,
                "neg_2": self.neg_2,
                "neg_3": self.neg_3,
                "neg_4": self.neg_4,
                "neg_5": self.neg_5,
                "neg_6": self.neg_6,
                "neg_7": self.neg_7,
                "out_0": self.out_0,
                "out_1": self.out_1,
                "out_2": self.out_2,
                "out_3": self.out_3,
                "out_4": self.out_4,
                "out_5": self.out_5,
                "out_6": self.out_6,
                "out_7": self.out_7,
            },
            "parameters": {
                "weights": self.weights,
                "biases": self.biases,
                "activation_function": self.activation_function,
            },
        }


class PeakDetector(aspinity.PeakDetector):
    """Wrapper for aspinity PeakDetector"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {"input": self.input, "output": self.output},
            "parameters": {
                "atk": self.atk,
                "dec": self.dec,
                "model_version": str(self.model_version),
            },
        }


class PGA(aspinity.PGA):
    """Wrapper for aspinity PGA"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {
                "pos1": self.pos1,
                "neg1": self.neg1,
                "pos2": self.pos2,
                "reference": self.reference,
                "output": self.output,
            },
            "parameters": {"Av1": self.Av1, "Av2": self.Av2},
        }


class SynthesizedFilter(aspinity.SynthesizedFilter):
    """Wrapper for aspinity SynthesizedFilter"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "terminals": {"input": self.input, "output": self.output},
            "parameters": {"coefficients": self.coefficients},
        }


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


if __name__ == "__main__":
    PARSER = argparse.ArgumentParser(description="Wrapper to AML Simulator")

    # option that returns all elements
    PARSER.add_argument("--get_elements", action="store_true")
    ARGS = PARSER.parse_args()

    if ARGS.get_elements:
        print(AspinitySimulatorWrapper.get_elements())
