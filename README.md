# kafka_spike

1. Install Kafka : https://medium.com/@Ankitthakur/apache-kafka-installation-on-mac-using-homebrew-a367cdefd273

2. Create clone of this application and set the configurations.
   
  Application 1:
   production: {
    clientId: "service A",
    brokers: ["localhost:9092"],
    producer: {
      channel: "test-topic1",
    },
    subscriber: {
      channels: ["test-topic2"],
      groupId: "test-group1"
    },
  },
   
  Application 2:
   
   Example: 
     production: {
    clientId: "service B",
    brokers: ["localhost:9092"],
    producer: {
      channel: "test-topic2",
    },
    subscriber: {
      channels: ["test-topic1"],
      groupId: "test-group2"
    },
  },
  
3. Run applications on different port numbers.
 
