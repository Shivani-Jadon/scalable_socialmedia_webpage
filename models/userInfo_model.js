const mongoose = require("mongoose");

// database schema to store value of 
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        max : 50,
        required : true,
        unique : true
    },
    password : {
        type : String,
        // max : 30,
        // min : 10,
        required : true
    },
    first_name : {
        type : String,
        max : 30,
        required : true
    },
    last_name : {
        type : String,
        max : 30,
        required : true
    }
},{
    timestamps : true
});

// storing the collection object as model
const userDetails = mongoose.model("userDetails", userSchema);

module.exports = userDetails;