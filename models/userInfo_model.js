const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");
const Avatar_Path = path.join('/upload/users/avatar');

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
    },
    avatar : {
        type : String
    }
},{
    timestamps : true
});

// storage path for avatar
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', Avatar_Path));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

//  static methods for uploading file and avatar path
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = Avatar_Path;

// storing the collection object as model
const userDetails = mongoose.model("userDetails", userSchema);

module.exports = userDetails;