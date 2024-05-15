import re

# Formats conversations to match fron-end requirements
def format_conversations(user_id, conversations):
	conversations_data = []
	for conversation in conversations:
		conversation_data = {
			'id': conversation.id,
			'ai_id': conversation.ai_id,
			'ai': 'ChatGPT',
			'user_id': conversation.user_phone_number,
			'user_phone_number': conversation.user_phone_number,
			'created_at': conversation.created_at.strftime('%B %d, %Y'),
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

# Check string for regex match
def match(string, pattern):
    # Use re.search to find the pattern in the string
    match = re.search(pattern, string)
    if match: 
        return True
    else:
        return False
    
# Parses a phone number to an integer
def phone_number_to_integer(string):
    # Check if the string starts with '+'
    if string.startswith('+'):
        # Remove the '+' character from the string
        number_string = string[1:]
    else:
        # If no '+' character is present, use the original string
        number_string = string

    # Parse the string into an integer
    try:
        parsed_integer = int(number_string)
        return parsed_integer
    except ValueError:
        # Handle the case where the string cannot be parsed into an integer
        print(f"Error: '{string}' is not a valid integer representation.")
        return None