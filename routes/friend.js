const express = require('express');
const route = express.Router();

const friendship = require("../controllers/friendshipController");

// route for controller for addina friend
route.post("/add", friendship.addFriend);
// route for controller for removing post
route.post("/remove", friendship.removeFriend);

module.exports = route;