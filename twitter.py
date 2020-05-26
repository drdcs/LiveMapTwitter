from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from pykafka import KafkaClient
import credentials
import json

def get_kafka_client():
    return KafkaClient(hosts='localhost:9092')

class StdOutListener(StreamListener):

    def on_data(self, data):
        print(data)
        message = json.loads(data)
        if message['place'] is not None:
            client=get_kafka_client()
            topic = client.topics['pykafka']
            producer =  topic.get_sync_producer()
            producer.produce(data.encode('ascii'))
        return True


    def on_error(self, status):
        print(status)
    

if __name__ == "__main__":

    auth = OAuthHandler(credentials.API_KEY, credentials.API_SECRET_KEY)
    auth.set_access_token(credentials.ACCESS_TOKEN, credentials.ACCESS_TOKEN_SECRET)
    listener = StdOutListener()
    stream = Stream(auth, listener)
    stream.filter(track = ['india'])



