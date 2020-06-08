const express = require('express');
const route = express.Router();

// route to v1
route.use("/v1", require("./v1"));

// route to v2
route.use("/v2", require("./v2"));

module.exports = route;