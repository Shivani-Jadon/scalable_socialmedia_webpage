const express = require('express');
const route = express.Router();

let userAPI = require("../../../controllers/api/v1/signinAPI");

route.post("/signin", userAPI.create_session);

module.exports = route;