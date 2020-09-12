import os
import io
import boto3
import json
import csv

# grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime= boto3.client('runtime.sagemaker')

def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    data = json.dumps(event)
    
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                      ContentType='application/json',
                                      Body=data)
    response = response['Body'].read().decode("utf-8")
    print(response)
    return { 
        'message' : response
    } 
