from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from deepface import DeepFace
from flask import Flask, request, jsonify
import numpy as np
import io
from PIL import Image
from flask_cors import CORS
from scipy.spatial.distance import cosine
import os


app = Flask(__name__)

uri = "mongodb+srv://seetarama07:tejadarling@facialrecognition.dqh3s.mongodb.net/?retryWrites=true&w=majority&appName=FacialRecognition"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['facerecognition']
collection = db['student']

studentembedds = {}

for doc in collection.find({}, {'embeddings': 1, 'name': 1, '_id': 0}):
    studentembedds[doc['name']] = doc['embeddings'][0]

CORS(app, resources={r"/*": {"origins": "https://your-react-app.onrender.com"}})



@app.route('/retrievedata', methods=['POST'])
def retrievedata():
    print('we are in python server')
    
    name = request.form['name']
    redg = request.form['redg']
    branch = request.form['branch']
    year = request.form['year']
    image = request.files['image']  

    print('all flags success')

    try:
        img = Image.open(image)  

        if img.mode == 'RGBA':
            img = img.convert('RGB')

        image_array = np.array(img)  
        print('Image converted to numpy array')

        embeddings = DeepFace.represent(img_path=image_array, model_name="Facenet")
        embedding_vector = embeddings[0]['embedding']
        collection.insert_one({'name':name, 'redg':redg, 'branch' : branch, 'year':year, 'embeddings':[embedding_vector]})
        print('all flags success')
        

        return jsonify({'message': 'Registration Successful'}), 200
    
    except Exception as e:
        print(f"Error processing the image: {e}")
        return jsonify({'error': 'Failed to process the image'}), 500
    
    return jsonify({'message':'seeta'})


@app.route('/verify', methods = ['POST'])
def verify():
    blob = request.files['image']
    print('blob in flask')
    
    image = Image.open(blob)
    if image.mode == 'RGBA':
        image = image.convert('RGB')
    image_array = np.array(image)  
    print('Image converted to numpy array')

    embeddings = DeepFace.represent(img_path=image_array, model_name="Facenet")
    embedding_vector = embeddings[0]['embedding']

    embedding_vector = np.array(embedding_vector)

    
    print(studentembedds)
    print('embeddings success')

    previousres = -2

    for i in studentembedds:
            cosine_similarity = 1 - cosine(studentembedds[i], embedding_vector)
            if cosine_similarity > previousres : 
                 student = i
                 previousres = cosine_similarity


    print(student)
    
    return jsonify({'message':student})

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  
    app.run(host='0.0.0.0', port=port, debug=True)
