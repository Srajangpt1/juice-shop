import subprocess
from functools import wraps

# Custom decorator to log function execution
def log_command(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        command = kwargs.get("command")
        print(f"Executing command: {command}")
        return func(*args, **kwargs)
    return wrapper

# Function to run a shell command
@log_command
def run_command(command: str):
    # Vulnerable command execution
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout

# Example usage
user_input = "ls; echo 'Injected command'"
output = run_command(command=user_input)
print(output)
