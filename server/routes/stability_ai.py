from flask import request
from server import app, db
import base64
import os
import requests

def render_ai_image(content):
	# engine_id = "stable-diffusion-v1-6"
	# api_host =  'https://api.stability.ai'
	# api_key = os.getenv("STABILITY_KEY")

	# if api_key is None:
	# 	raise Exception("Missing Stability API key.")

	# response = requests.post(
	# 	f"{api_host}/v1/generation/{engine_id}/text-to-image",
	# 	headers={
	# 		"Content-Type": "application/json",
	# 		"Accept": "application/json",
	# 		"Authorization": f"Bearer {api_key}"
	# 	},
	# 	json={
	# 		"text_prompts": [
	# 			{
	# 				"text": "content"
	# 			}
	# 		],
	# 		"cfg_scale": 7,
	# 		"height": 320,
	# 		"width": 320,
	# 		"samples": 1,
	# 		"steps": 30,
	# 	},
	# )

	# if response.status_code != 200:
	# 	raise Exception("Non-200 response: " + str(response.text))

	# data = response.json()

	# for i, image in enumerate(data["artifacts"]):
	# 	with open(f"v1_txt2img_{i}.png", "wb") as f:
	# 		f.write(base64.b64decode(image["base64"]))



	# data = response.json()
	# decoded_images = []

	# for i, image in enumerate(data["artifacts"]):
	# 	decoded=base64.b64decode(image["base64"])
	# 	decoded_images.push(decoded)




	# return data

	# decodes base 64 image
	base64_img=os.environ.get('EXAMPLE_IMG')
	image_data = base64.b64decode(base64_img)
	
	# Write the binary data to a file
	file_name = 'image.jpg'
	file_path = f'./uploads/{file_name}'  #set it to conversation id
	with open(file_name, 'wb') as f:
		f.write(image_data)

	#  Upload the file to Dropbox
	token='sl.B00sycMGLVFdjy9XW8omLRvAdNyy3bDrFMinQHqKjCSgONIE0SR8pyrEMzACTdXNLrru-xjitgSRszS5Bf4HzzAX_6uUWzcUA5Ib7TUUW5yGn7VyH-LxuaZK6Ejsq5j7WOmiOM5pjtNBqOWkbN7tarM'
	url = "https://content.dropboxapi.com/2/files/upload"
	headers = {
		"Authorization": f"Bearer {token}",
		"Content-Type": "application/octet-stream",
		"Dropbox-API-Arg": '{"path":"/' + file_name + '","mode":"add","autorename":true,"mute":false}'
	}
	data = open(file_name, "rb").read()

	response = requests.post(url, headers=headers, data=data)

	if response.status_code == 200:
		print("File uploaded successfully!")
		 # Get the shared link of the uploaded file
		url = "https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings"
		headers = {
			"Authorization": "Bearer " + token,
			"Content-Type": "application/json"
		}
		data = {
			"path": "/" + file_name
		}
		response = requests.post(url, headers=headers, json=data)
		if response.status_code == 200:
			shared_link = response.json()["url"]
			print("Shared link:", shared_link)
		else:
			print("Error getting shared link:", response.text)
		
	else:
		print("Error uploading file:", response.text)

	return {}, 200
