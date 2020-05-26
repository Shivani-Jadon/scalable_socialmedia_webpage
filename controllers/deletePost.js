const Post = require("../models/post_model");
const Comment = require("../models/comment_model");

module.exports.destroy_post = function(req, res){

    Post.findById(req.params.id, function(err, post){

        // .id will convert id object to string for comparision
        if(req.params.id == post.id)
        {
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){

                return res.redirect("back");
            });
        }else{
            return res.redirect("back");
        }
        
    });
}
