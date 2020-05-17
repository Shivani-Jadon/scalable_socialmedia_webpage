const express = require("express");
const route = express.Router();

const userPost = require("../controllers/userPosts");

console.log("In route of posts");
route.get("/user_posts", userPost.post);

module.exports = route;