import wrapper
import wrapper_network
import os

def test_simulate_network():
    # arrange
    parent_dir = os.path.dirname(os.getcwd())
    network_json_path = os.path.join(
        parent_dir, "test_resources", "test_network.json")
    audio_file_path = os.path.join(
        parent_dir, "test_resources", "rising-chirp.wav")
    expected_keys = set(['vdd', 'filter_out_hpf', 'mid', '', '_lpf_pre_compress',
                        'in', 'Gnd', 'filter_out_pre_compress', 'filter_out_bpf', 'out', 'filter_out'])

    # act
    d = wrapper.AspinitySimulatorWrapper.simulate_network(
        network_json_path, audio_file_path)

    # assert
    assert set(d.keys()).difference(expected_keys) == set()


def test_simulate_network_2():
    # arrange
    parent_dir = os.path.dirname(os.getcwd())
    network_json_path = os.path.join(
        parent_dir, "test_resources", "test_energy_change.json")
    audio_file_path = os.path.join(
        parent_dir, "test_resources", "rising-chirp.wav")
    expected_keys = set(['vdd', 'mean_energy', 'detection',
                        'in', '', 'Gnd', 'energy', 'detection_pos_offset'])

    # act
    d = wrapper.AspinitySimulatorWrapper.simulate_network(
        network_json_path, audio_file_path)
    # assert
    assert set(d.keys()).difference(expected_keys) == set()


def test_simulate_network_3():
    # arrange
    parent_dir = os.path.dirname(os.getcwd())
    network_json_path = os.path.join(
        parent_dir, "test_resources", "test_heart_rate.json")
    audio_file_path = os.path.join(
        parent_dir, "test_resources", "heart-rate.wav")
    expected_keys = set(['vdd', '_diff_output_neg', 'mid', 'diff_output', '', 'Gnd', 'detection',
                        'noninverting', 'peak', 'inverting', 'detection_pos_offset', '_diff_output_pos'])

    # act
    d = wrapper.AspinitySimulatorWrapper.simulate_network(
        network_json_path, audio_file_path)
    # assert
    assert set(d.keys()).difference(expected_keys) == set()

def test_simulate_network_4():
    # arrange
    parent_dir = os.path.dirname(os.getcwd())
    network_json_path = os.path.join(
        parent_dir, "test_resources", "test_vibration_spectrum.json")
    audio_file_path = os.path.join(
        parent_dir, "test_resources", "bearing-faults.wav")
    expected_keys = set(['filter_3_bpf', 'filter_5_bpf', 'filter_3_hpf', 'filter_2_bpf', 'filter_5_hpf', 'filter_4', 'filter_1', 'output_2', 'filter_0_hpf', 'output_3', 'filter_5', 'filter_1_bpf', 'in', '', '_lpf_pre_compress', 'filter_0_pre_compress', 'filter_0_bpf', 'filter_4_hpf', 'output_1', 'filter_7_pre_compress', 'output_5', 'vdd', 'output_6', 'filter_5_pre_compress',
                        'filter_3', 'output_0', 'filter_7_bpf', 'Gnd', 'filter_7', 'filter_0', 'filter_6_hpf', 'output_7', 'filter_1_pre_compress', 'filter_6', 'output_4', 'filter_7_hpf', 'mid', 'filter_6_bpf', 'filter_4_bpf', 'filter_4_pre_compress', 'filter_1_hpf', 'filter_2_pre_compress', 'filter_6_pre_compress', 'filter_3_pre_compress', 'filter_2_hpf', 'filter_2'])

    # act
    d = wrapper.AspinitySimulatorWrapper.simulate_network(
        network_json_path, audio_file_path)
    # assert
    assert set(d.keys()).difference(expected_keys) == set()
