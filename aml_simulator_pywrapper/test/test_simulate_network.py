import wrapper
import wrapper_network
import os

def test_simulate_network():
    # arrange
    network_json_path = os.path.join(os.getcwd(), "test_network.json")
    parent_dir = os.path.dirname(os.getcwd())
    audio_file_path = os.path.join(parent_dir, "src-tauri", "tests", "rising-chirp.wav")
    expected_keys = set(['vdd', 'filter_out_hpf', 'mid', '', '_lpf_pre_compress', 'in', 'Gnd', 'filter_out_pre_compress', 'filter_out_bpf', 'out', 'filter_out'])

    # act   
    d = wrapper.AspinitySimulatorWrapper.simulate_network(network_json_path, audio_file_path)

    # assert
    assert set(d.keys()).difference(expected_keys) == set()