const mongoose = require('mongoose');

const likesSchema = new mongoose.model({
    user : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    parent : {
        type : mongoose.Schema.ObjectId,
        refpath : onModel,
        required: true
    },
    onModel : {
        type: String,
        enum : ['postModel', 'comment'],
        required: true
    }
},{
    timestamps : true
});

const Like = mongoose.model('Like', likesSchema);
module.exports = Like;