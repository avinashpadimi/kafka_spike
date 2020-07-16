const {start,stop } = require("./subscriber")
var events = require('events');
var eventEmitter = new events.EventEmitter();

class SubscriberClient {

  async init() {
   await start(this).catch(e => console.error(`consumer error ${e.message}`, e))
  }

  async disconnect() {
    await stop()
  }

  async registerSaga(sagaName,handler) {
    eventEmitter.on(sagaName,handler)
  }

  process({topic,partition,message}) {
    console.log(topic);
    console.log(message)
    const {payload}  = message
    eventEmitter.emit(payload.type,{topic,payload})
  }
}
const subscriber = new SubscriberClient();
subscriber.init()

module.exports = subscriber
