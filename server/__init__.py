from flask import Flask

app = Flask(__name__)


import server.routes.chat_gpt
import server.routes.send_login_code
import server.routes.verify_login_code


# Add Access-Control-Allow-Origin header to responses
@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    response.headers.add(
        "Access-Control-Allow-Headers",
        "Content-Type, access-control-allow-origin, Access-Control-Allow-Credentials",
    )
    return response
