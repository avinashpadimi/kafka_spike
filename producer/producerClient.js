const { start, stop, push } = require("./producer.js");
const {producer,clientId} = require("../config")

class ProducerClient {
  constructor() {
    this.name = clientId
    this.topic = producer.channel
  }

  composeMessage({ message, additionalInfo }) {
    return { message, serviceName: this.name };
  }

  async publish({ topic = this.topic, message, additionalInfo, headers }) {
    await push({topic, message: this.composeMessage({ message, additionalInfo }), headers});
  }

  async disconnect() {
    await stop();
  }

  async init() {
    await start()
  }
}

const producerObj  = new ProducerClient()
producerObj.init()
module.exports = producerObj
