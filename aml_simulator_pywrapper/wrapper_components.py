"""Implementation of Wrapped Component Classes for the Aspinity AML simulator"""

import aspinity
from aspinity import ActivationFunction


def coalesce(*args):
    """picks the first non-None value in the list of args"""
    for arg in args:
        if arg is not None:
            return arg
    return None


def map_activation_function_str_to_enum(enum_str):
    """Maps the activation function string to the corresponding enum value"""
    if enum_str == "Tanh":
        return ActivationFunction.Tanh
    if enum_str == "Sigmoid":
        return ActivationFunction.Sigmoid
    if enum_str == "ReLU":
        return ActivationFunction.ReLU
    if enum_str == "Linear":
        return ActivationFunction.Linear
    return None

class AcDiff():
    """Wrapper for aspinity AcDiff"""

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.AcDiff()
        if element_json is None:
            return

        # terminals
        pos_terminal, neg_terminal, out_terminal = None, None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "pos":
                pos_terminal = item["node_name"]
            elif item["type_name"] == "neg":
                neg_terminal = item["node_name"]
            elif item["type_name"] == "output":
                out_terminal = item["node_name"]

        self.orig_element.pos = pos_terminal
        self.orig_element.neg = neg_terminal
        self.orig_element.output = out_terminal

        # params
        self.orig_element.gain = float(
            coalesce(
                element_json["element_type_params"]["AcDiff"].get("gain"),
                9.0
            )
        )

        # hidden params
        if element_json["element_type_params"]["AcDiff"].get("bias") is not None:
            self.orig_element.bias = float(
                element_json["element_type_params"]["AcDiff"].get("bias"))

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "AcDiff",
            "terminals": {
                "pos": self.orig_element.pos, 
                "neg": self.orig_element.neg, 
                "output": self.orig_element.output
            },
            "parameters": {
                "bias": self.orig_element.bias, 
                "gain": self.orig_element.gain
            },
        }


