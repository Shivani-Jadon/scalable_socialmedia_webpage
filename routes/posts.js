const express = require("express");
const route = express.Router();
const passport = require('passport');

const userPost = require("../controllers/userPosts");

console.log("In route of posts");
// controller for showing post view
route.get("/user_posts", passport.checkAuthentication, userPost.post);

// controller for storing user's post in database
route.post("/create_post", userPost.create_post);

// controller for storing user comments on post
const comment = require("../controllers/post_comment");
route.post("/comment", passport.checkAuthentication, comment.userComment);

module.exports = route;