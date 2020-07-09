const {producerClient} = require("./producer");
const {subscriberClient}  = require("./subscriber")

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    producerClient.publish({
      message: { type: "saga type", info: "Hello world : This is the message from Server A" },
    });
    reply.send({ hello: "world" });
  });
};