class AsymmetricIntegrator():
    """Wrapper for aspinity AsymmetricIntergrator"""

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.AsymmetricIntegrator()
        if element_json is None:
            return

        # terminals
        in_terminal, out_terminal = None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "input":
                in_terminal = item["node_name"]
            elif item["type_name"] == "output":
                out_terminal = item["node_name"]

        self.orig_element.input = in_terminal
        self.orig_element.output = out_terminal

        # params
        self.orig_element.up = float(
            coalesce(
                element_json["element_type_params"]["AsymmetricIntegrator"].get(
                    "up"),
                100
            )
        )
        self.orig_element.down = float(
            coalesce(
                element_json["element_type_params"]["AsymmetricIntegrator"].get(
                    "down"),
                10
            )
        )
        up_down_type_str = element_json["element_type_params"]["AsymmetricIntegrator"].get(
            "up_down_type")
        if up_down_type_str == 'Rate':
            self.orig_element.up_down_type = aspinity.UpDownType.Rate
        elif up_down_type_str == 'Hang':
            self.orig_element.up_down_type = aspinity.UpDownType.Hang
        else:
            self.orig_element.up_down_type = aspinity.UpDownType.Rate  # default value
        self.orig_element.comparator_enable = bool(
            coalesce(
                element_json["element_type_params"]["AsymmetricIntegrator"].get(
                    "comparator_enable"),
                False
            )
        )

        # hidden params
        if element_json["element_type_params"]["AsymmetricIntegrator"].get("buffer_gm") is not None:
            self.orig_element.buffer_gm = float(
                element_json["element_type_params"]["AsymmetricIntegrator"].get("buffer_gm"))
        if element_json["element_type_params"]["AsymmetricIntegrator"].get("capacitor_configuration") is not None:
            capacitor_configuration_str = element_json["element_type_params"]["AsymmetricIntegrator"].get(
                "capacitor_configuration")
            if capacitor_configuration_str == 'Internal':
                self.orig_element.capacitor_configuration = aspinity.CapacitorConfiguration.Internal
            elif capacitor_configuration_str == 'Internal2x':
                self.orig_element.capacitor_configuration = aspinity.CapacitorConfiguration.Internal2x
            elif capacitor_configuration_str == 'Internal3x':
                self.orig_element.capacitor_configuration = aspinity.CapacitorConfiguration.Internal3x
            elif capacitor_configuration_str == 'Internal4x':
                self.orig_element.capacitor_configuration = aspinity.CapacitorConfiguration.Internal4x
            elif capacitor_configuration_str == 'Internal4x_2xS4_S3':
                self.orig_element.capacitor_configuration = aspinity.CapacitorConfiguration.Internal4x_2xS4_S3
            elif capacitor_configuration_str == 'Internal4x_2xS4_S3_S2':
                self.orig_element.capacitor_configuration = aspinity.CapacitorConfiguration.Internal4x_2xS4_S3_S2
            elif capacitor_configuration_str == 'Internal4x_S4':
                self.orig_element.capacitor_configuration = aspinity.CapacitorConfiguration.Internal4x_S4
            elif capacitor_configuration_str == 'ParasiticOnly':
                self.orig_element.capacitor_configuration = aspinity.CapacitorConfiguration.ParasiticOnly
        if element_json["element_type_params"]["AsymmetricIntegrator"].get("parasitic_capacitance") is not None:
            self.orig_element.parasitic_capacitance = float(
                element_json["element_type_params"]["AsymmetricIntegrator"].get("parasitic_capacitance"))
        if element_json["element_type_params"]["AsymmetricIntegrator"].get("unit_capacitance") is not None:
            self.orig_element.unit_capacitance = float(
                element_json["element_type_params"]["AsymmetricIntegrator"].get("unit_capacitance"))

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.Comparator()
        if element_json is None:
            return

        # terminals
        pos_terminal, neg_terminal, vdd_terminal, out_terminal = None, None, None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "positive":
                pos_terminal = item["node_name"]
            elif item["type_name"] == "negative":
                neg_terminal = item["node_name"]
            elif item["type_name"] == "vdd":
                vdd_terminal = item["node_name"]
            elif item["type_name"] == "output":
                out_terminal = item["node_name"]

        self.orig_element.positive = pos_terminal
        self.orig_element.negative = neg_terminal
        self.orig_element.vdd = vdd_terminal
        self.orig_element.output = out_terminal

        # params
        self.orig_element.threshold = float(
            coalesce(
                element_json["element_type_params"]["Comparator"].get(
                    "threshold"),
                0.0
            )
        )

        # hidden params
        if element_json["element_type_params"]["Comparator"].get("hysteresis_voltage") is not None:
            self.orig_element.hysteresis_voltage = float(
                element_json["element_type_params"]["Comparator"].get("hysteresis_voltage"))

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.Filter()
        if element_json is None:
            return

        # terminals
        input_terminal, output_terminal = None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "input":
                input_terminal = item["node_name"]
            elif item["type_name"] == "output":
                output_terminal = item["node_name"]
        self.orig_element.input = input_terminal
        self.orig_element.output = output_terminal

        # params
        self.orig_element.characteristic_frequency = float(
            coalesce(
                element_json["element_type_params"]["Filter"].get(
                    "characteristic_frequency"),
                1e3
            )
        )
        self.orig_element.quality_factor = float(
            coalesce(
                element_json["element_type_params"]["Filter"].get(
                    "quality_factor"),
                2
            )
        )

        filter_type_str = element_json["element_type_params"]["Filter"].get(
            "filter_type")
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
            self.orig_element.filter_type = aspinity.FilterType.bpf2  # default value

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.Filterbank()
        if element_json is None:
            return

        # terminals
        in_terminal = None
        out0_terminal = None
        out1_terminal = None
        out2_terminal = None
        out3_terminal = None
        out4_terminal = None
        out5_terminal = None
        out6_terminal = None
        out7_terminal = None
        for item in element_json["terminals"]:
            if item["type_name"] == "input":
                in_terminal = item["node_name"]
            elif item["type_name"] == "out_0":
                out0_terminal = item["node_name"]
            elif item["type_name"] == "out_1":
                out1_terminal = item["node_name"]
            elif item["type_name"] == "out_2":
                out2_terminal = item["node_name"]
            elif item["type_name"] == "out_3":
                out3_terminal = item["node_name"]
            elif item["type_name"] == "out_4":
                out4_terminal = item["node_name"]
            elif item["type_name"] == "out_5":
                out5_terminal = item["node_name"]
            elif item["type_name"] == "out_6":
                out6_terminal = item["node_name"]
            elif item["type_name"] == "out_7":
                out7_terminal = item["node_name"]

        self.orig_element.input = in_terminal
        self.orig_element.out_0 = out0_terminal
        self.orig_element.out_1 = out1_terminal
        self.orig_element.out_2 = out2_terminal
        self.orig_element.out_3 = out3_terminal
        self.orig_element.out_4 = out4_terminal
        self.orig_element.out_5 = out5_terminal
        self.orig_element.out_6 = out6_terminal
        self.orig_element.out_7 = out7_terminal

        # params
        band_freq_vals = element_json["element_type_params"]["Filterbank"].get(
            "band_frequencies")
        self.orig_element.band_frequencies = [
            float(x) for x in band_freq_vals] if band_freq_vals is not None else [1000, 5000]

        quality_factor_vals = element_json["element_type_params"]["Filterbank"].get(
            "quality_factor")
        self.orig_element.quality_factor = [float(
            x) for x in quality_factor_vals] if quality_factor_vals is not None else [1, 1]

        attack_rates_vals = element_json["element_type_params"]["Filterbank"].get(
            "attack_rates")
        self.orig_element.attack_rates = [
            float(x) for x in attack_rates_vals] if attack_rates_vals is not None else []

        decay_rates_vals = element_json["element_type_params"]["Filterbank"].get(
            "decay_rates")
        self.orig_element.decay_rates = [
            float(x) for x in decay_rates_vals] if decay_rates_vals is not None else []

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.GainOpamp()
        if element_json is None:
            return

        # terminals
        in_terminal, ref_terminal, out_terminal = None, None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "input":
                in_terminal = item["node_name"]
            elif item["type_name"] == "reference":
                ref_terminal = item["node_name"]
            elif item["type_name"] == "output":
                out_terminal = item["node_name"]

        self.orig_element.input = in_terminal
        self.orig_element.reference = ref_terminal
        self.orig_element.output = out_terminal

        # params
        gain_mode_str = element_json["element_type_params"]["GainOpamp"].get(
            "gain_mode")
        if gain_mode_str == 'Noninverting1x':
            self.orig_element.gain_mode = aspinity.GainOpampMode.Noninverting1x
        elif gain_mode_str == 'Noninverting11x':
            self.orig_element.gain_mode = aspinity.GainOpampMode.Noninverting11x
        elif gain_mode_str == 'Inverting2x':
            self.orig_element.gain_mode = aspinity.GainOpampMode.Inverting2x
        elif gain_mode_str == 'Inverting4x':
            self.orig_element.gain_mode = aspinity.GainOpampMode.Inverting4x
        elif gain_mode_str == 'Inverting10x':
            self.orig_element.gain_mode = aspinity.GainOpampMode.Inverting10x
        elif gain_mode_str == 'Inverting20x':
            self.orig_element.gain_mode = aspinity.GainOpampMode.Inverting20x
        else:
            self.orig_element.gain_mode = aspinity.GainOpampMode.Inverting10x  # default value

        self.orig_element.feedback_cap_count = int(
            coalesce(
                element_json["element_type_params"]["GainOpamp"].get(
                    "feedback_cap_count"),
                0
            )
        )

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.LookupTable()
        if element_json is None:
            return

        # terminals
        a_terminal, b_terminal, c_terminal, out_terminal = None, None, None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "A":
                a_terminal = item["node_name"]
            if item["type_name"] == "B":
                b_terminal = item["node_name"]
            elif item["type_name"] == "C":
                c_terminal = item["node_name"]
            elif item["type_name"] == "output":
                out_terminal = item["node_name"]

        self.orig_element.A = a_terminal
        self.orig_element.B = b_terminal
        self.orig_element.C = c_terminal
        self.orig_element.output = out_terminal

        # params
        self.orig_element.expression = str(
            coalesce(
                element_json["element_type_params"]["LookupTable"].get(
                    "expression"),
                1
            )
        )

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "LookupTable",
            "terminals": {"A": self.orig_element.A, "B": self.orig_element.B, "C": self.orig_element.C, "output": self.orig_element.output},
            "parameters": {"expression": self.orig_element.expression},
        }


