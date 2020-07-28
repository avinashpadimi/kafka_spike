// const {producerClient} = require("./producer");
// const {subscriberClient}  = require("./subscriber")
const {OrderSaga } = require("./sagas")

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    payload = {
      type: "OrderSaga",
      event: "OrderCreate",
      orderDetails: {
        id: "order_1",
        name: "headphones",
        price: 250
      }
    }
    OrderSaga.publish(payload)
    reply.send({ hello: "world" });
  });
};
