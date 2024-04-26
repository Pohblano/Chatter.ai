from flask import request, jsonify
from server import app, db
from server.models.conversation import Conversation
from server.models.message import Message
from fastapi.encoders import jsonable_encoder

def format_messages(user_id, messages):
	messages_data = []
	for message in messages:
		message_data = {
			'id': message.id,
			'content': message.content,
			'date': message.created_at.strftime('%Y-%m-%d'),
			'time':  message.created_at.strftime('%H-%M-%S'),
			'author_id': user_id,
			'author_type': message.author_type,
			'conversation_id': message.conversation_id
		}
		messages_data.append(message_data)
	return messages_data	


@app.route('/api/get_conversation', methods=['POST'])
def get_conversation():
	if not request.get_json(silent=True):
		return {'error': 'Missing valid JSON object in request body'}, 400
	
	# data retrieved from request
	data = request.json
	user_id = data.get('user_id')
	conversation_id = data.get('conversation_id')

	# retrieve data from database
	conversation = Conversation.query.get(conversation_id)
	messages_data = Message.query.filter_by(conversation_id=conversation_id).all()
	messages = format_messages(user_id, messages_data)

	return jsonify({
		'conversation': jsonable_encoder(conversation),
		'messages': jsonable_encoder(messages)
	})