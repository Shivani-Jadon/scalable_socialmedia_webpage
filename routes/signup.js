const express = require("express");
const route = express.Router();

// storing information of user-login controller
const signup_user = require("../controllers/usersignup");

console.log("loading user signup route");

// routing to the controller
route.get("/user-signup", signup_user.create_user);

// exporting the route
module.exports = route;