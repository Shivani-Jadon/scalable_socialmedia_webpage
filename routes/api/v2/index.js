const express = require('express');
const route = express.Router();

route.use("/postAPI", require('./posts'));

module.exports = route;