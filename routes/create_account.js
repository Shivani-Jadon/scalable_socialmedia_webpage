const express = require("express");
const route = express.Router();

// storing information of addUser controller
const add_user = require("../controllers/addUser");

console.log("In route of create account");

route.post("/add", add_user.add_new_user);

module.exports =  route;