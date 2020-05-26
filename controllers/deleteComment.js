const Comment = require("../models/comment_model");
const Post = require("../models/post_model");

module.exports.destroy_comment = function(req, res){
    
    Comment.findById(req.params.id, function(err, comment){
        
        if(comment.user == req.user.id){
            let post_id = comment.post; 
            // removing comment
            comment.remove();

            // removing comment from the database of post
            Post.findByIdAndUpdate(post_id, {$pull: {comments : req.params.id}}, function(err, post){

                return res.redirect("back");                
            });
        }
        else{
            return res.redirect("back");
        }
    })
}