const mongoose = require("mongoose");

// connecting to database
mongoose.connect("mongodb://localhost/scalable_code_development");

const db = mongoose.connection;

// binding error 
db.on('error',console.error.bind(console, "Error connecting to database"));

//on opening of server
db.once('open', function(){
    console.log("Local Server Connected to database :: MongoDB")
});

module.exports = db;