const express = require('express');
const route = express.Router();

console.log("router loaded");

const homeController = require("../controllers/homeController");

route.get('/',homeController.home2);

//routing to the desired controller
//const path = require("path to controller")
//route.get('url', controller.imported_action)

module.exports = route;