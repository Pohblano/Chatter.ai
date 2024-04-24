from flask import request, jsonify
from server import app, db
from server.models.conversation import Conversation
from server.models.message import Message
from server.models.user import User
from datetime import datetime, timezone
from fastapi.encoders import jsonable_encoder # type: ignore


# Format messages to match front-end requirements
def format_messages(user_id, messages):
	messages_data = []
	for message in messages:
		message_data = {
			'id': message.id,
			'content': message.content,
			'date': message.created_at.strftime('%Y-%m-%d'),
			'time': message.created_at.strftime('%H:%M:%S'),
			'author_id': user_id,
			'author_type': message.author_type,
			'Conversation_id': message.conversation_id
		}
		messages_data.append(message_data)
	return messages_data

# Formats conversations to match fron-end requirements
def format_conversations(user_id, conversations):
	conversations_data = []
	for conversation in conversations:
		conversation_data = {
			'id': conversation.id,
			'ai_id': conversation.ai_id,
			'ai': 'ChatGPT',
			'user_id': conversation.user_phone_number,
			'user_phone_number': conversation.user_phone_number
		}
		conversations_data.append(conversation_data)
	return conversations_data
	

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
	conversations = format_conversations(phone_number, conversations_data)
	# Creates new conversation if there is no recent convo or a history of convos
	if not conversation_id and not conversations:
		user = User.query.get(phone_number)
		conversation = Conversation(
			user_phone_number=phone_number, 
			ai_id='chatGPT',
			user=user
		)  
		user.conversations.append(conversation)
		db.session.add(conversation)
		db.session.commit()

		print('No conversation in the LocalStorage or Past converations in DB')
		return jsonify({
			'recent_conversation': jsonable_encoder(conversation), 
			'conversations': jsonable_encoder(conversations)
			}), 200
	
	# Returns the last convo in the conversations array to utlize as recent conversation
	if not conversation_id:
		conversation = conversations[-1]
		print(conversation)

		# Query messages for the given conversation_id
		messages_data = Message.query.filter_by(conversation_id=conversation['id']).all()
		messages = format_messages(phone_number, messages_data)
		print(messages)

		print('No conversation in the LocalStorage but the is Past conversations in DB')
		return jsonify({
			'recent_conversation':jsonable_encoder(conversation), 
			'conversations': jsonable_encoder(conversations),
			'messages': jsonable_encoder(messages)
			}), 200
	
	
	# Query messages for the given conversation_id
	messages_data = Message.query.filter_by(conversation_id=conversation_id).all()
	messages = format_messages(phone_number, messages_data)

	print('Conversation in localstorate and list of past conversations')
	return jsonify({
		'conversations': jsonable_encoder(conversations),
		'messages':  jsonable_encoder(messages)
		}), 200
	
