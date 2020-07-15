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
    // Identify the saga and trigger appropriate saga object.
    // Each saga object will internally communicates with Service objects
    console.log("this is the topic ", topic);
    console.log("this is the message---2", message)
    console.log("this is the message", message.payload)
    
    const {payload}  = message
    eventEmitter.emit(payload.type,{topic,payload})
  }
}
const subscriber = new SubscriberClient();
subscriber.init()

module.exports = subscriber
