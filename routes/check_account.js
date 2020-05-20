const express = require("express");
const route = express.Router();
const passport = require('passport');

// storing information of authorizeUser controller
const check_user = require("../controllers/authenticateUser");

console.log("In route of create account");

route.post("/create_session", passport.authenticate(
    'local',
    {failureRedirect: '/login/user-login'}
    ),  check_user.verify_user  );

module.exports =  route;