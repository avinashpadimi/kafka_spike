"use strict";
module.exports = {
  production: {
    clientId: "service B",
    brokers: ["localhost:9092"],
    producer: {
      channel: "test-topic2",
    },
    subscriber: {
      channels: ["test-topic1"],
      groupId: "test-group2"
    },
  },
};
