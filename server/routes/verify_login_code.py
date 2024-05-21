from flask import request
import jwt
from server import secret_key
from server import app
from server.models.user import User

def validate_login_code(code: str, phone_number: str) -> bool: 
    user = User.query.get(phone_number)
    if not user:
        return False
    
    return user.confirmation_code == code

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
    if not isinstance(login_code, str):
        return {"error": "login_code must be a string"}, 400
    elif not validate_login_code(login_code, phone_number):
        return {"error": {'type': 'invalid', 'msg': 'The code entered is invalid'}}, 400
    else:
        encoded_jwt = jwt.encode({"user": phone_number}, secret_key, algorithm='HS256')
        return {"message": "login_code is valid", "token": encoded_jwt }, 200
