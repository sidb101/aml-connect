import wrapper
import json

def test_all_library_types_exist():
    # arrange
    lookup = set(["AcDiff",
                  "AsymmetricIntegrator",
                  "Comparator",
                  "Filter",
                  "Filterbank",
                  "GainOpamp",
                  "LookupTable",
                  "DelayFlipFlop",
                  "Multiplier",
                  "Mux2",
                  "NeuralNet",
                  "PeakDetector",
                  "PGA",
                  "SynthesizedFilter"])
    check = lambda x: x in lookup

    # act
    elements = json.loads(wrapper.AspinitySimulatorWrapper.get_elements())

    # assert
    assert all(map(check, elements.keys()))
