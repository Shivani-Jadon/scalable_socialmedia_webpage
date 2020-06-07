const Post = require("../models/post_model");
const Comment = require("../models/comment_model");

module.exports.destroy_post = async function(req, res){

    try{

        let post = await Post.findById(req.params.id);

        // .id will convert id object to string for comparision
        if(post.userInfo == req.user.id)
        {
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id : req.params.id 
                    },
                    message : "Post deleted!",
                });
            }

            // flash success msg
            // req.flash("success", "Post removed");

            return res.redirect("back");
    
        }else{
            
            req.flash("error", "You are not authorised to remove Post");
            return res.redirect("back");
        }

    }catch(err){
        req.flash("error", "You are not authorised to remove Post");
        return res.redirect("back");
    }
        
}
