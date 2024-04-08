from flask import request

from server import app


# TODO: make this validate the code in the database for a given phone number
def validate_login_code(code: int, phone_number: str) -> bool:
    return code == 1234


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
