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



// routing for google authentication
// providing strategy and scope for authentication
route.get('/authenticate/google', passport.authenticate('google', {scope : ['profile', 'email']}));
// route for callback function
route.get('/authenticate/google/callback', passport.authenticate('google', {failureRedirect : "/login/user-login"}),
                                            check_user.verify_user);
    
module.exports =  route;