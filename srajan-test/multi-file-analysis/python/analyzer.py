import os
from file_reader import read_file

# Function with a path traversal vulnerability
def analyze_file(file_name):
    base_dir = "/var/"
    full_path = os.path.join(base_dir, file_name)
    if not os.path.isfile(full_path):
        print(f"File {full_path} does not exist.")
        return
    
    content = read_file(full_path)
    print(f"Analyzing file: {file_name}")
    print(content)

# Vulnerable to command injection
def execute_analysis_script(script_name, file_name):
    command = f"python3 {script_name} {file_name}"
    os.system(command)
