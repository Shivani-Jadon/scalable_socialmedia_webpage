const Post = require("../../../models/post_model");
const Comment = require("../../../models/comment_model");

module.exports.post_data = async function(req,res){

    let posts = await Post.find({})
                        .sort('-createdAt')
                        .populate({ path : 'userInfo', select: ['first_name', 'last_name', 'email', 'createdAt', 'updatedAt']})
                        .populate({path : 'comments', options: { sort: '-createdAt' },       
                                populate : {
                                    path : 'user',
                                    select: ['first_name', 'last_name', 'email', 'createdAt', 'updatedAt']
                                }});

    return res.json(200, {
        message : "API for post data in json",
        posts : posts
    })
    
}


// controller for deleting post without authentication (without jwt)
module.exports.destroy = async function(req, res){

    try{

        let post = await Post.findById(req.params.id);

        //.id will convert id object to string for comparision
        if(post.userInfo == req.user.id)
        {
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            
        
            return res.json(200, {
                message : "Post deleted successfully"
            });
    
        }else{
            
            return res.json(401, {
                message : "Invalid token || You cannot delete this post"
            });
        }

    }catch(err){
        console.log("******", err);
        return res.json(200, {
            message : "Internal Server error"
        });
    }
        
}