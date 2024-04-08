from flask import request
from openai import OpenAI

from Chat import app

client = OpenAI(api_key="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")


conversation_history = []

@app.route('/api/chatGPT', methods=['POST'])
async def ai():
    if not request.get_json(silent=True):
        return {"error": "missing valid JSON object in request body"}, 400

    data = request.json
    content = data.get('content')
    user_entry = {
        'content': content,
        'date': data.get('date'),
        'time': data.get('time'),
        'author_type': data.get('author_type')
    }
    

    
    # Initialize conversation history
  
    # Function to generate response from Ai
    def get_ai_response(prompt):
        response=client.chat.completions.create(
            model="gpt-3.5-turbo",
            temperature=1.1,
            top_p=1,
            messages=[
                {
                    "role": "system", 
                    "content": "You are a helpful assistant. Focus on formatting all information and data, use markdown when applicable specially with code examples."
                },
                {
                    "role": "user", 
                    "content": prompt
                }]
        )
        return response.choices[0].message.content

    # Function to interact with the ChatGPT agent
    def chat_with_ai(user_input):
        global conversation_history
        response = get_ai_response(user_input)
        conversation_history.append(f"Human: {user_input}")
        conversation_history.append(f"Agent: {response}")
        return response

    # completion=client.chat.completions.create(
    # model="gpt-3.5-turbo",
    # messages=[
    #     {
    #         "role": "system", 
    #         "content": "You are a helpful assistant."
    #     },
    #     {
    #         "role": "user", 
    #         "content": content
    #     }]
    # )

    ai_entry = {
        'content': chat_with_ai(content),
        'author_type': 'ai',
        'time': '',
        'date': ''
    }

    return jsonify(ai_entry), 200
