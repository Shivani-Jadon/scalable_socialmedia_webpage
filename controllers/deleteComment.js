const Comment = require("../models/comment_model");
const Post = require("../models/post_model");

module.exports.destroy_comment = async function(req, res){
    
    try{

        Comment.findById(req.params.id, function(err, comment){
        
            if(comment.user == req.user.id){
                let post_id = comment.post; 
                
                // removing comment
                comment.remove();
    
                // removing comment from the database of post
                Post.findByIdAndUpdate(post_id, {$pull: {comments : req.params.id}});
    
                if(req.xhr){
                    return res.status(200).json({
                        data : {
                            comment_id : req.params.id 
                        },
                        message : "Comment deleted!",
                    });
                }
    
                // incase the ajax request isn't responded
                // flash success msg
                req.flash("success", "Comment removed");
                Post.findByIdAndUpdate(post_id, {$pull: {comments : req.params.id}}, function(err, post){
    
                     return res.redirect("back");                
                 });
                
            }
            else{
                // flash error msg
                req.flash("error", "You are not authorised to remove comments");
                return res.redirect("back");
            }
        })

    }catch(error){
        console.log("Error in deleting comment ",error);
        req.render('error', {layout: false});
    }
    
}