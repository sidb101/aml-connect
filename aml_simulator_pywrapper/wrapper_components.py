"""Implementation of Wrapped Component Classes for the Aspinity AML simulator"""
import json

import aspinity


def coalesce(*args):
    for arg in args:
        if arg is not None:
            return arg
    return None


class AcDiff():
    """Wrapper for aspinity AcDiff"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.AcDiff()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "AcDiff",
            "terminals": {"pos": self.orig_element.pos, "neg": self.orig_element.neg, "output": self.orig_element.output},
            "parameters": {"bias": self.orig_element.bias, "gain": self.orig_element.gain},
        }


class AsymmetricIntegrator():
    """Wrapper for aspinity AsymmetricIntergrator"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.AsymmetricIntegrator()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "AsymmetricIntegrator",
            "terminals": {"input": self.orig_element.input, "output": self.orig_element.output},
            "parameters": {
                "down": self.orig_element.down,
                "up": self.orig_element.up,
                "up_down_type": str(self.orig_element.up_down_type),
            },
        }


class Comparator():
    """Wrapper for aspinity Comparator"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.Comparator()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "Comparator",
            "terminals": {
                "positive": self.orig_element.positive,
                "negative": self.orig_element.negative,
                "vdd": self.orig_element.vdd,
                "output": self.orig_element.output,
            },
            "parameters": {
                "threshold": self.orig_element.threshold,
            },
        }


class Filter():
    """Wrapper for aspinity Filter"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.Filter()
        if elementJSON is None:
            return

        input_terminal, output_terminal = None, None
        for item in elementJSON["terminals"]:
            if item["type_name"] == "input":
                input_terminal = item["node_name"]
            elif item["type_name"] == "output":
                output_terminal = item["node_name"]
        self.orig_element.input = input_terminal
        self.orig_element.output = output_terminal
        self.orig_element.characteristic_frequency = float(
            coalesce(
                elementJSON["element_type_params"]["Filter"]["characteristic_frequency"],
                0.0
            )
        )
        self.orig_element.quality_factor = float(
            coalesce(
                elementJSON["element_type_params"]["Filter"]["quality_factor"],
                0.0
            )
        )

        filter_type_str = elementJSON["element_type_params"]["Filter"]["filter_type"]
        if filter_type_str == 'hpf2':
            self.orig_element.filter_type = aspinity.FilterType.hpf2
        elif filter_type_str == 'hpf1':
            self.orig_element.filter_type = aspinity.FilterType.hpf1
        elif filter_type_str == 'lpf1':
            self.orig_element.filter_type = aspinity.FilterType.lpf1
        elif filter_type_str == 'lpf2':
            self.orig_element.filter_type = aspinity.FilterType.lpf2
        elif filter_type_str == 'bpf2':
            self.orig_element.filter_type = aspinity.FilterType.bpf2
        else:
            self.orig_element.filter_type = aspinity.FilterType.hpf1

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "Filter",
            "terminals": {"input": self.orig_element.input, "output": self.orig_element.output},
            "parameters": {
                "characteristic_frequency": self.orig_element.characteristic_frequency,
                "quality_factor": self.orig_element.quality_factor,
                "filter_type": self.orig_element.filter_type,
            },
        }


class Filterbank():
    """Wrapper for aspinity Filterbank"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.Filterbank()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "Filterbank",
            "terminals": {
                "input": self.orig_element.input,
                "out_0": self.orig_element.out_0,
                "out_1": self.orig_element.out_1,
                "out_2": self.orig_element.out_2,
                "out_3": self.orig_element.out_3,
                "out_4": self.orig_element.out_4,
                "out_5": self.orig_element.out_5,
                "out_6": self.orig_element.out_6,
                "out_7": self.orig_element.out_7,
            },
            "parameters": {
                "band_frequencies": self.orig_element.band_frequencies,
                "quality_factor": self.orig_element.quality_factor,
                "attack_rates": self.orig_element.attack_rates,
                "decay_rates": self.orig_element.decay_rates,
            },
        }


class GainOpamp():
    """Wrapper for aspinity GainOpamp"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.GainOpamp()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "GainOpamp",
            "terminals": {"input": self.orig_element.input, "output": self.orig_element.output},
            "parameters": {
                "feedback_cap_count": self.orig_element.feedback_cap_count,
                "gain_mode": str(self.orig_element.gain_mode),
            },
        }


class LookupTable():
    """Wrapper for aspinity LookupTable"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.LookupTable()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "LookupTable",
            "terminals": {"A": self.orig_element.A, "B": self.orig_element.B, "C": self.orig_element.C, "output": self.orig_element.output},
            "parameters": {"expression": self.orig_element.expression},
        }


class DelayFlipFlop():
    """Wrapper for aspinity LookupTable"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.DelayFlipFlop()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "DelayFlipFlop",
            "terminals": {
                "input": self.orig_element.input,
                "clock": self.orig_element.clock,
                "reset": self.orig_element.reset,
                "output": self.orig_element.output,
            },
        }


