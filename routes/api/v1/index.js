const express = require('express');
const route = express.Router();

const postApi = require("../../../controllers/api/v1/postsAPI");
route.get("/post_api", postApi.post_data);

module.exports = route;