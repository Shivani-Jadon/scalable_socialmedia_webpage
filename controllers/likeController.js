const Like = require("../models/likes_model");
const Post = require("../models/post_model");
const Comment = require("../models/comment_model");


module.exports.toggleLike = async function(req, res){

    try{

        // like/toggle/?id=_id & type=Post/Comment
        let likeable;
        let deleted = false;

        if(req.query.type == "postModel"){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        };

        // check whether the like exist or not
        let existingLike = await Like.findOne({
            parent : req.query.id,
            onModel : req.query.type,
            user : req.user._id
            
        });

        // deleting the like if it already exists
        if(existingLike){
            // deleting like from post/comment model
            likeable.likes.pull(existingLike._id);
            likeable.save();
            // delete the like from Like model;
            existingLike.remove();
            deleted = true;
        }
        // creating a like if it doesn't exist
        else{
            let newLike = await Like.create({
                user : req.user._id,
                parent : req.query.id,
                onModel : req.query.type
            })

            // creating like from the post/comment model too
            likeable.likes.push(newLike._id);
            likeable.save();
         
        }

        // returning response to ajax request
        res.json(200, {
            message : "Like operation Successful",
            data : {
                deleted : deleted
            }
        })

    }catch(error){
        console.log("Error in toggling like ", error);
        return res.json(500, {
            msg : "Internal Server Error"
        })
    }
}