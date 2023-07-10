"""Module providing tools for Interface Construction in Python"""
import abc


class AspinitySimulatorWrapperInterFace(metaclass=abc.ABCMeta):
    """Interface for Aspinity's AML Simulator Wrapper"""
    @classmethod
    def __subclasshook__(cls, subclass):
        return (
            hasattr(subclass, 'get_elements') and
            callable(subclass.get_elements)
        )

    @abc.abstractmethod
    def get_elements(self):
        '''Returns a JSON string dump of components available from Aspinity
        Simulator
        '''
