const mongoose = require("mongoose");

// database schema to store value of 
const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        max : 30,
        required : true
    },
    last_name : {
        type : String,
        max : 30,
        required : true
    },
    email : {
        type : String,
        max : 50,
        required : true
    },
    password : {
        type : String,
        // max : 30,
        // min : 10,
        required : true
    }
});

// storing the collection object as model
const userDetails = mongoose.model("userDetails", userSchema);

module.exports = userDetails;