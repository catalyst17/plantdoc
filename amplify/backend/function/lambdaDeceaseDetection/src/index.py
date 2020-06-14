import os
import io
import boto3
import json
import csv

# grab environment variables
ENDPOINT_NAME = "pytorch-inference-2020-06-14-07-50-37-668"
runtime= boto3.client('runtime.sagemaker')

def handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    data = json.dumps(event)
    
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                      ContentType='application/json',
                                      Body=data)
    response = response['Body'].read().decode("utf-8")
    print(response)
    return {
    'statusCode': 200,
    'headers': {
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Access-Control-Allow-Origin': '*'
    },
    'body': json.dumps(response)
  }
