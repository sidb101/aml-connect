
# activate virtualenv
..\.venv\Scripts\activate.ps1

# create windows binary using following pyinstaller command
pyinstaller --clean -F wrapper.py --hidden-import='PIL._tkinter_finder' --add-data "templates/network_template.py.j2;templates" --distpath ../src-tauri/binaries/ -n aspinity_wrapper-x86_64-pc-windows-msvc

deactivate