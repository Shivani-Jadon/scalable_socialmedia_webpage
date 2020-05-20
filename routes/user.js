const express = require("express");
const route = express.Router();
const passport = require('passport');

const profile = require("../controllers/profile");

route.get("/profile", passport.checkAuthentication, profile.profile_of_user);

module.exports = route;