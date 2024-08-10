from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock database
database = {
    1: {"id": 1, "name": "Alice", "email": "alice@example.com", "password": "password123", "role": "user"},
    2: {"id": 2, "name": "Bob", "email": "bob@example.com", "password": "supersecret", "role": "admin"},
}

# Function to get a user by ID and return public information
def get_user_by_id(user_id: int) -> dict:
    user = database.get(user_id)
    
    if not user:
        return None
    
    # Incorrectly returning the entire user object without removing sensitive data
    return user

# Example API endpoint that uses the function
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user_endpoint(user_id):
    user = get_user_by_id(user_id)
    
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user)  # Sensitive data might be exposed here

if __name__ == "__main__":
    app.run(debug=True)
