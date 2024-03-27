from twilio.rest import Client

# Your Account SID and Auth Token from console.twilio.com
account_sid = AC8c1d8da1b14392fe0109b60ced783bfa
auth_token  = 01c34815812df45377ebeedbf0f9f2a3

client = Client(account_sid, auth_token)

message = client.messages.create(
    to="+16263928591",
    from_="+18664780418",
    body="Hello from Python!")

print(message.sid)