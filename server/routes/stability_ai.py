from flask import request
from server import app, db
import base64
import os
import requests
import logging
# import boto3


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

	# # decodes base 64 image
	# base64_img=os.environ.get('EXAMPLE_IMG')
	# image_data = base64.b64decode(base64_img)
	
	# # Write the binary data to a file
	# file_name = 'image.jpg'
	# file_path = f'./uploads/{file_name}'  #set it to conversation id
	# with open(file_path, 'wb') as f:
	# 	f.write(image_data)

	# #upload file to S3 Bucket
	# bucket_name='chatter.ai.images'
	# s3_client = boto3.client('s3', aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'), aws_secret_access_key=os.environ.get
	# ('AWS_SECRET_KEY'))

	# try:
	# 	response=s3_client.upload_file(file_path, bucket_name, file_name, ExtraArgs={'ACL': 'public-read'})
	# 	url =f'https://s3.us-east-2.amazonaws.com/{bucket_name}/{file_name}'
	# 	print(url)
		
		
	# except:
	# 	print('Error uploading file to S3')
	
	


	return {}, 200