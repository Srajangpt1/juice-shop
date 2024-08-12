import pickle

def load_order(order_data):
    return pickle.loads(order_data)

@app.route('/load', methods=['POST'])
def load():
    order_data = request.data
    order = load_order(order_data)
    return jsonify(order)
