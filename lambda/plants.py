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
    'body': json.dumps(response)
  }


def get_plants(body):
  username = json.loads(body)['username']

  users_table_name = 'Users-plantdoc'
  users_table = dynamodb.Table(users_table_name)
  
  familyName = users_table.get_item(
    Key={'username': username},
    ProjectionExpression='familyName'
  )['Item']['familyName']

  plants_table_name = 'Plants-plantdoc'
  plants_table = dynamodb.Table(plants_table_name)
  
  if (familyName == 'NO_FAMILY'):  
    response = plants_table.query(
        IndexName="ownerKey",
        KeyConditionExpression=Key('owner').eq(username),
        ProjectionExpression='#ownr, #fml, plantId, title',
        ExpressionAttributeNames={
            '#ownr': 'owner',
            '#fml': 'family'
        }
    )
  else:
    response = plants_table.query(
        IndexName="familyKey",
        KeyConditionExpression=Key('family').eq(familyName),
        ProjectionExpression='#ownr, #fml, plantId, title',
        ExpressionAttributeNames={
            '#ownr': 'owner',
            '#fml': 'family'
        }
    )
      
  return response['Items']