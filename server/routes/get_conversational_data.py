# Library Imports
from flask import request, jsonify
from datetime import datetime, timezone
from fastapi.encoders import jsonable_encoder # type: ignore

# Directory Imports
from server import app, db
from server.models.conversation import Conversation
from server.models.message import Message
from server.models.user import User
from server.models.confirmation import Confirmation
from server.actions.formats import format_conversations, format_messages



@app.route('/api/get_conversational_data', methods=['POST'])
def get_conversational_data():

	if not request.get_json(silent=True):
		return {"error": "missing valid JSON object in request body"}, 400
	
	# data retrieved from request
	data = request.json
	phone_number = data.get("user_id") # type: ignore
	conversation_id = data.get("conversation_id") # type: ignore

	# Query conversations for the given user phone_number
	conversations_data = Conversation.query.filter_by(user_phone_number=phone_number).all()
	print(conversations_data)
	conversations = format_conversations(phone_number, conversations_data)

	# Returns the last convo in the conversations array to utlize as recent conversation
	if not conversation_id and conversations_data:
		conversation = conversations[-1]
		print(conversation)
		convo_id = conversation['id']

		# Query messages for the given conversation_id
		messages_data = Message.query.filter_by(conversation_id=convo_id).all()
		messages = format_messages(phone_number, messages_data)

		print('No conversation in the LocalStorage but the is Past conversations in DB')
		return jsonify({
			'recent_conversation':jsonable_encoder(conversation), 
			'conversations': jsonable_encoder(conversations),
			'messages': jsonable_encoder(messages)
			}), 200
	
	else:
		# Query messages for the given conversation_id
		messages_data = Message.query.filter_by(conversation_id=conversation_id).all()
		messages = format_messages(phone_number, messages_data)
		print('Conversation in localstorate and list of past conversations')
		return jsonify({
			'conversations': jsonable_encoder(conversations),
			'messages':  jsonable_encoder(messages)
			}), 200
	