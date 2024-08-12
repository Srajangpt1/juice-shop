import os
import subprocess
from Crypto.Cipher import DES

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

# Weak encryption example (DES)
def encrypt_data(data, key):
    des = DES.new(key, DES.MODE_ECB)
    padded_data = data + ' ' * (8 - len(data) % 8)
    return des.encrypt(padded_data.encode())

# Decrypt function (DES)
def decrypt_data(encrypted_data, key):
    des = DES.new(key, DES.MODE_ECB)
    return des.decrypt(encrypted_data).strip()

# Main function to execute cross-file analysis
def main():
    # Get the file name from the user
    file_name = input("Enter the file name to analyze: ")
    analyze_file(file_name)  # Analyze the file

    # Get the script name from the user
    script_name = input("Enter the analysis script name: ")
    execute_analysis_script(script_name, file_name)  # Execute analysis script

    # Encrypt some sensitive data
    secret_key = b"12345678"  # Weak key
    data = "Sensitive Information"
    encrypted_data = encrypt_data(data, secret_key)
    print(f"Encrypted data: {encrypted_data}")

    # Decrypt the data
    decrypted_data = decrypt_data(encrypted_data, secret_key)
    print(f"Decrypted data: {decrypted_data.decode()}")

if __name__ == "__main__":
    main()
