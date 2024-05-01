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

# Formats messages to match front-end requirements
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
