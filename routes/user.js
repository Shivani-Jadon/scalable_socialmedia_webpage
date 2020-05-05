const express = require("express");
const route = express.Router();

const profile = require("../controllers/profile");

route.get("/profile", profile.userProfile);

module.exports = route;