import os
import subprocess
# from Crypto.Cipher import DES

# Function to read a file with an insecure file handling
def read_file(file_path):
    with open(file_path, 'r') as f:
        return f.read()

# Function with a path traversal vulnerability
def analyze_file(file_name):
    base_dir = "/var/data/"
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
    subprocess.call(command, shell=True)

# Main function to execute cross-file analysis
def main():
    # Get the file name from the user
    file_name = input("Enter the file name to analyze: ")
    analyze_file(file_name)  # Analyze the file

    # Get the script name from the user
    script_name = input("Enter the analysis script name: ")
    execute_analysis_script(script_name, file_name)  # Execute analysis script

if __name__ == "__main__":
    main()
