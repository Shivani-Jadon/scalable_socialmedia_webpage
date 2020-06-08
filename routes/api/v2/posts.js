const express = require('express');
const route = express.Router();

const postApi = require("../../../controllers/api/v2/apiPost");
route.get("/post", postApi.data_post);

module.exports = route;