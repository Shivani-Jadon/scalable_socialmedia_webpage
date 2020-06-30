const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    // this defines the object Id of liked object
    parent : {
        type : mongoose.Schema.ObjectId,
        required: true,
        refPath : 'onModel'
    },
    // this object is used for defining the type of likes in dynamic referencing
    onModel : {
        type: String,
        required: true,
        enum : ['postModel', 'comment']        
    }
},{
    timestamps : true
});

const Like = mongoose.model('Like', likesSchema);
module.exports = Like;