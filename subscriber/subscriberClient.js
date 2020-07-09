const {start,stop } = require("./subscriber")

class SubscriberClient {

  async init() {
   await start(this).catch(e => console.error(`consumer error ${e.message}`, e))
  }

  async disconnect() {
    await stop()
  }

  process({topic,partition,message}) {
    // Identify the saga and trigger appropriate saga object.
    // Each saga object will internally communicates with Service objects
    console.log("this is the topic ", topic);
    console.log("this is the message", message);
  }
}
const subscriber = new SubscriberClient();
subscriber.init()

module.exports = subscriber
