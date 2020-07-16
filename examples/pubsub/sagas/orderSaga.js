const {producerClient} = require("../producer");
const {subscriberClient}  = require("../subscriber")
const {OrderService} = require("../services")
var events = require('events');
var eventEmitter = new events.EventEmitter();


const sagaHandler = async({topic,payload}) => {
    //Code to handle Order saga related events
    console.log("Order Service: inside saga handler\n",payload)
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
    console.log("---------Order has been created---------")
    orderDetails.event = "OrderCreated"
    orderDetails.sagaObject = sagaObject
    publish(orderDetails)
  }else {
    //Publish order creation failed event
    orderDetails.event = "Failed"
    publish(orderDetails)
  }
}

const dispatchProduct = ({topic,payload}) => {
    //Fire dispatch product event
    console.log("----------Order Placed & Dispatched---------")
    payload.event = "OrderPlaced"
    publish(payload)
}
const rollback = ({topic,payload}) => {
    // OrderService will initiate a rollback
    console.log("Initiated Order Service Rollback")
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