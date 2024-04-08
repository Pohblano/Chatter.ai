from flask import request
from openai import OpenAI

from server import app

client = OpenAI(api_key="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")


@app.route("/api/chatGPT", methods=["POST"])
async def chat_gpt():
    if not request.get_json(silent=True):
        return {"error": "missing valid JSON object in request body"}, 400

    data = request.json
    input = data.get("input")

    if not input:
        return {"error": "input is required"}, 400

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are ChatGPT, a conversational LLM."},
            {"role": "user", "content": input},
        ],
        max_tokens=64,  # this ensures we don't get too big of a response
    )

    output = response.choices[0].message.content
    return {"output": output}, 200
