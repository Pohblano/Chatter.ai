from flask import Flask, request, jsonify
import random

# ChatGPT libraries
import os
from openai import OpenAI
from twilio.rest import Client


app = Flask(__name__)





# TODO: make this generate a random code and store it in the database
def generate_login_code(phone_number: str) -> int:
    otp = ""
    for _ in range(4):
        otp += str(random.randint(0, 9))
    return int(otp)


# TODO: make this validate the code in the database for a given phone number
def validate_login_code(code: int, phone_number: str) -> bool:
    return code == 1234


# Add Access-Control-Allow-Origin header to responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add("Access-Control-Allow-Headers", 'Content-Type, access-control-allow-origin, Access-Control-Allow-Credentials')
    return response


@app.route("/api/send_login_code", methods=["POST"])
def send_login_code():
    if not request.get_json(silent=True):
        return {"error": "missing valid JSON object in request body"}, 400

    data = request.json
    phone_number = data.get("phone_number")

    # validate phone_number
    if not phone_number:
        return {"error": "phone_number is required"}, 400
    elif not isinstance(phone_number, str):
        return {"error": "phone_number must be a string"}, 400
    elif len(phone_number) < 10:
        return {"error": "phone_number must be at least 10 characters"}, 400
    elif len(phone_number) > 15:
        return {"error": "phone_number must be at most 15 characters"}, 400
    elif not phone_number.startswith("+"):
        return {"error": "phone_number must start with a country code"}, 400

    login_code = generate_login_code(phone_number)

    # send login code to phone number via twilio
    account_sid = "AC1583468d0f68fae0d8e669747e4432da"
    auth_token = "f90ab474320826eab751dbc6275a14f6"
    client = Client(account_sid, auth_token)
    client.messages.create(**{'from_': '+17244887744', 'body': f"Your login code is: {login_code}", 'to': phone_number})
    
    # Step 5: Return a response
    return {'message': f"Registration code successfully sent to {phone_number}"}, 200



@app.route("/api/verify_login_code", methods=["POST"])
def verify_login_code():
    if not request.get_json(silent=True):
        return {"error": "missing valid JSON object in request body"}, 400

    data = request.json
    phone_number = data.get("phone_number")
    login_code = data.get("login_code")

    # make sure phone_number and login_code are provided
    if not phone_number:
        return {"error": "phone_number is required"}, 400
    elif not login_code:
        return {"error": "login_code is required"}, 400

    # validate login_code
    if not isinstance(login_code, int):
        return {"error": "login_code must be an integer"}, 400
    elif not validate_login_code(login_code, phone_number):
        return {"error": "login_code is invalid"}, 400
    else:
        return {"message": "login_code is valid"}, 200






client = OpenAI(api_key='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')

@app.route('/api/chatGPT', methods=['POST'])
async def ai():
    if not request.get_json(silent=True):
        return {"error": "missing valid JSON object in request body"}, 400
    
    data = request.json
    input = data.get("input")

    if not input:
        return {"error": "input is required"}, 400

    response = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {
          "role": "system",
          "content": "You are ChatGPT, a conversational LLM."
        },
        {
          "role": "user",
          "content": input
        }
      ],
      max_tokens=64,  # this ensures we don't get too big of a response
    )

    output = response.choices[0].message.content
    return {"output": output}, 200

