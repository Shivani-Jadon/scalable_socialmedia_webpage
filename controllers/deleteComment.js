const Comment = require("../models/comment_model");
const Post = require("../models/post_model");
const Like = require("../models/likes_model");

module.exports.destroy_comment = async function(req, res){
    
    try{

        let comment = await Comment.findById(req.params.id); 
        
            if(comment.user == req.user.id){
                let post_id = comment.post; 

                // removing comment
                comment.remove();
    
                // removing comment from the database of post
                let post = await Post.findByIdAndUpdate(post_id, {$pull: {comments : req.params.id}});
    
                //Change :: deleting likes associated with comments
                Like.deleteMany({parent: comment._id, onModel: 'comment'});

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
               
                return res.redirect("back");                                
                
            }
            else{
                // flash error msg
                req.flash("error", "You are not authorised to remove comments");
                return res.redirect("back");
            }
        

    }catch(error){
        console.log("Error in deleting comment ",error);
        req.render('error', {layout: false});
    }
    
}