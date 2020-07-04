const User = require("../models/userInfo_model");
const Friend = require("../models/friendship_model");

// Controller for adding friend of the user
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

// Controller for removing friend from friendlist
module.exports.removeFriend = function(req, res){

    try{
        let friend_data = await Friend.findOne({
            sender : req.query.sender,
            receiver : req.query.receiver
        });
    
        let sender_info = await User.findByIdAndUpdate( req.query.sender, {$pop : {friends : friend_data._id}});
        sender_info.save();
        let receiver_info = await User.findById(req.query.receiver, {$pop : {friends : friend_data._id}});
        receiver_info.save();
    
        friend_data.remove();
    
        req.flash("success", "You are no longer friends");
                   
        return res.redirect("back"); 
    
    }catch(error){
        // flash error msg
        req.flash("error", "Error in fulfilling Unfriend request");
        return res.redirect("back");
    }
    
}