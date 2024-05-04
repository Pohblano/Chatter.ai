# Library Imports
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse
from twilio.base.exceptions import TwilioRestException

# Directory Imports
from server import app, db
from server.models.conversation import Conversation
from server.models.message import Message, AuthorType
from server.models.user import User
from server.routes.chat_ollama_web import llama_llm
from server.routes.chat_gpt_web import chatGPT_agent, chatGPT_text_llm

# Actions
from server.routes.send_login_code import generate_login_code
from server.actions.formats import match, phone_number_to_integer


@app.route("/api/sms", methods=['GET', 'POST'])
def sms_reply():

     # Get the message the user sent our Twilio number
    body = request.values.get('Body', None)
    phone_number = request.values.get('From', '')

    print(f'USER PHONE#: {phone_number}')
    print(f'{phone_number} said: \"{body}\"')
     # Start our TwiML response
    resp = MessagingResponse()

     # Find or create user
    user = User.query.get(phone_number)
  
    
     # Conditions for different messages
    if not user and match(body,r'JOIN'):
          generate_login_code(phone_number)
          resp.message(u'Thank you. You are now free to text with AI \U0001F916 \n Ask him anything! \U0001F389 ')
          print(f'{phone_number} NOT REGISTERED BUT REPLIED WITH \'JOIN\'')
          return str(resp)
    
     # If its users first time and his text 
    elif not user:
          # Add a picture message
          resp.media("../images/Chatter_logo.png")
          # Add text
          resp.message(u"Hi! \U0001F917 \n First time? No worries. Reply with **\"JOIN\"** to start texting with an AI agent")
          print(f'{phone_number} NOT REGISTERED AND THEIR FIRST TIME TEXTING')
          return str(resp)
    else:
          # Using user phone number as their own id and conversation id
          conversation_id = phone_number_to_integer(phone_number)
          conversation = Conversation.query.get(conversation_id)

          print(f'CONVERSATION: {conversation}')
          if(not conversation):
               conversation = Conversation(
                   id=conversation_id, 
                   user_phone_number=phone_number, 
                   ai_id='chatGPT') 
               db.session.add(conversation)
               db.session.commit()

          try:
               # create user message and add to conversation record and db
               user_message = Message(
                    content = body, 
                    conversation_id = conversation_id,
                    author_type = AuthorType.USER,
                    conversation = conversation)
               conversation.messages.append(user_message)
               db.session.add(user_message)
               db.commit()
               
               # Calls AI to generate response
               # ai_response = chatGPT_agent.run(body)
               ai_response = chatGPT_text_llm.invoke(body)
               print(f'chatGPT response: {ai_response}')

               # create ai message and add to conversation record and db
               ai_message = Message(
                    content = ai_response, 
                    conversation_id = conversation_id,
                    author_type = AuthorType.AI,
                    conversation = conversation
               )
               conversation.messages.append(ai_message)
               db.session.add(ai_message)
               db.session.commit()

               resp.message(ai_response)
               return str(resp)
          
          except TwilioRestException as e:
               print(f"TWILIO ERROR: {e}")
               return 