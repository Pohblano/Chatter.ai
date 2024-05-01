# Library Imports
from flask import request, jsonify
from fastapi.encoders import jsonable_encoder # type: ignore

# File Imports
from server import app, db
from server.models.conversation import Conversation
from server.models.message import Message
from server.actions.formats import format_conversations, format_messages

# # Formats conversations to match fron-end requirements
# def format_conversations(user_id, conversations):
# 	conversations_data = []
# 	for conversation in conversations:
# 		conversation_data = {
# 			'id': conversation.id,
# 			'ai_id': conversation.ai_id,
# 			'ai': 'ChatGPT',
# 			'user_id': conversation.user_phone_number,
# 			'user_phone_number': conversation.user_phone_number
# 		}
# 		conversations_data.append(conversation_data)
# 	return conversations_data
	

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
	# if(conversations):
	# 	conversation = conversations_data[-1]
	# 	convo_id = conversation.id
	# 	messages_data = Message.query.filter_by(conversation_id=convo_id)
	# 	print(messages_data)
	# 	messages = format_messages(user_id, messages_data)
	# 	serialized_conversation = {
	# 		'id': conversation.id,
	# 		'ai_id': conversation.ai_id,
	# 		'user_phone_number': conversation.user_phone_number
	# 	}

	# 	return jsonify({
	# 		'conversations': conversations,
	# 		'messages': messages,
	# 		'recent_conversation': serialized_conversation
	# 	}),200

	
	app.logger.info(f"Conversation delete")
	return {'conversations': conversations}, 200