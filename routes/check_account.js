const express = require("express");
const route = express.Router();

// storing information of authorizeUser controller
const check_user = require("../controllers/authorizeUser");

console.log("In route of create account");

route.post("/authorize", check_user.verify_user);

module.exports =  route;