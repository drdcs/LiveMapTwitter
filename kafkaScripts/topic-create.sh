$KAFKA_HOME/bin/kafka-topics --create --zookeeper localhost:9092 --topic pykafka --partitions 5 --replication-factor 1 --config segment.bytes=1000000