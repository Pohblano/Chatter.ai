# from twilio.rest import Client

# # Your Account SID and Auth Token from console.twilio.com
# account_sid = AC8c1d8da1b14392fe0109b60ced783bfa
# auth_token  = 01c34815812df45377ebeedbf0f9f2a3
# client = Client(account_sid, auth_token)

# message = client.messages.create(
#     to="+16263928591",
#     from_="+18664780418",
#     body="Hello from Python!")

# print(message.sid)


# api_key = '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'

# @app.route('/api/chatGPT', methods=['GET'])
# def ai():
#     # # message = data
#     completion = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[
# 	    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
# 	    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}])
#     return jsonify({'response':completion.choices[0].message.content})


