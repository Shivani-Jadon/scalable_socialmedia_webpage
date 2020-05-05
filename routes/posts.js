const express = require("require");
const route = express.Router();

console.log("In route of posts");
const userPost = require("../controllers/user_posts");

console.log("In route of posts");
route.get("/posts/user_posts", userPost.post);

module.exports = route;