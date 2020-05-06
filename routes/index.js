const express = require('express');
const route = express.Router();

console.log("router loaded");

const homeController = require("../controllers/homeController");

//routing to the desired controller
//const path = require("path to controller")
//route.get('url', controller.imported_action)
route.get('/',homeController.home);

//routing to sub-routes
//route.use('url', require(file path))
route.use('/user',require("./user"));

route.use('/posts',require("./posts"));


module.exports = route;