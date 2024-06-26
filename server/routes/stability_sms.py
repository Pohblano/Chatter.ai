# Library Imports
import base64
import os
import requests
import botocore
# Directory imports
from server.actions.clients import s3_client

def render_ai_sms_image(file_id, content):
	engine_id = "stable-diffusion-v1-6"
	api_host = "https://api.stability.ai"
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
			"text_prompts": [{"text": content}],
			"cfg_scale": 7,
			"height": 500,
			"width": 500,
			"sampler": "K_DPMPP_2M",
			"samples": 1,
			"steps": 50,
		},
	)

	if response.status_code == 200:
		data = response.json()
		images = []
		paths = []
		image_urls = []

		# Decode and upload files to directory
		for i, image in enumerate(data["artifacts"]):
			images.append(f"v1_{file_id}_{i}.png")
			paths.append(f"/home/chatterai/Chatter.ai/server/uploads/v1_{file_id}_{i}.png")
			with open(f"/home/chatterai/Chatter.ai/server/uploads/v1_{file_id}_{i}.png", "wb") as f:
				f.write(base64.b64decode(image["base64"]))
			
		# #upload file to S3 Bucket
		bucket_name='chatter.ai.images'
		
		try:
			# Loop through generated images and return a list or urls
			for i, file_path in enumerate(paths):
				s3_client.upload_file(file_path, bucket_name, images[i], ExtraArgs={'ACL': 'public-read', 'ContentType': 'image/png'})

				url=f"https://s3.us-east-2.amazonaws.com/{bucket_name}/{images[i]}"
				image_urls.append(url)

		except botocore.exceptions.ClientError as error:
			print('Error uploading file to S3', error)
		
		print('FILE IMAGES',images)
		print('FILE PATHS',paths)
		print('IMAGE URLS',image_urls)
		return image_urls
		
	else:
		raise Exception("Non-200 response: " + str(response.text))