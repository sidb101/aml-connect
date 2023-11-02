"""Module providing tools for Interface Construction in Python"""
import abc

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
    def simulate_network(cls, network_json_path: str, audio_file_path: str) -> dict:
        """Returns a simulated network's output dict as-is"""
        raise NotImplementedError
