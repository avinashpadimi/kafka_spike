"use strict";

module.exports = {
  production: {
    clientId: "service A",
    brokers: ["localhost:9092"],
    producer: {
      channel: "test-topic1",
    },
    subscriber: {
      channels: ["test-topic2"],
      groupId: "test-group1"
    },
  },
};
