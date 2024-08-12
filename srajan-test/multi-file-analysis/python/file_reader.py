import os

# Function to read a file with an insecure file handling
def read_file(file_path):
    with open(file_path, 'r') as f:
        return f.read()
