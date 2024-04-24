from flask import request, jsonify
from fastapi.encoders import jsonable_encoders
from server import app, db
from server.models.conversation import Conversation
from server.models.message import Message
from server.models.user import User


@app.route('/api/create_conversation', methods=['POST'])
def create_conversation():
	if not request.get_json(silent=True):
		return {"error": "missing valid JSON object in request body"}, 400
	
	# data retrieved from request
	data = request.json
	user_id = data.get('user_id')
	conversation_id = data.get('conversation_id')

	# updates database 
	user = User.query.get(user_id)
	conversation = Conversation(
		user_phone_number=user_id, 
		ai_id='chatGPT',
		user=user
	)  
	user.conversations.append(conversation)
	db.session.add(conversation)
	db.session.commit()

	print(conversation)
	return jsonify({'recent_conversation': conversation}), 200
