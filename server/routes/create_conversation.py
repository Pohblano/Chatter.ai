from flask import request, jsonify
from server import app, db
from server.models.conversation import Conversation
from server.models.message import Message
from server.models.user import User
from server.actions.formats import format_conversations


@app.route('/api/create_conversation', methods=['POST'])
def create_conversation():
	if not request.get_json(silent=True):
		return {"error": "missing valid JSON object in request body"}, 400
	
	# data retrieved from request
	data = request.json
	user_id = data.get('user_id')
	
	# updates database 
	user = User.query.get(user_id)
	
	conversation = Conversation(
		user_phone_number=user_id, 
		ai_id='chatGPT',
	)  
	# conversation = Conversation.query.get(conversation_id)
	db.session.add(conversation)
	db.session.commit()
	conversations_data = Conversation.query.filter_by(user_phone_number=user_id).all()
	conversations = format_conversations(user_id, conversations_data)


	serialized_conversation = {
		'id': conversation.id,
		'ai_id': conversation.ai_id,
		'user_phone_number': conversation.user_phone_number
	}
	
	print(serialized_conversation)

	return jsonify({'recent_conversation': serialized_conversation, 'conversations': conversations}), 200