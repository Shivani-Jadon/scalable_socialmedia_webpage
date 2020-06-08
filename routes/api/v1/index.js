const express = require('express');
const route = express.Router();

route.use("/post", require("./posts"));

route.use("/user", require("./user"));

module.exports = route;