class DelayFlipFlop():
    """Wrapper for aspinity LookupTable"""

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.DelayFlipFlop()
        if element_json is None:
            return

        # terminals
        in_terminal, reset_terminal, clock_terminal, out_terminal = None, None, None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "input":
                in_terminal = item["node_name"]
            if item["type_name"] == "reset":
                reset_terminal = item["node_name"]
            elif item["type_name"] == "clock":
                clock_terminal = item["node_name"]
            elif item["type_name"] == "output":
                out_terminal = item["node_name"]

        self.orig_element.input = in_terminal
        self.orig_element.reset = reset_terminal
        self.orig_element.clock = clock_terminal
        self.orig_element.output = out_terminal

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.Multiplier()
        if element_json is None:
            return

        # terminals
        x_pos_terminal, x_neg_terminal, y_pos_terminal, y_neg_terminal, out_terminal = None, None, None, None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "x_pos":
                x_pos_terminal = item["node_name"]
            elif item["type_name"] == "x_neg":
                x_neg_terminal = item["node_name"]
            elif item["type_name"] == "y_pos":
                y_pos_terminal = item["node_name"]
            elif item["type_name"] == "y_neg":
                y_neg_terminal = item["node_name"]
            elif item["type_name"] == "output":
                out_terminal = item["node_name"]

        self.orig_element.x_pos = x_pos_terminal
        self.orig_element.x_neg = x_neg_terminal
        self.orig_element.y_pos = y_pos_terminal
        self.orig_element.y_neg = y_neg_terminal
        self.orig_element.output = out_terminal

        # params
        self.orig_element.slope = float(
            coalesce(
                element_json["element_type_params"]["Multiplier"].get("slope"),
                1.0
            )
        )

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.Mux2()
        if element_json is None:
            return

        # terminals
        in0_terminal, in1_terminal, sel_terminal, out_terminal = None, None, None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "in0":
                in0_terminal = item["node_name"]
            elif item["type_name"] == "in1":
                in1_terminal = item["node_name"]
            elif item["type_name"] == "select":
                sel_terminal = item["node_name"]
            elif item["type_name"] == "output":
                out_terminal = item["node_name"]

        self.orig_element.in0 = in0_terminal
        self.orig_element.in1 = in1_terminal
        self.orig_element.select = sel_terminal
        self.orig_element.output = out_terminal

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.NeuralNet()
        if element_json is None:
            return

        # terminals
        pos0_terminal, pos1_terminal, pos2_terminal, pos3_terminal, \
            pos4_terminal, pos5_terminal, pos6_terminal, pos7_terminal = \
                None, None, None, None, None, None, None, None
        neg0_terminal, neg1_terminal, neg2_terminal, neg3_terminal, \
            neg4_terminal, neg5_terminal, neg6_terminal, neg7_terminal = \
                None, None, None, None, None, None, None, None
        out0_terminal, out1_terminal, out2_terminal, out3_terminal, \
            out4_terminal, out5_terminal, out6_terminal, out7_terminal = \
                None, None, None, None, None, None, None, None

        for item in element_json["terminals"]:
            if item["type_name"] == "pos_0":
                pos0_terminal = item["node_name"]
            elif item["type_name"] == "pos_1":
                pos1_terminal = item["node_name"]
            elif item["type_name"] == "pos_2":
                pos2_terminal = item["node_name"]
            elif item["type_name"] == "pos_3":
                pos3_terminal = item["node_name"]
            elif item["type_name"] == "pos_4":
                pos4_terminal = item["node_name"]
            elif item["type_name"] == "pos_5":
                pos5_terminal = item["node_name"]
            elif item["type_name"] == "pos_6":
                pos6_terminal = item["node_name"]
            elif item["type_name"] == "pos_7":
                pos7_terminal = item["node_name"]
            elif item["type_name"] == "neg_0":
                neg0_terminal = item["node_name"]
            elif item["type_name"] == "neg_1":
                neg1_terminal = item["node_name"]
            elif item["type_name"] == "neg_2":
                neg2_terminal = item["node_name"]
            elif item["type_name"] == "neg_3":
                neg3_terminal = item["node_name"]
            elif item["type_name"] == "neg_4":
                neg4_terminal = item["node_name"]
            elif item["type_name"] == "neg_5":
                neg5_terminal = item["node_name"]
            elif item["type_name"] == "neg_6":
                neg6_terminal = item["node_name"]
            elif item["type_name"] == "neg_7":
                neg7_terminal = item["node_name"]
            elif item["type_name"] == "out_0":
                out0_terminal = item["node_name"]
            elif item["type_name"] == "out_1":
                out1_terminal = item["node_name"]
            elif item["type_name"] == "out_2":
                out2_terminal = item["node_name"]
            elif item["type_name"] == "out_3":
                out3_terminal = item["node_name"]
            elif item["type_name"] == "out_4":
                out4_terminal = item["node_name"]
            elif item["type_name"] == "out_5":
                out5_terminal = item["node_name"]
            elif item["type_name"] == "out_6":
                out6_terminal = item["node_name"]
            elif item["type_name"] == "out_7":
                out7_terminal = item["node_name"]

        self.orig_element.pos_0 = pos0_terminal
        self.orig_element.pos_1 = pos1_terminal
        self.orig_element.pos_2 = pos2_terminal
        self.orig_element.pos_3 = pos3_terminal
        self.orig_element.pos_4 = pos4_terminal
        self.orig_element.pos_5 = pos5_terminal
        self.orig_element.pos_6 = pos6_terminal
        self.orig_element.pos_7 = pos7_terminal
        self.orig_element.neg_0 = neg0_terminal
        self.orig_element.neg_1 = neg1_terminal
        self.orig_element.neg_2 = neg2_terminal
        self.orig_element.neg_3 = neg3_terminal
        self.orig_element.neg_4 = neg4_terminal
        self.orig_element.neg_5 = neg5_terminal
        self.orig_element.neg_6 = neg6_terminal
        self.orig_element.neg_7 = neg7_terminal
        self.orig_element.out_0 = out0_terminal
        self.orig_element.out_1 = out1_terminal
        self.orig_element.out_2 = out2_terminal
        self.orig_element.out_3 = out3_terminal
        self.orig_element.out_4 = out4_terminal
        self.orig_element.out_5 = out5_terminal
        self.orig_element.out_6 = out6_terminal
        self.orig_element.out_7 = out7_terminal

        # params
        weight_vals = element_json["element_type_params"]["NeuralNet"].get(
            "weights")
        self.orig_element.weights = [
            float(x) for x in weight_vals] if weight_vals is not None else []

        biases_vals = element_json["element_type_params"]["NeuralNet"].get(
            "biases")
        self.orig_element.biases = [
            float(x) for x in biases_vals] if biases_vals is not None else []

        activation_function_vals = element_json["element_type_params"]["NeuralNet"].get(
            "activation_function")
        self.orig_element.activation_function = [map_activation_function_str_to_enum(
            x) for x in activation_function_vals] if activation_function_vals is not None else []

        if element_json["element_type_params"]["NeuralNet"].get("activation_scale") is not None:
            self.orig_element.activation_scale = element_json["element_type_params"]["NeuralNet"].get(
                "activation_scale")

        if element_json["element_type_params"]["NeuralNet"].get("input_compress_scale") is not None:
            self.orig_element.input_compress_scale = element_json["element_type_params"]["NeuralNet"].get(
                "input_compress_scale")

        if element_json["element_type_params"]["NeuralNet"].get("input_compression_type") is not None:
            self.orig_element.input_compression_type = map_activation_function_str_to_enum(
                element_json["element_type_params"]["NeuralNet"].get("input_compression_type"))

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.PeakDetector()
        if element_json is None:
            return

        # terminals
        input_terminal, output_terminal = None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "input":
                input_terminal = item["node_name"]
            elif item["type_name"] == "output":
                output_terminal = item["node_name"]
        self.orig_element.input = input_terminal
        self.orig_element.output = output_terminal

        # params
        self.orig_element.atk = float(
            coalesce(
                element_json["element_type_params"]["PeakDetector"].get("atk"),
                0.0
            )
        )
        self.orig_element.dec = float(
            coalesce(
                element_json["element_type_params"]["PeakDetector"].get("dec"),
                0.0
            )
        )

        model_version_str = element_json["element_type_params"]["PeakDetector"].get(
            "model_version")
        if model_version_str == 'FirstOrder':
            self.orig_element.model_version = aspinity.ModelVersion.FirstOrder
        elif model_version_str == 'SecondOrder':
            self.orig_element.model_version = aspinity.ModelVersion.SecondOrder
        else:
            self.orig_element.model_version = aspinity.ModelVersion.SecondOrder  # default value

        # hidden params
        if element_json["element_type_params"]["PeakDetector"].get("buff") is not None:
            self.orig_element.buff = element_json["element_type_params"]["PeakDetector"].get(
                "buff")

        if element_json["element_type_params"]["PeakDetector"].get("parasitic_ratio") is not None:
            self.orig_element.parasitic_ratio = element_json["element_type_params"]["PeakDetector"].get(
                "parasitic_ratio")

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

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.PGA()
        if element_json is None:
            return

        # terminals
        pos1_terminal, neg1_terminal, pos2_terminal, ref_terminal, output_terminal = None, None, None, None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "pos1":
                pos1_terminal = item["node_name"]
            elif item["type_name"] == "neg1":
                neg1_terminal = item["node_name"]
            elif item["type_name"] == "pos2":
                pos2_terminal = item["node_name"]
            elif item["type_name"] == "reference":
                ref_terminal = item["node_name"]
            elif item["type_name"] == "output":
                output_terminal = item["node_name"]
        self.orig_element.pos1 = pos1_terminal
        self.orig_element.neg1 = neg1_terminal
        self.orig_element.pos2 = pos2_terminal
        self.orig_element.reference = ref_terminal
        self.orig_element.output = output_terminal

        # params
        self.orig_element.Av1 = float(
            coalesce(
                element_json["element_type_params"]["PGA"].get("Av1"),
                1.0
            )
        )
        self.orig_element.Av2 = float(
            coalesce(
                element_json["element_type_params"]["PGA"].get("Av2"),
                0.5
            )
        )

        # hidden params
        if element_json["element_type_params"]["PGA"].get("den") is not None:
            self.orig_element.den = element_json["element_type_params"]["PGA"].get(
                "den")

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


