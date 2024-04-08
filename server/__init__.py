import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, "chatter-ai.db"
)

# create database
db = SQLAlchemy(app)


# import routes
import server.routes.chat_gpt
import server.routes.send_login_code
import server.routes.verify_login_code


# Add Access-Control-Allow-Origin header to responses
@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    response.headers.add(
        "Access-Control-Allow-Headers",
        "Content-Type, access-control-allow-origin, Access-Control-Allow-Credentials",
    )
    return response


# import database models
from server.models.user import User
from server.models.ai import AI
from server.models.confirmation import Confirmation
from server.models.conversation import Conversation
from server.models.message import Message


# create database tables
with app.app_context():
    db.create_all()
