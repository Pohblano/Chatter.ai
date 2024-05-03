# Library Imports
from flask import request, jsonify
from fastapi.encoders import jsonable_encoder # type: ignore

# File Imports
from server import app, db
from server.models.conversation import Conversation
from server.models.message import Message
from server.actions.formats import format_conversations, format_messages

@app.route('/api/delete_conversation', methods=['POST'])
async def delete_conversation():
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
	if(conversations):
		conversation = conversations_data[-1]
		
		convo_id = conversation['id']

		# Query messages for the given conversation_id
		messages_data = Message.query.filter_by(conversation_id=convo_id).all()
		messages = format_messages(user_id, messages_data)

		print('No conversation in the LocalStorage but the is Past conversations in DB')
		return jsonify({
			'recent_conversation':jsonable_encoder(conversation), 
			'conversations': jsonable_encoder(conversations),
			'messages': jsonable_encoder(messages)
			}), 200

	
	app.logger.info(f"Conversation delete")
	return {'conversations': conversations}, 200