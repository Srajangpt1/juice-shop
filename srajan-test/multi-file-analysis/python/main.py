from analyzer import analyze_file, execute_analysis_script
# from encryption import encrypt_data, decrypt_data

def main():
    # Get the file name from the user
    file_name = input("Enter the file name to analyze: ")
    analyze_file(file_name)  # Analyze the file

    # Get the script name from the user
    script_name = input("Enter the analysis script name: ")
    execute_analysis_script(script_name, file_name)  # Execute analysis script

if __name__ == "__main__":
    main()
