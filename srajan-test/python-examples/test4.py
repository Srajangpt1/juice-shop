import pickle
from flask import Flask, request, jsonify
app =  Flask(__name__)
def load_order(order_data):
    return pickle.loads(order_data)

@app.route('/load', methods=['POST'])
def load():
    order_data = request.data
    order = load_order(order_data)
    return jsonify(order)


from django.conf.urls import url
import pickle

def unsafe(pickled):
    return pickle.loads(pickled)

urlpatterns = [
    url(r'^(?P<object>.*)$', unsafe)
]