# Library Imports
from flask import Flask, request
from twilio.twiml.messaging_response import MessagingResponse

# Directory Imports
from server import app
from server.routes.chat_ollama_web import llama_llm
from server.routes.chat_gpt_web import chatGPT_agent


# https://www.twilio.com/docs/messaging/tutorials/how-to-receive-and-reply/python
@app.route("/api/sms", methods=['GET', 'POST'])
def sms_reply():

     # Get the message the user sent our Twilio number
    print(request.values)
    body = request.values.get('Body', None)

    # Start our TwiML response
    resp = MessagingResponse()

    # Add a text message
    msg = resp.message("The Robots are coming! Head for the hills!")

    # Add a picture message
    # msg.media(
    #     "https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg"
    # )

    return str(resp)
