from flask import request, jsonify
from server import app, db
from server.models.conversation import Conversation
from server.models.message import Message


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
	

@app.route('/api/delete_conversation', methods=['POST'])
def delete_conversation():
	if not request.get_json(silent=True):
		return {"error": "missing valid JSON object in request body"}, 400
	
	data = request.get_json(silent=True)
	conversation_id = data.get('conversation_id')
	user_id = data.get('user_id')

	Conversation.query.filter_by(id=conversation_id).delete()
	Message.query.filter_by(conversation_id=conversation_id).delete()
	db.session.commit()

	conversations_data = Conversation.query.filter_by(user_phone_number=user_id).all()
	conversations = format_conversations(user_id, conversations_data)
	print(conversations)
	app.logger.info(f"Conversation delete")
	return {'conversations': conversations}, 200