from functools import wraps
from flask import Flask, request, jsonify, g

app = Flask(__name__)

# Mock user database
users_db = {
    "admin": {"username": "admin", "password": "supersecret", "role": "admin"},
    "user": {"username": "user", "password": "userpassword", "role": "user"}
}

# Custom decorator to check authentication and role
def authenticate(required_role=None):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            auth = request.headers.get("Authorization")
            if not auth:
                return jsonify({"error": "Unauthorized"}), 401

            try:
                username, password = auth.split(":")
            except ValueError:
                return jsonify({"error": "Invalid auth format"}), 400

            user = users_db.get(username)
            if user and user["password"] == password:
                g.user = user
                if required_role and user["role"] != required_role:
                    return jsonify({"error": "Forbidden"}), 403
                return func(*args, **kwargs)
            else:
                return jsonify({"error": "Unauthorized"}), 401

        return wrapper
    return decorator

# Route that requires authentication
@app.route("/admin")
@authenticate(required_role="admin")
def admin_panel():
    return jsonify({"message": f"Welcome, {g.user['username']}!"})

if __name__ == "__main__":
    a = True
    app.run(debug=a)
