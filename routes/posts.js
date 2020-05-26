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

// controller for deleting user's post
const remove_post = require("../controllers/deletePost");
route.get("/delete-post/:id", passport.checkAuthentication, remove_post.destroy_post);

// controller for deleting user's comment
const remove_comment = require("../controllers/deleteComment");
route.get("/delete-comment/:id", passport.checkAuthentication, remove_comment.destroy_comment);

module.exports = route;