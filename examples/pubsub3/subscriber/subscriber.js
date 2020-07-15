// Use single consumer and redirect them to appropriate actions instead of consumber per topic/channel
//https://github.com/confluentinc/confluent-kafka-dotnet/issues/197

const rescueHandler = require("../rescueHandler")
const { subscriber } = require("../config");
const {kafka} = require("../kafka-bootstrap");


const consumer = kafka.consumer({ groupId: subscriber.groupId });
const subscribe = async ({ topic, fromBeginning = true }) => {
  await consumer.subscribe({ topic, fromBeginning });
};

const batchSubscribe = async () => {
  subscriber.channels.map(async (topic) => {
    await subscribe({topic});
  });
};

const parseMessage = ({message}) => {
  return { payload: JSON.parse(message.value)}
}

const start = async (subscriberClient) => {
  console.log("------------Starting Consumber-----------A")
  await consumer.connect();
  await batchSubscribe();
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
      console.log("mess is ",message)
      parsedMessage = parseMessage({message})
      subscriberClient.process({topic,partition, message: parsedMessage.payload.message})
      }
      catch(error){
        //We can push errors into other topic to track all the errors
        console.log("error is",error)
      }
    },
  });
};

const stop = async () => await consumer.disconnect()
rescueHandler(consumer)
module.exports = {start,stop};
