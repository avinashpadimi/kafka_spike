const {producerClient} = require("../producer");
const {subscriberClient}  = require("../subscriber")
const {OrderService} = require("../services")
var events = require('events');
var eventEmitter = new events.EventEmitter();


const sagaHandler = async({topic,payload}) => {
    //Code to handle Order saga related events
    console.log("Order Service: inside saga handler",payload)
    eventEmitter.emit(payload.event,{topic,payload})
}

const initiateSage = () => {
  return { id: "saga object 1"}
}

const createOrder = ({topic,payload}) => {
  // Make a call to service object and create
  const sagaObject = initiateSage() 
  const {status,orderDetails} = OrderService.create(payload)
  if (status){
      // Decide what should be the next event to trigger
    orderDetails.event = "OrderCreated"
    orderDetails.sagaObject = sagaObject
    console.log("order details are ", orderDetails)
    publish(orderDetails)
  }else {
    //Publish order creation failed event
    orderDetails.event = "Failed"
    publish(orderDetails)
  }
}

const dispatchProduct = ({topic,payload}) => {
    //Fire dispatch product event
    payload.event = "OrderPlaced"
    publish(payload)
}
const rollback = ({topic,payload}) => {
    // OrderService will initiate a rollback
    OrderService.rollback(payload)
}

const publish = (payload) => {
  producerClient.publish({message: {payload}})
}

subscriberClient.registerSaga("OrderSaga",sagaHandler)
eventEmitter.on("OrderCreate",createOrder)
eventEmitter.on("Paid",dispatchProduct)
eventEmitter.on("Failed",rollback)

module.exports = { publish }