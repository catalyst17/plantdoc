import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')

def handler(event, context):
  print(event)
  # if (event['httpMethod'] == 'GET'):
  #   response = get_plants(event['body'])
  #   print(response)
  
  return {
    'statusCode': 200,
    'headers': {
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Access-Control-Allow-Origin': '*'
    },
    'body': json.dumps("response")
  }


def get_plants(user):
    table_name = 'Users-plantdoc'
    
    table = dynamodb.Table(table_name)
    
    print("seems to be a new user")
    response = table.put_item(Item=json.loads(user))
        
    return response