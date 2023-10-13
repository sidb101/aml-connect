import pytest
from wrapper_components import *

def test_AcDiff_constructor():
    elementJSON = {
        "type_name": "AcDiff",
        "element_type_params": {
            "AcDiff": {
                "gain": 1,
                "bias": 1,
            }
        },
        "terminals": [
            {
                "type_name": "pos",
                "node_name": "X"
            },
            {
                "type_name": "neg",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    ac_diff = AcDiff(elementJSON)
    assert isinstance(ac_diff, AcDiff)

def test_AsymmetricIntegrator_constructor():
    elementJSON = {
        "type_name": "AsymmetricIntegrator",
        "element_type_params": {
            "AsymmetricIntegrator": {
                "down": 1,
                "up": 1,
                "comparator_enable": None,
                "up_down_type": None,
            }
        },
        "terminals": [
            {
                "type_name": "input",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    asymmetric_integrator = AsymmetricIntegrator(elementJSON)
    assert isinstance(asymmetric_integrator, AsymmetricIntegrator)

def test_Comparator_constructor():
    elementJSON = {
        "type_name": "Comparator",
        "element_type_params": {
            "Comparator": {
                "threshold": 1,
            }
        },
        "terminals": [
            {
                "type_name": "positive",
                "node_name": "X"
            },
            {
                "type_name": "negative",
                "node_name": "X"
            },
            {
                "type_name": "vdd",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    comparator = Comparator(elementJSON)
    assert isinstance(comparator, Comparator)

def test_Filter_constructor():
    elementJSON = {
        "type_name": "Filter",
        "element_type_params": {
            "Filter": {
                "characteristic_frequency": None,
                "quality_factor": None,
                "filter_type": None
            }
        },
        "terminals": [
            {
                "type_name": "input",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    filter = Filter(elementJSON)
    assert isinstance(filter, Filter)

def test_Filterbank_constructor():
    elementJSON = {
        "type_name": "Filterbank",
        "element_type_params": {
            "Filterbank": {
                "band_frequencies": None,
                "quality_factor": None,
                "attack_rates": None,
                "decay_rates": None,
            }
        },
        "terminals": [
            {
                "type_name": "input",
                "node_name": "X"
            },
            {
                "type_name": "out0",
                "node_name": "X"
            },
            {
                "type_name": "out1",
                "node_name": "X"
            },
            {
                "type_name": "out2",
                "node_name": "X"
            },
            {
                "type_name": "out3",
                "node_name": "X"
            },
            {
                "type_name": "out4",
                "node_name": "X"
            },
            {
                "type_name": "out5",
                "node_name": "X"
            },
            {
                "type_name": "out6",
                "node_name": "X"
            },
            {
                "type_name": "out7",
                "node_name": "X"
            },
        ],
    }
    filterbank = Filterbank(elementJSON)
    assert isinstance(filterbank, Filterbank)

def test_GainOpamp_constructor():
    elementJSON = {
        "type_name": "GainOpamp",
        "element_type_params": {
            "GainOpamp": {
                "feedback_cap_count": 1,
                "gain_mode": 1,
                "opamp_implementation": None
            }
        },
        "terminals": [
            {
                "type_name": "input",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    gain_opamp = GainOpamp(elementJSON)
    assert isinstance(gain_opamp, GainOpamp)

def test_LookupTable_constructor():
    elementJSON = {
        "type_name": "LookupTable",
        "element_type_params": {
            "LookupTable": {
                "expression": 1,
            }
        },
        "terminals": [
            {
                "type_name": "A",
                "node_name": "X"
            },
            {
                "type_name": "B",
                "node_name": "X"
            },
            {
                "type_name": "C",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    lookup_table = LookupTable(elementJSON)
    assert isinstance(lookup_table, LookupTable)

def test_DelayFlipFlop_constructor():
    elementJSON = {
        "type_name": "DelayFlipFlop",
        "element_type_params": {},
        "terminals": [
            {
                "type_name": "input",
                "node_name": "X"
            },
            {
                "type_name": "clock",
                "node_name": "X"
            },
            {
                "type_name": "reset",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    delay_flip_flop = DelayFlipFlop(elementJSON)
    assert isinstance(delay_flip_flop, DelayFlipFlop)

def test_Multiplier_constructor():
    elementJSON = {
        "type_name": "Multiplier",
        "element_type_params": {
            "Multiplier": {
                "slope": 1,
            }
        },
        "terminals": [
            {
                "type_name": "x_pos",
                "node_name": "X"
            },
            {
                "type_name": "x_neg",
                "node_name": "X"
            },
            {
                "type_name": "y_pos",
                "node_name": "X"
            },
            {
                "type_name": "y_neg",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    multiplier = Multiplier(elementJSON)
    assert isinstance(multiplier, Multiplier)

def test_Mux2_constructor():
    elementJSON = {
        "type_name": "Mux2",
        "element_type_params": {},
        "terminals": [
            {
                "type_name": "in0",
                "node_name": "X"
            },
            {
                "type_name": "in1",
                "node_name": "X"
            },
            {
                "type_name": "select",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    mux2 = Mux2(elementJSON)
    assert isinstance(mux2, Mux2)

def test_NeuralNet_constructor():
    elementJSON = {
        "type_name": "NeuralNet",
        "element_type_params": {
            "NeuralNet": {
                "weights": None,
                "biases": None,
                "activation_function": None
            }
        },
        "terminals": [
            {
                "type_name": "pos0",
                "node_name": "X"
            },
            {
                "type_name": "pos1",
                "node_name": "X"
            },
            {
                "type_name": "pos2",
                "node_name": "X"
            },
            {
                "type_name": "pos3",
                "node_name": "X"
            },
            {
                "type_name": "pos4",
                "node_name": "X"
            },
            {
                "type_name": "pos5",
                "node_name": "X"
            },
            {
                "type_name": "pos6",
                "node_name": "X"
            },
            {
                "type_name": "pos7",
                "node_name": "X"
            },
            {
                "type_name": "neg0",
                "node_name": "X"
            },
            {
                "type_name": "neg1",
                "node_name": "X"
            },
            {
                "type_name": "neg2",
                "node_name": "X"
            },
            {
                "type_name": "neg3",
                "node_name": "X"
            },
            {
                "type_name": "neg4",
                "node_name": "X"
            },
            {
                "type_name": "neg5",
                "node_name": "X"
            },
            {
                "type_name": "neg6",
                "node_name": "X"
            },
            {
                "type_name": "neg7",
                "node_name": "X"
            },
            {
                "type_name": "out0",
                "node_name": "X"
            },
            {
                "type_name": "out1",
                "node_name": "X"
            },
            {
                "type_name": "out2",
                "node_name": "X"
            },
            {
                "type_name": "out3",
                "node_name": "X"
            },
            {
                "type_name": "out4",
                "node_name": "X"
            },
            {
                "type_name": "out5",
                "node_name": "X"
            },
            {
                "type_name": "out6",
                "node_name": "X"
            },
            {
                "type_name": "out7",
                "node_name": "X"
            },
        ],
    }
    neural_net = NeuralNet(elementJSON)
    assert isinstance(neural_net, NeuralNet)

def test_PeakDetector_constructor():
    elementJSON = {
        "type_name": "PeakDetector",
        "element_type_params": {
            "PeakDetector": {
                "atk": 1,
                "dec": 1,
                "model_version": 1
            }
        },
        "terminals": [
            {
                "type_name": "input",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    peak_detector = PeakDetector(elementJSON)
    assert isinstance(peak_detector, PeakDetector)

def test_PGA_constructor():
    elementJSON = {
        "type_name": "PGA",
        "element_type_params": {
            "PGA": {
                "Av1": 1,
                "Av2": 1,
            }
        },
        "terminals": [
            {
                "type_name": "pos1",
                "node_name": "X"
            },
            {
                "type_name": "neg1",
                "node_name": "X"
            },
            {
                "type_name": "pos2",
                "node_name": "X"
            },
            {
                "type_name": "reference",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    pga = PGA(elementJSON)
    assert isinstance(pga, PGA)

def test_SynthesizedFilter_constructor():
    elementJSON = {
        "type_name": "SynthesizedFilter",
        "element_type_params": {
            "SynthesizedFilter": {
                "coefficients": None,
            }
        },
        "terminals": [
            {
                "type_name": "input",
                "node_name": "X"
            },
            {
                "type_name": "output",
                "node_name": "X"
            }
        ],
    }
    synthesized_filter = SynthesizedFilter(elementJSON)
    assert isinstance(synthesized_filter, SynthesizedFilter)

def test_Terminal_constructor():
    elementJSON = {
        "type_name": "Terminal",
        "element_type_params": {
            "Terminal": {
                "is_input": None,
                "is_output": None,
                "hardware_pin": None,
                "is_ac_coupled": None,
                "is_extern": None,
            }
        },
        "terminals": [
            {
                "type_name": "net",
                "node_name": "X"
            },
        ],
    }
    terminal = Terminal(elementJSON)
    assert isinstance(terminal, Terminal)
