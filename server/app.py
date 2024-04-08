from flask import Flask, request, jsonify, Response
import random

# ChatGPT libraries
import os
from openai import OpenAI
import tiktoken



app = Flask(__name__)


# TODO: make this generate a random code and store it in the database
def generate_login_code(phone_number: str) -> int:
    otp = ""
    for _ in range(4):
        otp += str(random.randint(0, 9))
    return int(otp)


# TODO: make this validate the code in the database for a given phone number
def validate_login_code(code: int, phone_number: str) -> bool:
    return code == 1234


# Add Access-Control-Allow-Origin header to responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add("Access-Control-Allow-Headers", 'Content-Type, access-control-allow-origin, Access-Control-Allow-Credentials')
    return response


@app.route("/api/send_login_code", methods=["POST"])
def send_login_code():
    if not request.get_json(silent=True):
        return {"error": "missing valid JSON object in request body"}, 400

    data = request.json
    phone_number = data.get("phone_number")

    # validate phone_number
    if not phone_number:
        return {"error": "phone_number is required"}, 400
    elif not isinstance(phone_number, str):
        return {"error": "phone_number must be a string"}, 400
    elif len(phone_number) < 10:
        return {"error": "phone_number must be at least 10 characters"}, 400
    elif len(phone_number) > 15:
        return {"error": "phone_number must be at most 15 characters"}, 400
    elif not phone_number.startswith("+"):
        return {"error": "phone_number must start with a country code"}, 400

    login_code = generate_login_code(phone_number)

    # send login code to phone number via twilio
    account_sid = "AC1583468d0f68fae0d8e669747e4432da"
    auth_token = "f90ab474320826eab751dbc6275a14f6"
    client = Client(account_sid, auth_token)
    client.messages.create(**{'from_': '+17244887744', 'body': f"Your login code is: {registration_code}", 'to': phone_number})
    
    # Step 5: Return a response
    return {'message': f"Registration code successfully sent to {phone_number}"}, 200



@app.route("/api/verify_login_code", methods=["POST"])
def verify_login_code():
    if not request.get_json(silent=True):
        return {"error": "missing valid JSON object in request body"}, 400

    data = request.json
    phone_number = data.get("phone_number")
    login_code = data.get("login_code")

    # make sure phone_number and login_code are provided
    if not phone_number:
        return {"error": "phone_number is required"}, 400
    elif not login_code:
        return {"error": "login_code is required"}, 400

    # validate login_code
    if not isinstance(login_code, int):
        return {"error": "login_code must be an integer"}, 400
    elif not validate_login_code(login_code, phone_number):
        return {"error": "login_code is invalid"}, 400
    else:
        return {"message": "login_code is valid"}, 200





from typing import List
from langchain_openai import ChatOpenAI
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.schema import HumanMessage
from langchain.memory import ConversationBufferWindowMemory
from langchain.agents import load_tools, AgentType, initialize_agent
from langchain.callbacks.streaming_stdout_final_only import (
    FinalStreamingStdOutCallbackHandler,
)


llm = ChatOpenAI(
    openai_api_key='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',
    temperature=1.1,
    model_name="gpt-3.5-turbo",
    streaming=True,  # ! important
    callbacks=[StreamingStdOutCallbackHandler()]  # ! important
)


# initialize conversational memory
memory = ConversationBufferWindowMemory(
    memory_key="chat_history",
    k=1,
    return_messages=True,
    output_key="output"
)

# create a single tool to see how it impacts streaming
tools = load_tools(["llm-math"], llm=llm)

# initialize the agent
agent = initialize_agent(
    agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
    tools=tools,
    llm=llm,
    memory=memory,
    verbose=True,
    max_iterations=1,
    early_stopping_method="generate",
    return_intermediate_steps=False,
    streaming=True
)

class CallbackHandler(StreamingStdOutCallbackHandler):
    def __init__(self):
        self.content: str = ""
        self.final_answer: bool = False
        self.response_tokens: List[str] = []

    def on_llm_new_token(self, token: str, **kwargs: any) -> None:
        self.content += token
        if "Final Answer" in self.content:
            # now we're in the final answer section, but don't print yet
            self.final_answer = True
            self.content = ""
        if self.final_answer:
            if '"action_input": "' in self.content:
                if token not in ["}"]:
                     self.response_tokens.append(token)

    def get_response_tokens(self) -> List[str]:
        return self.response_tokens

agent.agent.llm_chain.llm.callbacks = [CallbackHandler()]





client = OpenAI(api_key = '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')

@app.route('/api/chatGPT', methods=['POST'])
async def ai():
    if not request.get_json(silent=True):
        return {"error": "missing valid JSON object in request body"}, 400

    data = request.json
    content = data.get('content')
    if not content:
        return {"error": "Need user input."}, 400
    
    user_entry = {
        'content': content,
        'date': data.get('date'),
        'time': data.get('time'),
        'author_type': data.get('author_type')
    }
    

    ai_entry = {
        'content': agent.run(content),
        'author_type': 'ai',
        'time': '',
        'date': ''
    }


    return jsonify(ai_entry), 200

