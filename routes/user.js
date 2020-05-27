const express = require("express");
const route = express.Router();
const passport = require('passport');

// route for user's profile page
const profile = require("../controllers/profile");
route.get("/profile/:id", passport.checkAuthentication, profile.profile_of_user);

// route for user's profile updation
route.post("/update/:id", passport.checkAuthentication, profile.update_user);

// route for sign-out page
const sign_out_user = require("../controllers/signOut");
route.get("/sign-out", sign_out_user.expire_session);

module.exports = route;