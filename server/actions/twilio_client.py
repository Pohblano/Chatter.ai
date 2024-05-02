from twilio.rest import Client
import os

# send login code to phone number via twilio
auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
account_sid = os.environ.get("TWILIO_SID")
# auth_token='f90ab474320826eab751dbc6275a14f6'
# account_sid='AC1583468d0f68fae0d8e669747e4432da'
client = Client(account_sid, auth_token)
