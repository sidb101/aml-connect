## `aml_simulator_pywrapper`

This python package is a wrapper on top of `aspinity` package, which only supported explicitly building the network via python code before simulation. This package exposes convenient ways to simulate a network directly from a JSON serialized representation. Additionally, this package also generates
Python source code that a user would have to write to arrive at the same
network, as well as generating the simulation result as visualization.


## Setup dev environment

- Recommendations
    - Python env manager - conda, [miniconda](https://docs.conda.io/projects/miniconda/en/latest/)

    - style - [PEP8](https://peps.python.org/pep-0008/) (with [Black](https://black.readthedocs.io/en/stable/)/[Autopep8](https://marketplace.visualstudio.com/items?itemName=ms-python.autopep8) extension in VS-Code)

    - Python Version - 3.8

- Setup python env
    > `conda create -n py38 python=3.8`

- ensure that new env (`py38`) shows in the list
    > `conda env list`

- activate env
    > `conda activate py38`

### Create the Aspinity PyWrapper

We would have to creat binary of our Python code, which wraps around the Aspinity's simulator package. To create this wrapper, Aspinity's `.whl` file is required. This file is different for different operating systems. So make sure to get the right file as per your OS.

- Get the `.whl` file
- Extract the zip and place the extracted folder as the sibling to the current repository.
- Move to the current repos's `aml_simulator_pywrapper` directory

Now, we would essentially create the binary of the wrapper (`aml_simulator_pywrapper`).

#### Ubuntu

- install aspinity .whl (This .whl is made available by aspinity)
    
    > NOTE: Make sure to write the proper directory name and file name as per the version you want to install  
    
    
    ```bash
    pip install ../../aspinity-dev-env-0.7.2/aspinity-0.7.2-cp38-abi3-manylinux_2_17_x86_64.manylinux2014_x86_64.whl
    ```
    
- install requirements
    ```bash
    pip install -r requirements.txt
    ```
- Create the PyInstaller Binary of the wrapper: This python package could be turned into an single-file executable with all its
dependencies, that is how it is turned into a sidecar and bundled with Tauri app

    ```
    pyinstaller --clean -F wrapper.py --hidden-import='PIL._tkinter_finder' --add-data "templates/network_template.py.j2:templates" --distpath ../src-tauri/binaries/ -n aspinity_wrapper-x86_64-unknown-linux-gnu

    ```
- The binary is ready to be excecuted on the command line. The location of binary would be: `${projectDir}/src-tauri/binaries`

#### Windows

- Open Poweshell
- Navigate to the `${project directory}\aml_simulator_pywrapper`
- Enter command:
    ```
    Set-ExecutionPolicy Unrestricted
    ```
- Run the following script:
    ```
    ./setup-wrapper.ps1
    ```
    Details of the script can be found by opening the file.
    > NOTE:  
    This `setup-wrapper` is only required for the first time. For the subsequent updates to `wrapper.py`, excecute `./build-wrapper.py` to directly build the wrapper from the given `.whl` package.

- The binary is ready to be excecuted on the command line. The location of binary would be: `${projectDir}\src-tauri\binaries`


### Usage of Wrapper Binary

When the application is started using `cargo tauri dev`, it automatically takes into account this binary, however if one wants to run this binary alone for testing purposes, here is its usage.

```
usage: wrapper.py [-h] [--get_elements] [--simulate_network] [-network NETWORK] [-wavfile WAVFILE]
                  [-tmp_dir TMP_DIR]

Wrapper to AML Simulator

options:
  -h, --help          show this help message and exit
  --get_elements      Returns all aspinity elements

Network Simulation Options:
  --simulate_network
  -network NETWORK    Path to network file
  -wavfile WAVFILE    Path to WAV file
  -tmp_dir TMP_DIR    Project tmp path to store output
```




## Run tests

- Run pylint
    > `pylint *.py`

- Run tests
    > `pytest .`