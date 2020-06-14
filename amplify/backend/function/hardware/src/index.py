from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTShadowClient
import logging
import time
import argparse
import json

def handler(event, context):
  print('received event:')
  print(event)
  response = ''
  resource = event['resource']
  msg = ''
  topic = ''
  if resource == '/hardware/sensors':
    response = 'trigger sensor successfully'
    topic = '$aws/things/thingName/shadow/get'
  elif resource == '/hardware/watering':
    response = 'trigger watering successfully'
    topic = 'rasp/control'
    msg = 'turn on water'
  elif resource == '/hardware/camera':
    response = 'trigger camera successfully'
    topic = 'rasp/control'
    msg = 'turn on camera'

  publishMessage(topic, msg)

  return {
    'statusCode': 200,
    'headers': {
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        'Access-Control-Allow-Origin': '*'
    },
    'body': json.dumps(response)
  }

def publishMessage(topic, msg):

    logger = logging.getLogger("AWSIoTPythonSDK.core")
    logger.setLevel(logging.ERROR)
    streamHandler = logging.StreamHandler()
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    streamHandler.setFormatter(formatter)
    logger.addHandler(streamHandler)
    
    # AWS IoT Core endpoint. Need change some values to yours.
    host = "a10m8p7lt0j4xx-ats.iot.us-east-1.amazonaws.com"
    port = 8883;
    # AWS IoT Root Certificate. Needn't change.
    rootCAPath = "AmazonRootCA1.pem"
    # Device private key. Need change to yours.
    privateKeyPath = "df799e9883-private.pem.key"
    # Device certificate. Need change to yours.
    certificatePath = "df799e9883-certificate.pem.crt"
    clientId = "RaspberryLedPublisher"
    
    # Init AWSIoTMQTTClient
    myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId)
    myAWSIoTMQTTClient.configureEndpoint(host, port)
    myAWSIoTMQTTClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)
    
    # AWSIoTMQTTClient connection configuration
    myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
    myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
    myAWSIoTMQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
    myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
    myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)  # 5 sec
    
    myAWSIoTMQTTClient.connect()
  
    # Publish message
    message = {}
    message['message'] = msg
    messageJson = json.dumps(message)
    myAWSIoTMQTTClient.publish(topic, messageJson, 1)
    print('Published topic %s: %s\n' % (topic, messageJson))

    if topic == "$aws/things/pi/shadow/get":
        myAWSIoTMQTTShadowClient = None;
        myAWSIoTMQTTShadowClient = AWSIoTMQTTShadowClient("RaspberryLedSwitch")
        myAWSIoTMQTTShadowClient.configureEndpoint(host, port)
        myAWSIoTMQTTShadowClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)

        myAWSIoTMQTTShadowClient.configureAutoReconnectBackoffTime(1, 32, 20)
        myAWSIoTMQTTShadowClient.configureConnectDisconnectTimeout(60) # 10sec
        myAWSIoTMQTTShadowClient.configureMQTTOperationTimeout(30) #5sec

        #connect to AWS IoT
        myAWSIoTMQTTShadowClient.connect()

        #create a devcie Shadow with persistent subscription
        thingName = "pi"
        deviceShadowHandler = myAWSIoTMQTTShadowClient.createShadowHandlerWithName(thingName, True)
        print("finish configuration")
        
        #get the shadow after started
        deviceShadowHandler.shadowGet(customShadowCallback_Get, 60)

def customShadowCallback_Get(payload, responseStatus, token):
    # print("responseStatus: " + responseStatus)
    # print("payload: " + payload)
    payloadDict = json.loads(payload)
    # print(payloadDict)
    return {
      'statusCode': 200,
      'headers': {
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          'Access-Control-Allow-Origin': '*'
      },
      'body': json.dumps(payloadDict)
    }


publishMessage("$aws/things/pi/shadow/get", "")