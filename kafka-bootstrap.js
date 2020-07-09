"use strict";
const {clientId,brokers}  = require("./config")
const { Kafka,logLevel, CompressionTypes }  = require('kafkajs')

const kafka = new Kafka({
    clientId,
    brokers,
    retry: {
        maxRetryTime: 10000,
        retries: 2,
      },
    logLevel: logLevel.INFO
})

module.exports = {kafka, CompressionTypes }