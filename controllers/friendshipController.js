const User = require("../models/userInfo_model");
const Friend = require("../models/friendship_model");

module.exports.addFriend = async function(req, res){

    let friend = await Friend.create({
        sender : req.query.sender,
        receiver : req.query.receiver
    })

    let sender_info = await User.findById( req.query.sender);
    let receiver_info = await User.findById(req.query.receiver);

    sender_info.friends.push(friend);
    sender_info.save();

    receiver_info.friends.push(friend);
    receiver_info.save();

    req.flash('success',"you are friends now");
    return res.redirect('back');

}