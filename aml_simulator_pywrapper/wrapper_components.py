"""Implementation of Wrapped Component Classes for the Aspinity AML simulator"""
import json

import aspinity

class AcDiff(aspinity.AcDiff):
    """Wrapper for aspinity AcDiff"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "AcDiff",
            "terminals": {"pos": self.pos, "neg": self.neg, "output": self.output},
            "parameters": {"bias": self.bias, "gain": self.gain},
        }


class AsymmetricIntegrator(aspinity.AsymmetricIntegrator):
    """Wrapper for aspinity AsymmetricIntergrator"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "AsymmetricIntegrator",
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
            "element_type": "Comparator",
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

    def __init__(self, elementJSON: str):
        elementJSON = json.loads(elementJSON)
        input_terminal, output_terminal = None, None
        for item in elementJSON["terminals"]:
            if item["type_name"] == "input":
                input_terminal = item["node_name"]
            elif item["type_name"] == "output":
                output_terminal = item["node_name"]
        self.input = input_terminal
        self.output = output_terminal
        self.characteristic_frequency = float(
            elementJSON["element_type_params"]["Filter"]["characteristic_frequency"])
        self.quality_factor = float(
            elementJSON["element_type_params"]["Filter"]["quality_factor"])
        filter_type_str = elementJSON["element_type_params"]["Filter"]["filter_type"]
        if filter_type_str == 'hpf2':
            self.filter_type = aspinity.FilterType.hpf2
        elif filter_type_str == 'hpf1':
            self.filter_type = aspinity.FilterType.hpf1
        elif filter_type_str == 'lpf1':
            self.filter_type = aspinity.FilterType.lpf1
        elif filter_type_str == 'lpf2':
            self.filter_type = aspinity.FilterType.lpf2
        elif filter_type_str == 'bpf2':
            self.filter_type = aspinity.FilterType.bpf2
        else:
            self.filter_type = aspinity.FilterType.hpf1

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "Filter",
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
            "element_type": "Filterbank",
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
            "element_type": "GainOpamp",
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
            "element_type": "LookupTable",
            "terminals": {"A": self.A, "B": self.B, "C": self.C, "output": self.output},
            "parameters": {"expression": self.expression},
        }


class DelayFlipFlop(aspinity.DelayFlipFlop):
    """Wrapper for aspinity LookupTable"""

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "DelayFlipFlop",
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
            "element_type": "Multiplier",
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
            "element_type": "Mux2",
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
            "element_type": "NeuralNet",
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
            "element_type": "PeakDetector",
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
            "element_type": "PGA",
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
            "element_type": "SynthesizedFilter",
            "terminals": {"input": self.input, "output": self.output},
            "parameters": {"coefficients": self.coefficients},
        }


class Terminal(aspinity.Terminal):
    """Wrapper for aspinity Terminal"""

    def __init__(self, elementJSON: str):
        """constructs a Terminal object from a JSON"""
        elementJSON = json.loads(elementJSON)
        for item in elementJSON["terminals"]:
            if item["type_name"] == "net":
                self.net = item["node_name"]
        self.is_input = elementJSON["element_type_params"]["Terminal"]["is_input"]
        self.is_output = elementJSON["element_type_params"]["Terminal"]["is_output"]
        self.hardware_pin = elementJSON["element_type_params"]["Terminal"]["hardware_pin"]
        self.is_ac_coupled = elementJSON["element_type_params"]["Terminal"]["is_ac_coupled"]
        self.is_extern = elementJSON["element_type_params"]["Terminal"]["is_extern"]

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "Terminal",
            "terminals": {"net": self.net},
            "parameters": {
                "is_input": self.is_input,
                "is_output": self.is_output,
                "hardware_pin": self.hardware_pin,
                "is_ac_coupled": self.is_ac_coupled,
                "is_extern": self.is_extern,
            },
        }
