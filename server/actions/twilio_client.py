from twilio.rest import Client
import os

# send login code to phone number via twilio
auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
account_sid = os.environ.get("TWILIO_SID")
client = Client(account_sid, auth_token)