class Multiplier():
    """Wrapper for aspinity Multiplier"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.Multiplier()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "Multiplier",
            "terminals": {
                "x_pos": self.orig_element.x_pos,
                "x_neg": self.orig_element.x_neg,
                "y_pos": self.orig_element.y_pos,
                "y_neg": self.orig_element.y_neg,
                "output": self.orig_element.output,
            },
            "parameters": {"slope": self.orig_element.slope},
        }


class Mux2():
    """Wrapper for aspinity Mux2"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.Mux2()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "Mux2",
            "terminals": {
                "in0": self.orig_element.in0,
                "in1": self.orig_element.in1,
                "select": self.orig_element.select,
                "output": self.orig_element.output,
            },
        }


class NeuralNet():
    """Wrapper for aspinity NeuralNet"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.NeuralNet()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "NeuralNet",
            "terminals": {
                "pos_0": self.orig_element.pos_0,
                "pos_1": self.orig_element.pos_1,
                "pos_2": self.orig_element.pos_2,
                "pos_3": self.orig_element.pos_3,
                "pos_4": self.orig_element.pos_4,
                "pos_5": self.orig_element.pos_5,
                "pos_6": self.orig_element.pos_6,
                "pos_7": self.orig_element.pos_7,
                "neg_0": self.orig_element.neg_0,
                "neg_1": self.orig_element.neg_1,
                "neg_2": self.orig_element.neg_2,
                "neg_3": self.orig_element.neg_3,
                "neg_4": self.orig_element.neg_4,
                "neg_5": self.orig_element.neg_5,
                "neg_6": self.orig_element.neg_6,
                "neg_7": self.orig_element.neg_7,
                "out_0": self.orig_element.out_0,
                "out_1": self.orig_element.out_1,
                "out_2": self.orig_element.out_2,
                "out_3": self.orig_element.out_3,
                "out_4": self.orig_element.out_4,
                "out_5": self.orig_element.out_5,
                "out_6": self.orig_element.out_6,
                "out_7": self.orig_element.out_7,
            },
            "parameters": {
                "weights": self.orig_element.weights,
                "biases": self.orig_element.biases,
                "activation_function": self.orig_element.activation_function,
            },
        }


class PeakDetector():
    """Wrapper for aspinity PeakDetector"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.PeakDetector()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "PeakDetector",
            "terminals": {"input": self.orig_element.input, "output": self.orig_element.output},
            "parameters": {
                "atk": self.orig_element.atk,
                "dec": self.orig_element.dec,
                "model_version": str(self.orig_element.model_version),
            },
        }


class PGA():
    """Wrapper for aspinity PGA"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.PGA()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "PGA",
            "terminals": {
                "pos1": self.orig_element.pos1,
                "neg1": self.orig_element.neg1,
                "pos2": self.orig_element.pos2,
                "reference": self.orig_element.reference,
                "output": self.orig_element.output,
            },
            "parameters": {"Av1": self.orig_element.Av1, "Av2": self.orig_element.Av2},
        }


class SynthesizedFilter(aspinity.SynthesizedFilter):
    """Wrapper for aspinity SynthesizedFilter"""

    def __init__(self, elementJSON: dict = None):
        self.orig_element = aspinity.SynthesizedFilter()
        if elementJSON is None:
            return

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "SynthesizedFilter",
            "terminals": {"input": self.orig_element.input, "output": self.orig_element.output},
            "parameters": {"coefficients": self.orig_element.coefficients},
        }


class Terminal():
    """Wrapper for aspinity Terminal"""

    def __init__(self, elementJSON: dict):
        """constructs a Terminal object from a JSON"""
        self.orig_element = aspinity.Terminal()

        if elementJSON is None:
            return

        for item in elementJSON["terminals"]:
            if item["type_name"] == "net":
                self.orig_element.net = item["node_name"]
        self.orig_element.is_input = coalesce(
            elementJSON["element_type_params"]["Terminal"]["is_input"], False)
        self.orig_element.is_output = coalesce(
            elementJSON["element_type_params"]["Terminal"]["is_output"], False)
        self.orig_element.hardware_pin = coalesce(
            elementJSON["element_type_params"]["Terminal"]["hardware_pin"], "")
        self.orig_element.is_ac_coupled = coalesce(
            elementJSON["element_type_params"]["Terminal"]["is_ac_coupled"], False)
        self.orig_element.is_extern = coalesce(
            elementJSON["element_type_params"]["Terminal"]["is_extern"], False)

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "Terminal",
            "terminals": {"net": self.orig_element.net},
            "parameters": {
                "is_input": self.orig_element.is_input,
                "is_output": self.orig_element.is_output,
                "hardware_pin": self.orig_element.hardware_pin,
                "is_ac_coupled": self.orig_element.is_ac_coupled,
                "is_extern": self.orig_element.is_extern,
            },
        }
