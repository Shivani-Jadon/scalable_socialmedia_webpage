const Like = require("../models/likes_model");
const Post = require("../models/post_model");
const Comment = require("../models/comment_model");


module.exports.toggleLike = async function(req, res){

    try{

        // like/toggle/?id=_id & type=Post/Comment
        let likeable;
        let deleted = false;

        if(req.query.type == "Post"){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        };

        // check whether the like exist or not
        let existingLike = await Like.findOne({
            user : req.user._id,
            parent : req.query.id,
            onModel : req.query.type
        });

        // deleting the like if it already exists
        if(existingLike){
            // deleting like from post/comment model
            parent.likes.pull(existingLike._id);
            parent.save();
            // delete the like from Like model;
            existingLike.remove();
        }
        // creating a like if it doesn't exist
        else{
            let newLike = await Like.create({
                user : req.user._id,
                parent : req.query.id,
                onModel : req.query.type
            })

            // creating like from the post/comment model too
            parent.likes.push(newLike._id);
            parent.save();
            
            deleted = true;
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