from analyzer import analyze_file, execute_analysis_script
from encryption import encrypt_data, decrypt_data

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
