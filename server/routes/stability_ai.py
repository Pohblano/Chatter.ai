from flask import request
from server import app, db
import base64
import os
import requests

def render_ai_image(content):
	engine_id = "stable-diffusion-v1-6"
	api_host =  'https://api.stability.ai'
	api_key = os.getenv("STABILITY_KEY")

	if api_key is None:
		raise Exception("Missing Stability API key.")

	response = requests.post(
		f"{api_host}/v1/generation/{engine_id}/text-to-image",
		headers={
			"Content-Type": "application/json",
			"Accept": "application/json",
			"Authorization": f"Bearer {api_key}"
		},
		json={
			"text_prompts": [
				{
					"text": "content"
				}
			],
			"cfg_scale": 7,
			"height": 320,
			"width": 320,
			"samples": 1,
			"steps": 30,
		},
	)

	if response.status_code != 200:
		raise Exception("Non-200 response: " + str(response.text))

	data = response.json()
	

	# for i, image in enumerate(data["artifacts"]):
	# 	with open(f"../images/renders/v1_txt2img_{i}.png", "wb") as f:
	# 		f.write(base64.b64decode(image["base64"]))

	return data