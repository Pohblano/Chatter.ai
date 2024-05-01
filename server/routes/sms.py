from flask import Flask
from twilio.twiml.messaging_response import MessagingResponse

from server import app

# https://www.twilio.com/docs/messaging/tutorials/how-to-receive-and-reply/python
@app.route("/api/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming calls with a MMS message."""
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a text message
    msg = resp.message("The Robots are coming! Head for the hills!")

    # Add a picture message
    # msg.media(
    #     "https://farm8.staticflickr.com/7090/6941316406_80b4d6d50e_z_d.jpg"
    # )

    return str(resp)
