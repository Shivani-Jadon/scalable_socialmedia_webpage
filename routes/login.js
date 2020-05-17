const express = require("express");
const route = express.Router();

// storing information of user-login controller
const login_user = require("../controllers/userLogin");

console.log("loading user login route");

// routing to the controller
route.get("/user-login", login_user.validate_user);

// exporting the route
module.exports = route;