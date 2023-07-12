"""Aspinity Protobuf class generated using protoc"""
import aspinity_pb2 as aspb
from simulator_interface import AspinitySimulatorWrapperInterFace

import argparse


class AspinitySimulatorWrapper(AspinitySimulatorWrapperInterFace):
    """Wrapper for Aspinity's Simulator"""

    __acdiff_type = aspb.ElementType(name="AcDiff")
    __asymmetric_integrator_type = aspb.ElementType(name="AsymmetricIntegrator")
    __comparator = aspb.ElementType(name="Comparator")
    __filter = aspb.ElementType(name="Filter")
    __filter_bank = aspb.ElementType(name="FilterBank")
    __gain_opamp = aspb.ElementType(name="GainOpamp")

    def __init_acdiff_type(self):
        self.__acdiff_type.parameter_types.add(name="bias", default_value=0.0)
        self.__acdiff_type.parameter_types.add(name="gain", default_value=0.0)
        self.__acdiff_type.parameter_types.add(name="neg", default_value=0.0)
        self.__acdiff_type.parameter_types.add(name="output", default_value=0.0)
        self.__acdiff_type.parameter_types.add(name="pos", default_value=0.0)

    def __init__(self):
        self.__init_acdiff_type()

    def get_elements(self):
        """Returns proto-serialized bytes representing list of Elements"""
        res = aspb.ListElementTypesResponse()
        res.element_types.extend([self.__acdiff_type])
        return res.SerializeToString()

    def get_acdiff(self):
        """Returns acdiff element as proto-serialized bytes"""
        return self.__acdiff_type.SerializeToString()


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Wrapper to AML Simulator")

    # option that returns all elements
    parser.add_argument("--get_elements", action="store_true")
    args = parser.parse_args()

    asw = AspinitySimulatorWrapper()
    if args.get_elements:
        print(asw.get_elements())
