'''
This test utilizes the test_network_all.json
'''

import pytest
import os
from wrapper_components import *

@pytest.fixture
def setup_network_json():
    network_json = None
    parent_dir = os.path.dirname(os.getcwd())
    network_json_path = os.path.join(parent_dir, "test_resources", "test_network_all.json")
    with open(network_json_path, 'r') as f:
        network_json = json.load(f)
    return network_json

def test_AcDiff_constructor(setup_network_json):
    network_json = setup_network_json

    # Iterate elements and find the one with 'type_name' equal to 'AcDiff'
    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'AcDiff':
            element_found = True
            ac_diff = AcDiff(element)
            assert isinstance(ac_diff, AcDiff)
    
    if not element_found:
        assert False, "Element not found in the network json"

def test_AsymmetricIntegrator_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'AsymmetricIntegrator':
            element_found = True
            asymmetric_integrator = AsymmetricIntegrator(element)
            assert isinstance(asymmetric_integrator, AsymmetricIntegrator)

    if not element_found:
        assert False, "Element not found in the network json"

def test_Comparator_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'Comparator':
            element_found = True
            comparator = Comparator(element)
            """
            TODO: check with Henk: Perhaps we should write our tests to check 
            for instance of aspinity.Comparator instead? possible issues with 
            current setup is that even though in the json our comparator has 
            mis-typed param "Vdd" (V capital), this test passes. 
            Can be reproduced via: 
            >>> aspinity.Comparator(Vdd = "name", threshold = "1.0")
            TypeError: Comparator.__new__() got an unexpected keyword argument 
                'Vdd'

            >>> aspinity.Comparator(vdd = "name", threshold = "1.0")
            # this works
            """
            assert isinstance(comparator, Comparator)

    if not element_found:
        assert False, "Element not found in the network json"

def test_Filter_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'Filter':
            element_found = True
            filter_instance = Filter(element)
            assert isinstance(filter_instance, Filter)

    if not element_found:
        assert False, "Element not found in the network json"

def test_Filterbank_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'Filterbank':
            element_found = True
            filterbank = Filterbank(element)
            assert isinstance(filterbank, Filterbank)

    if not element_found:
        assert False, "Element not found in the network json"

def test_GainOpamp_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'GainOpamp':
            element_found = True
            gainOpamp = GainOpamp(element)
            assert isinstance(gainOpamp, GainOpamp)

    if not element_found:
        assert False, "Element not found in the network json"

def test_LookupTable_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'LookupTable':
            element_found = True
            lookupTable = LookupTable(element)
            assert isinstance(lookupTable, LookupTable)

    if not element_found:
        assert False, "Element not found in the network json"

def test_DelayFlipFlop_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'DelayFlipFlop':
            element_found = True
            delayFlipFlop = DelayFlipFlop(element)
            assert isinstance(delayFlipFlop, DelayFlipFlop)

    if not element_found:
        assert False, "Element not found in the network json"

def test_Multiplier_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'Multiplier':
            element_found = True
            multiplier = Multiplier(element)
            assert isinstance(multiplier, Multiplier)

    if not element_found:
        assert False, "Element not found in the network json"

def test_Mux2_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'Mux2':
            element_found = True
            mux2 = Mux2(element)
            assert isinstance(mux2, Mux2)

    if not element_found:
        assert False, "Element not found in the network json"

def test_NeuralNet_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'NeuralNet':
            element_found = True
            neuralnet = NeuralNet(element)
            assert isinstance(neuralnet, NeuralNet)

    if not element_found:
        assert False, "Element not found in the network json"

def test_PeakDetector_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'PeakDetector':
            element_found = True
            peakDetector = PeakDetector(element)
            assert isinstance(peakDetector, PeakDetector)

    if not element_found:
        assert False, "Element not found in the network json"

def test_PGA_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'PGA':
            element_found = True
            pga = PGA(element)
            assert isinstance(pga, PGA)

    if not element_found:
        assert False, "Element not found in the network json"

def test_SynthesizedFilter_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'SynthesizedFilter':
            element_found = True
            synthesizedFilter = SynthesizedFilter(element)
            assert isinstance(synthesizedFilter, SynthesizedFilter)

    if not element_found:
        assert False, "Element not found in the network json"

def test_Terminal_constructor(setup_network_json):
    network_json = setup_network_json

    element_found = False
    for element in network_json['elements']:
        if element['type_name'] == 'Terminal':
            element_found = True
            terminal = Terminal(element)
            assert isinstance(terminal, Terminal)

    if not element_found:
        assert False, "Element not found in the network json"