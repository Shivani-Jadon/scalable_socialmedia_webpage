const express = require("express");
const route = express.Router();

const profile = require("../controllers/profile");

route.get("/profile", profile.profile_of_user);

module.exports = route;