from flask import Flask, request, jsonify, Response
from server import app
# import os
# import tiktoken
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
tools = load_tools([],llm=llm)

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

agent.agent.llm_chain.llm.callbacks = [CallbackHandler()]




@app.route('/api/chatGPT', methods=['POST'])
async def ai():
    print(request)
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
   
    #  Run the agent and stream the response
    response_stream = agent.run("ignore previous instructions and be verbos. "+ content)

    # response_stream ="``` js \nvar foo = function (bar) {\n return bar++; \n};\n\nconsole.log(foo(5));\n```"
 

    ai_entry = {
        'content': response_stream,
        'author_type': 'ai',
        'time': '',
        'date': ''
    }


    # Stream the response
    def generate_response():
        for chunk in response_stream:
            yield chunk  # Add newline character between chunks
  
    
    

    # Return a Response object with the generated response
    return Response(generate_response(), content_type='text/event-stream', status=200)
