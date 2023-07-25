
# activate virtualenv
..\.venv\Scripts\activate.ps1

# create windows binary using following pyinstaller command
pyinstaller --clean -F simulator_wrapper.py --distpath "..\src-tauri\binaries\" -n aspinity_wrapper-x86_64-pc-windows-msvc

deactivate