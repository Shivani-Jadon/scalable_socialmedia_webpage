const express = require('express');
const route = express.Router();
const passport = require("passport");

const postApi = require("../../../controllers/api/v1/postsAPI");
route.get("/post_api", postApi.post_data);

// route for post deletion
route.delete("/delete_post/:id", passport.authenticate('jwt', {session : false}), postApi.destroy);

module.exports = route;