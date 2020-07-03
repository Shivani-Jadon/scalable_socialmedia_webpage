const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // friend request from user
    sender : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'userDetails'
    },
    // friend request to user
    receiver : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'userDetails'
    }
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
module.exports = Friendship;