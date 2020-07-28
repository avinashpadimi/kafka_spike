"use strict";

const { production } = require("./config");
const { clientId, brokers,producer,subscriber } = production;
module.exports = {
  clientId,
  brokers,
  producer,
  subscriber
};
