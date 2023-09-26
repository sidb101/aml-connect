"""Module providing tools for Interface Construction in Python"""
import abc
import json

class AspinitySimulatorWrapperInterFace(metaclass=abc.ABCMeta):
    """Interface for Aspinity's AML Simulator Wrapper"""

    @classmethod
    def __subclasshook__(cls, subclass):
        return hasattr(subclass, "get_elements") and callable(subclass.get_elements)

    @classmethod
    @abc.abstractmethod
    def get_elements(cls):
        """Returns a JSON string dump of components available from Aspinity
        Simulator
        """
        raise NotImplementedError
    
    @classmethod
    @abc.abstractmethod
    def simulate_network(cls, network_json: str, audio_files_json: str) -> dict:
        """Returns a simulated network's output dict as-is"""
        raise NotImplementedError
