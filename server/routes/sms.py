# Library Imports
from flask import request
from twilio.twiml.messaging_response import MessagingResponse
# Directory Imports
from server import app
from server.models.user import User
from server.routes.chat_gpt_web import chatGPT_agent
from server.routes.chat_ollama_web import llama_llm

# Actions
from server.routes.send_login_code import generate_login_code
from server.actions.formats import match
from server.routes.stability_sms import render_ai_sms_image

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
    if not user and match(body,r'(?i)join'):
          generate_login_code(phone_number)
          resp.message(u'Thank you. You are now free to text with \U0001F916 \n\nAsk him anything! \U0001F389 ')
          print(f'{phone_number} NOT REGISTERED BUT REPLIED WITH \'JOIN\'')
          return str(resp)
    
     # If its users first time and his text 
    elif not user:
          # Add text
          msg = resp.message(u"Hi! \U0001F917 \n\n First time? No worries. Reply with \"JOIN\" to start texting with an AI agent")

          print(f'{phone_number} NOT REGISTERED AND THEIR FIRST TIME TEXTING')
          return str(resp)
    
    elif user and match(body,r'(?i)IMG:'):  #image generation route    
            urls = render_ai_sms_image(body)
            message ="Here's your image:"
            for url in urls:
                  message += f" \n {url}"

            resp.message(message)

            print(F'COMPOSING USER IMAGE BASED ON PROMPT: {body}')
            return str(resp)

    else:
      #     ai_response = chatGPT_agent.run(body)
          ai_response = llama_llm.invoke(body)

          resp.message(ai_response)
          return str(resp)