class SynthesizedFilter():
    """Wrapper for aspinity SynthesizedFilter"""

    def __init__(self, element_json: dict = None):
        self.orig_element = aspinity.SynthesizedFilter()
        if element_json is None:
            return

        # terminals
        input_terminal, output_terminal = None, None
        for item in element_json["terminals"]:
            if item["type_name"] == "input":
                input_terminal = item["node_name"]
            elif item["type_name"] == "output":
                output_terminal = item["node_name"]

        self.orig_element.input = input_terminal
        self.orig_element.output = output_terminal

        # params
        coefficient_vals = element_json["element_type_params"]["SynthesizedFilter"].get(
            "coefficients")
        self.orig_element.coefficients = [list(map(
            float, arr)) for arr in coefficient_vals] if coefficient_vals is not None else []

    def as_dict(self):
        """returns the wrapped object in JSON serializable format"""
        return {
            "element_type": "SynthesizedFilter",
            "terminals": {"input": self.orig_element.input, "output": self.orig_element.output},
            "parameters": {"coefficients": self.orig_element.coefficients},
        }


class Terminal():
    """Wrapper for aspinity Terminal"""

    def __init__(self, element_json: dict):
        """constructs a Terminal object from a JSON"""
        self.orig_element = aspinity.Terminal()

        if element_json is None:
            return

        # params
        for item in element_json["terminals"]:
            if item["type_name"] == "net":
                self.orig_element.net = item["node_name"]
        self.orig_element.is_input = coalesce(
            element_json["element_type_params"]["Terminal"].get("is_input"), False)
        self.orig_element.is_output = coalesce(
            element_json["element_type_params"]["Terminal"].get("is_output"), False)
        self.orig_element.hardware_pin = coalesce(
            element_json["element_type_params"]["Terminal"].get("hardware_pin"), "")

        # hidden params
        if element_json["element_type_params"]["Terminal"].get("is_ac_coupled") is not None:
            self.orig_element.is_ac_coupled = element_json["element_type_params"]["Terminal"].get(
                "is_ac_coupled")
        if element_json["element_type_params"]["Terminal"].get("is_extern") is not None:
            self.orig_element.is_extern = element_json["element_type_params"]["Terminal"].get(
                "is_extern")

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
