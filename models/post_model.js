const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type: String,
        required : true
    },
    user : {
        // refering to unique object id
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'userDetails'
    }
},{
        timestamps : true
    }
);


// storing the collection object as model
const postModel = mongoose.model('postModel', postSchema);
module.exports = postModel;