import os
import flask
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import pandas as pd
import json
from flask import request
from pymongo import MongoClient

# initialising flask app
app = flask.Flask(__name__)

# linking MongoDB database
conn = MongoClient()
db = conn.showmedawae  # db name
collection = db.realtime  # collection name

# route to interact with the app
@app.route("/", methods=["GET","POST"])
def homepage():
    # loading the model
    model = load_model("final-model-hopefully.h5")
    # waiting for json request
    if request.is_json:
        req = flask.request.get_json()
        df = pd.DataFrame.from_dict(req)
        # prediction
        prediction = model.predict(df)
        p = pd.DataFrame(prediction)
        pred = p.to_json()
        print(pred)
        # inserting to the database
        collection.insert_one(pred)
        return pred
    else:
        return "Request was not JSON", 400  

if __name__ == "__main__":
    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    app.run()
    