const User = require("../models/userInfo_model");
const Friend = require("../models/friendship_model");

// Controller for adding friend of the user
module.exports.addFriend = async function(req, res){
    try{

        console.log(req.query.sender);
        console.log(req.query.receiver);
        
        let friend = await Friend.create({
            sender : req.query.sender,
            receiver : req.query.receiver
        })
    

        let sender_info = await User.findById(req.query.sender);
        let receiver_info = await User.findById(req.query.receiver);
    
        sender_info.friends.push(friend);
        sender_info.save();
    
        receiver_info.friends.push(friend);
        receiver_info.save();
    
        req.flash('success',"you are friends now");
        return res.redirect('back');

    }catch(error){

        console.log(error);
        // flash error msg      
        req.flash("error", "Error in fulfilling friend request");
        return res.redirect("back");
    }

}

// Controller for removing friend from friendlist
module.exports.removeFriend = async function(req, res){

    try{
        // checking if primary user is sender and profile data user is receiver
        let friend_data1 = await Friend.findOne({
            sender : req.query.user_send,
            receiver : req.query.user_receive
        });
    
        // checking if profile data user is sender and primary user is receiver
        let friend_data2 = await Friend.findOne({
            sender : req.query.user_send,
            receiver : req.query.user_receive
        });

        // deleting data if Case 1 is true
        if(friend_data1)
        {
            let sender_info = await User.findByIdAndUpdate( req.query.user_send, {$pop : {friends : friend_data1._id}});
            sender_info.save();
            let receiver_info = await User.findById(req.query.user_receive, {$pop : {friends : friend_data1._id}});
            receiver_info.save();
        
            friend_data1.remove();
        }
        // deleting data if case 2 is true
        else if(friend_data2)
        {
            let sender_info = await User.findByIdAndUpdate( req.query.user_receive, {$pop : {friends : friend_data2._id}});
            sender_info.save();
            let receiver_info = await User.findById(req.query.user_send, {$pop : {friends : friend_data2._id}});
            receiver_info.save();
        
            friend_data2.remove();
        }
        
    
        req.flash("success", "You are no longer friends");
                   
        return res.redirect("back"); 
    
    }catch(error){
        console.log(error);
        // flash error msg
        req.flash("error", "Error in fulfilling Unfriend request");
        return res.redirect("back");
    }
    
}