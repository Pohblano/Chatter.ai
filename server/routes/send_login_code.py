from flask import request
from twilio.rest import Client
import random

from server import app


# TODO: make this generate a random code and store it in the database
def generate_login_code(phone_number: str) -> int:
    otp = ""
    for _ in range(4):
        otp += str(random.randint(0, 9))
    return int(otp)


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
    client.messages.create(
        **{
            "from_": "+17244887744",
            "body": f"Your login code is: {login_code}",
            "to": phone_number,
        }
    )

    return {"message": f"Registration code successfully sent to {phone_number}"}, 200
