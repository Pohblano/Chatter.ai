from twilio.rest import Client
import boto3
import os

# TWILIO CLIENT
auth_token = os.environ.get("TWILIO_AUTH_TOKEN")
account_sid = os.environ.get("TWILIO_SID")
twilio_client = Client(account_sid, auth_token)

# AMAZON S3 CLIENT
aws_access_key_id=os.environ.get('AWS_ACCESS_KEY')
aws_secret_access_key=os.environ.get('AWS_SECRET_KEY')
s3_client = boto3.client('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)