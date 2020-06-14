const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type: String,
        required : true
    },
    userInfo : {
        // refering to unique object id
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'userDetails'
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'comment'
        }
    ],
    likes : {
        type : mongoose.Schema.ObjectId, 
        ref : 'Like'
    }
},{
        timestamps : true
    }
);


// storing the collection object as model
const postModel = mongoose.model('postModel', postSchema);
module.exports = postModel;