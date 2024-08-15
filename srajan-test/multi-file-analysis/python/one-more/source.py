import pickle

def get_user_input():
    # Simulating untrusted user input (source)
    # This could be data received over a network, e.g., from an untrusted client
    return pickle.dumps({"payload": "__import__('os').system('ls -la')"})  # Serialized malicious data
