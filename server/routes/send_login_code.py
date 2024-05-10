# Library Imports
from flask import request
import random
import os

# Twilio client import
from server.actions.clients import twilio_client
from twilio.base.exceptions import TwilioRestException

# Database imports
from server import app, db
from server.models.confirmation import Confirmation
from server.models.user import User


# Generate random 6 digit code for to verify user
def generate_login_code(phone_number: str) -> str:
    otp = ""
    for _ in range(6):
        otp += str(random.randint(0, 9))

    # store otp in the database
    confirmation = Confirmation(code=otp)

    # find or create user
    user = User.query.get(phone_number)
    if not user:
        user = User(phone_number=phone_number)

    # associate confirmation code with user
    user.confirmation = confirmation

    # TODO: delete old confirmations when adding a new one

    db.session.add(confirmation)
    db.session.add(user)
    db.session.commit()

    return otp

# Sends verification code to user in order to access account
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

    if not login_code:
        return {"error": "failed to generate login code"}, 500

     # your logic
    try:
        # send login code to phone number via twilio
        twilio_client.messages.create(
            **{
                "from_": "+18449532146",
                "body": f"Your login code is: {login_code}",
                "to": phone_number,
            }
        )  
    except TwilioRestException as e:
        print('twilio error')
        return {"type": "invalid", "msg": "Check your country code"},200


    print(f"Sent login code {login_code} to {phone_number}")
    return {"message": f"Registration code successfully sent to {phone_number}"}, 200
