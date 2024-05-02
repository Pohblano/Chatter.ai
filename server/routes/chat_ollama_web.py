# Library Imports
from flask import Flask, request, jsonify, Response
from typing import List
from langchain_community.llms import Ollama
# from langchain_community.chat_models import ChatOllama

# Server imports
from server import app, db
from server.models.conversation import Conversation
from server.models.user import User
from server.models.message import Message, AuthorType

llama_llm = Ollama(model="llama2", temperature=0.9)


@app.route('/api/ollama', methods=['POST'])
async def ai_ollama():
	if not request.get_json(silent=True):
		return {"error": "missing valid JSON object in request body"}, 400

	# data retrieved from request
	data = request.json
	print(data)
	content = data.get('content')
	conversation_id = data.get('conversation_id')
	user_id = data.get('author_id') #serve as both phone_number and user_id

	if not content:
		return {"error": "Need user input."}, 400

	# query necessary documents
	user  = User.query.get(user_id)
	conversation = Conversation.query.get(conversation_id)
	print(conversation)

	# create user message and add to conversation
	user_message = Message(
		content = content, 
		conversation_id = conversation_id,
		author_type = 'USER',
		conversation = conversation
	)
	if conversation:
		conversation.messages.append(user_message)
	db.session.add(user_message)

	#  Run the agent and stream the response
	response_stream = llama_llm.invoke(content)

	# # create ai message and add to conversation
	ai_message = Message(
		content = response_stream, 
		conversation_id = conversation_id,
		author_type = 'AI',
		conversation = conversation
	)
	if conversation:
		conversation.messages.append(ai_message)
	db.session.add(ai_message)
	db.session.commit()

	# Stream the response
	def generate_response():
		for chunk in llama_llm.stream(response_stream):
			yield chunk  # Add newline character between chunks

	# Return a Response object with the generated response
	return Response(generate_response(), content_type='text/event-stream', status=200)