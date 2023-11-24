"""Module providing tools for Interface Construction in Python"""
import abc

class AspinitySimulatorWrapperInterFace(metaclass=abc.ABCMeta):
    """Interface for Aspinity's AML Simulator Wrapper"""

    @classmethod
    def __subclasshook__(cls, subclass):
        return hasattr(subclass, "get_elements") and callable(subclass.get_elements)

    @abc.abstractmethod
    def __init__(self, network_json_path: str, audio_file_path: str, project_tmp_dir: str):
        """Initializes the wrapper"""
        raise NotImplementedError

    @classmethod
    @abc.abstractmethod
    def get_elements(cls):
        """Returns a JSON string dump of components available from Aspinity
        Simulator
        """
        raise NotImplementedError

    @abc.abstractmethod
    def simulate_network(self) -> dict:
        """Returns a simulated network's output dict as-is"""
        raise NotImplementedError
