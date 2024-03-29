from flask import Flask, request, jsonify
from twilio.rest import Client

# from sklearn import datasets
# from sklearn.model_selection import train_test_split
# from sklearn.neighbors import KNeighborsClassifier

client = OpenAI(api_key = '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')


def generate_otp():
    otp = ""
    for _ in range(4):
        otp += str(random.randint(0, 9))
    return otp


app = Flask(__name__)
############## Test route
@app.route('/api/test')
def test():
	return{'test': 'data reached'}

############## Send registration code
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
    registration_code = generate_otp()

	# Step 4: Send registration code to phone number
    account_sid = 'AC1583468d0f68fae0d8e669747e4432da'
    auth_token = 'f90ab474320826eab751dbc6275a14f6'
    client = Client(account_sid, auth_token)
    client.messages.create(**{'from_': '+17244887744', 'body': f"Your login code is: {registration_code}", 'to': phone_number})
    
    # Step 5: Return a response
    return {'message': f"Registration code successfully sent to {phone_number}"}, 200




