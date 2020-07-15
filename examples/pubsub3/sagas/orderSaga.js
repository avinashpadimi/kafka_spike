const {producerClient} = require("../producer");
const {subscriberClient}  = require("../subscriber")
const {PaymentService} = require("../services")
var events = require('events');
var eventEmitter = new events.EventEmitter();


const sagaHandler = async({topic,payload}) => {
    //Code to handle Order saga related events
    console.log("Payment Service inside saga handler",payload)
    eventEmitter.emit(payload.event,{topic,payload})
}

const makePayment = ({topic,payload}) => {
  // Make a call to service object and create
  const {status,orderDetails} = PaymentService.initiate(payload)
  if (status){
      // Decide what should be the next event to trigger
    payload.event = "Paid"
    publish(payload)
  }else {
    //Publish order creation failed event
    orderDetails.event = "Failed"
    publish(payload)
  }
}

const rollback = ({topic,payload}) => {
    // OrderService will initiate a rollback
    PaymentService.rollback(payload)
}

const publish = (payload) => {
  producerClient.publish({message: {payload}})
}

subscriberClient.registerSaga("OrderSaga",sagaHandler)
eventEmitter.on("OrderCreated",makePayment)
eventEmitter.on("Failed",rollback)

module.exports = { publish }