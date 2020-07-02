const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

    content : {
        type: String,
        required : true
    },

    user : {
        // refering to unique object id
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'userDetails'
    },
    post : {
        // refering to unique object id of post
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'postModel'
    },
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'Like'
        }
    ]
},{
    timestamps : true
});

const comment = mongoose.model("comment", commentSchema);
module.exports = comment;