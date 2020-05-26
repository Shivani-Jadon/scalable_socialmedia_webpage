const Comment = require("../models/comment_model");
const Post = require("../models/post_model");

module.exports.userComment = function(req, res){

    Post.findById(req.body.post, function(err, post){

        if(post){
            //console.log("post id", post._id);
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            }, function(err, comment){
                if(err){
                    console.log(`Error in displaying comments : ${err}`);
                    return res.render("error", {layout : false});
                }

            //    console.log(comment);
                post.comments.push(comment);
                post.save();
                return res.redirect("back");
            })
        }
    })
}
