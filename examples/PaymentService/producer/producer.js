const rescueHandler = require("../rescueHandler");
const { kafka, CompressionTypes } = require("../kafka-bootstrap");

const producer = kafka.producer();

const start = async () => {
  console.log("Payment Service: Starting Producer...");
  await producer.connect();
};

const stop = async () => {
  await producer.disconnect();
};

const composeMessage = (message, headers) => {
  return [{ value: JSON.stringify(message), headers }];
};

//this will publish into this service related channel
const push = async ({ topic, message, headers }) => {
  try {
    await producer.send({
      topic,
      messages: composeMessage(message, headers),
      compression: CompressionTypes.GZIP,
    });
  } catch (error) {
    //Errors can be pushed to separate topic 
    // We could retry or track failure messages
  }
};

rescueHandler(producer);
module.exports = { start, push, stop };
