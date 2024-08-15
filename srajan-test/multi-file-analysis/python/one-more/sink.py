from source import get_user_input
import pickle

def deserialize_data():
    # Receive the tainted serialized data
    serialized_data = get_user_input()
    
    # Vulnerable sink: Deserialization of untrusted data
    deserialized_object = pickle.loads(serialized_data)
    
    # Simulate executing a method from the deserialized object
    if isinstance(deserialized_object, dict):
        exec(deserialized_object.get('payload'))

if __name__ == "__main__":
    deserialize_data()