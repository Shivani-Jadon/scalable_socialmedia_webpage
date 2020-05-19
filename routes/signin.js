const express = require("express");
const route = express.Router();

// storing information of user-login controller
const signin_user = require("../controllers/userSignin");

console.log("loading user signin route");

// routing to the controller
route.get("/user-signin", signin_user.create_user);

// exporting the route
module.exports = route;