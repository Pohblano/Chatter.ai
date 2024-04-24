import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

secret_key= 'WhatSecret?'

app = Flask(__name__)
CORS(app, resources=r'/api/*') # This will enable CORS for all routes

basedir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(
    basedir, "chatter-ai.db"
)

# create database
db = SQLAlchemy(app)

# import routes
import server.routes.send_login_code
import server.routes.verify_login_code
import server.routes.create_conversation
import server.routes.get_conversational_data
import server.routes.get_conversation
import server.routes.chat_gpt_web
import server.routes.preflight_twilio



# # Add Access-Control-Allow-Origin header to responses
# @app.after_request
# def after_request(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add("Access-Control-Allow-Credentials", "true")
#     response.headers.add("Access-Control-Allow-Headers", "*")
#     response.headers.add("Access-Control-Allow-Methods", "*")
#     return response

# import database models
from server.models.user import User
from server.models.ai import AI
from server.models.confirmation import Confirmation
from server.models.conversation import Conversation
from server.models.message import Message


# create database tables
with app.app_context():
    db.create_all()
