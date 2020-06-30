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
route.use('/signup', require("./signup"));


// middleware to route to store new user info
route.use('/create_account', require("./create_account"));


// middleware to route to check authoriztion of info
route.use('/check_account', require("./check_account"));


// route to api
route.use('/api', require("./api"));

// middleware to route to toggle like

        // error may be encountered while running the server 
        // start redis server for mailer jobs

route.use('/like', require("./like"));

// exporting route
module.exports = route;