const express = require("express");
const route = express.Router();

// storing information of authorizeUser controller
const check_user = require("../controllers/authenticateUser");

console.log("In route of create account");

route.post("/authenticate", check_user.verify_user);

module.exports =  route;