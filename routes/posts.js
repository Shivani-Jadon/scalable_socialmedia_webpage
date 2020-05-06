const express = require("express");
const route = express.Router();

const userPost = require("../controllers/user_posts");

console.log("In route of posts");
route.get("/user_posts", userPost.post);

module.exports = route;