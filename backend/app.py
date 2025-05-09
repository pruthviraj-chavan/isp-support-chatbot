from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

# Load intents
with open('intents.json') as f:

    INTENTS = json.load(f)

WIT_AI_TOKEN = 'M4FFKPLV4HI3F4S7ENHLKNHW6IXEMVNW'
WIT_API_URL = 'https://api.wit.ai/message?v=20200513&q='

def detect_intent(text):
    headers = {'Authorization': f'Bearer {WIT_AI_TOKEN}'}
    response = requests.get(WIT_API_URL + text, headers=headers)
    data = response.json()
    print("Wit.ai response:", data) 
    intents = data.get('intents', [])
    return intents[0]['name'] if intents else 'unknown'

@app.route('/message', methods=['POST'])
def handle_message():
    user_input = request.json.get('message', '')
    intent = detect_intent(user_input)
    response = INTENTS.get(intent, INTENTS['unknown'])
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
