import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')

def handler(event, context):
  print(event)
  if (event['httpMethod'] == 'POST'):
    response = get_plants(event['body'])
    print(response)
  
  return {
    'statusCode': 200,
    'headers': {
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Access-Control-Allow-Origin': '*'
    },
    'body': json.dumps("response")
  }


def get_plants(body):
  username = json.loads(body)['username']
  print(username)
  
  users_table_name = 'Users-plantdoc'
  users_table = dynamodb.Table(users_table_name)
  
  familyName = users_table.get_item(
    Key={'username': username},
    ProjectionExpression='familyName'
  )
  
  print(familyName)
  
  plants_table_name = 'Plants-plantdoc'
  
  response = familyName
      
  return response