const express = require('express');
const route = express.Router();

console.log("router loaded");

const homeController = require("../controllers/homeController");

//routing to the desired controller
//const path = require("path to controller")
//route.get('url', controller.imported_action)
route.get('/',homeController.home);

//middleware routing to sub-routes
//route.use('url', require(file path))

// middleware to user-page route
route.use('/user',require("./user"));

// middleware to user-posts route
route.use('/posts',require("./posts"));

// middleware to login route
route.use('/login', require("./login"));

// middleware to login route
route.use('/signin', require("./signin"));

module.exports = route;