const express = require('express');
const route = express.Router();

const postApi = require("../../../controllers/api/v1/postsAPI");
route.get("/post_api", postApi.post_data);

// route for post deletion
route.get("/delete_post/:id", postApi.destroy);

module.exports = route;