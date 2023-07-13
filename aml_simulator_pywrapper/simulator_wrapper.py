"""Importing the Simulator Interface to implement"""
from simulator_interface import AspinitySimulatorWrapperInterFace
import argparse
import json
import aspinity

class ParameterType:
    def __init__(self, name: str, value: float = 0.0):
        self.name = name
        self.value = value


class TerminalType:
    def __init__(self, name: str, default_node_name: str = None):
        self.name = name
        self.default_node_name = default_node_name


class ElementType:
    def __init__(
        self,
        name: str,
        terminals: list[TerminalType] = [],
        parameters: list[ParameterType] = [],
    ):
        self.name = name
        self.terminal_types = terminals
        self.parameter_types = parameters


class AcDiff(ElementType):
    def __init__(self):
        default_params = {
            "bias": 0.0,
            "gain": 0.0,
        }
        param_types = [
            ParameterType(param, val) for param, val in default_params.items()
        ]
        default_terminals = {
            "neg": None,
            "output": None,
            "pos": None,
        }
        terminal_types = [
            TerminalType(param, val) for param, val in default_terminals.items()
        ]
        super(AcDiff, self).__init__(
            name="AcDiff", parameters=param_types, terminals=terminal_types
        )


# class AspinitySimulatorWrapper(AspinitySimulatorWrapperInterFace):
#     """Wrapper class for Aspinity's Simulator"""

#     __acdiff_type = ElementType("AcDiff")
#     __asymmetric_integrator_type = ElementType("AsymmetricIntegrator")
#     __comparator_type = ElementType("Comparator")
#     __filter_type = ElementType("Filter")
#     __filter_bank_type = ElementType("Filterbank")
#     __gain_opamp_type = ElementType("GainOpamp")
#     __logic_type = ElementType("Logic")
#     __multiplier_type = ElementType("Mux2")
#     __neural_net_type = ElementType("NeuralNet")
#     __peak_detector_type = ElementType("PeakDetector")
#     __pga_type = ElementType("PGA")
#     __synthesized_filter_type = ElementType("SynthesizedFilter")

#     def __init_acdiff_type(self):
#         default_param_vals = {
#             "bias": 0.0,
#             "gain": 0.0,
#             "neg": 0.0,
#             "output": 0.0,
#             "pos": 0.0,
#         }
#         param_types = [
#             ParameterType(param, val) for param, val in default_params.items()
#         ]
#         self.__acdiff_type

#     def __init__(self):
#         self.__init_acdiff_type()

#     def get_elements(self):
#         """Returns proto-serialized bytes representing list of Elements"""
#         res = aspb.ListElementTypesResponse()
#         res.element_types.extend([self.__acdiff_type])
#         return res.SerializeToString()

#     def get_acdiff(self):
#         """Returns acdiff element as proto-serialized bytes"""
#         return self.__acdiff_type.SerializeToString()


# if __name__ == "__main__":
#     parser = argparse.ArgumentParser(description="Wrapper to AML Simulator")

#     # option that returns all elements
#     parser.add_argument("--get_elements", action="store_true")
#     args = parser.parse_args()

#     asw = AspinitySimulatorWrapper()
#     if args.get_elements:
#         print(asw.get_elements())
