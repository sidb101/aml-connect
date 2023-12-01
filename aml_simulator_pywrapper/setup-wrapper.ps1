# create a virtualenv, in aml-connect root folder
python -m venv ..\.venv

# activate virtualenv
..\.venv\Scripts\activate.ps1

 #install .whl inside the venv, change the `aspinity_pkg` to wherever you downloaded and unzipped
pip install "..\..\aspinity-dev-env-0.6.2\aspinity-0.6.2-cp38-abi3-win_amd64.whl"

# install dependencies
python -m pip install -r requirements.txt

deactivate

# build the wrapper
.\build-wrapper.ps1