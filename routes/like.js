const express = require('express');
const route = express.Router();
const toggle_like = require("../controllers/likeController");


route.post("/toggle", toggle_like.toggleLike);

// exporting route
module.exports = route;