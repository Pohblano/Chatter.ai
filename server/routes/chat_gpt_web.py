from flask import Flask, request, jsonify, Response
import os
from dotenv import load_dotenv
from server import app, db
from server.models.conversation import Conversation
from server.models.user import User
from server.models.message import Message, AuthorType
from fastapi.encoders import jsonable_encoder # type: ignore


from typing import List
from langchain_openai import ChatOpenAI
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.schema import HumanMessage
from langchain.memory import ConversationBufferWindowMemory
from langchain.agents import load_tools, AgentType, initialize_agent
from langchain.agents import AgentExecutor
from langchain.callbacks.streaming_stdout_final_only import (
    FinalStreamingStdOutCallbackHandler,
)


llm = ChatOpenAI(
    openai_api_key=os.environ.get('OPENAI_API_KEY'),
    temperature=0.9,
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
tools = load_tools([],llm=llm)

# initialize the agent
chatGPT_agent = initialize_agent(
    agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
    tools=tools,
    llm=llm,
    memory=memory,
    verbose=True,
    max_iterations=1,
    early_stopping_method="generate",
    return_intermediate_steps=False,
    streaming=True,
    handle_parsing_errors=True
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

chatGPT_agent.agent.llm_chain.llm.callbacks = [CallbackHandler()]




@app.route('/api/chatGPT', methods=['POST'])
async def ai():
    if not request.get_json(silent=True):
        return {"error": "missing valid JSON object in request body"}, 400
    
    # data retrieved from request
    data = request.json
    content = data.get('content')
    conversation_id = data.get('conversation_id')
    user_id = data.get('author_id') #serve as both phone_number and user_id

    if not content:
        return {"error": "Need user input."}, 400
    
    # query necessary documents
    user  = User.query.get(user_id)
    conversation = Conversation.query.get(conversation_id)
   
    # create user message and add to conversation
    user_message = Message(
        content = content, 
        conversation_id = conversation_id,
        author_type = AuthorType.USER,
        conversation = conversation
    )
    conversation.messages.append(user_message)
    db.session.add(user_message)

    #  Run the agent and stream the response
    response_stream = chatGPT_agent.run(content)

    # response_stream ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    # # create ai message and add to conversation
    ai_message = Message(
        content = response_stream, 
        conversation_id = conversation_id,
        author_type = AuthorType.AI,
        conversation = conversation
    )
    conversation.messages.append(ai_message)
    db.session.add(ai_message)

    db.session.commit()

    # Stream the response
    def generate_response():
        for chunk in response_stream:
            yield chunk  # Add newline character between chunks
  
    # Return a Response object with the generated response
    return Response(generate_response(), content_type='text/event-stream', status=200)
