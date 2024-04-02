from flask import Flask, request, jsonify
from twilio.rest import Client

# ChatGPT libraries
# import os
# from openai import OpenAI

import os
import asyncio
from openai import AsyncOpenAI

# def generate_otp():
#     otp = ""
#     for _ in range(4):
#         otp += str(random.randint(0, 9))
#     return otp


app = Flask(__name__)

# TODO: make this generate a random code and store it in the database
def generate_login_code(phone_number: str) -> int:
    return 1234


# TODO: make this validate the code in the database for a given phone number
def validate_login_code(code: int, phone_number: str) -> bool:
    return code == 1234


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
    client.messages.create(**{'from_': '+17244887744', 'body': f"Your login code is: {registration_code}", 'to': phone_number})
    
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






client = AsyncOpenAI(api_key = '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')

@app.route('/api/chatGPT', methods=['GET'])
async def ai():
    completion=await client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
	    {
            "role": "system", 
            "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."
        },
	    {
            "role": "user", 
            "content": "Write me a small wedding engagement poem"
        }],
    )

    return jsonify({'response':completion.choices[0].message.content})
