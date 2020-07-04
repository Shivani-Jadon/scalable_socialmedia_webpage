const express = require('express');
const route = express.Router();

const friendship = require("../controllers/friendshipController");

// route for controller for addina friend
route.get("/add", friendship.addFriend);
// route for controller for removing post
route.get("/remove", friendship.removeFriend);

module.exports = route;