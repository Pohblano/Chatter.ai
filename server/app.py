from flask import Flask, request
from twilio.rest import Client
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

app = Flask(__name__)

@app.route('/api/ml')
def test():
	return{'test': 'data reached'}

@app.route('/api/send_registration_code', methods=['POST'])
def send_registration_code():
    # Step 2: Access the JSON data sent in the request body
    data = request.json
    
    # Step 3: Extract the phone_number from the JSON data
    phone_number = data.get('phone_number')
    
    if not phone_number:
        return {'error': 'phone_number is required'}, 400
    
    if not phone_number.startswith('+'):
        return {'error': 'phone_number must start with a country code'}, 400
    
	# TODO: make this dynamic and store in database
    registration_code = 1234

	# Step 4: Send registration code to phone number
    account_sid = 'AC1583468d0f68fae0d8e669747e4432da'
    auth_token = 'f90ab474320826eab751dbc6275a14f6'
    client = Client(account_sid, auth_token)
    client.messages.create(**{'from_': '+17244887744', 'body': f"Your login code is: {registration_code}", 'to': phone_number})
    
    # Step 5: Return a response
    return {'message': f"Registration code successfully sent to {phone_number}"}, 200
