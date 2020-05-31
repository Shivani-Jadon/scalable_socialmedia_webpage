const Post = require("../models/post_model");

//display posting_page view when post is exported
module.exports.post = async function(req, res){

    // Post.find({}, function(err, posts){
    //     if(err){    console.log("error in finding posts", err); return;
    //     }
    //     return res.render("posting_page", {title: "User's posts", posts : posts});
    // });

    // populate the user of each post (this is called pre-populate data)
    // nested populating data in comments and user in comment schema
    
    try{

        let posts = await Post.find({})
                        .sort('-createdAt')
                        .populate('userInfo')
                        .populate({path : 'comments',       
                                populate : {
                                    path : 'user' 
                                }});

        return res.render("posting_page", {title: "User's posts", posts : posts});
        
    }catch(err){   
            console.log("error in finding posts", err); 
            return res.render("error", {layout : false});   //error page would be rendered without default layout
    }

}

// getting data from post form and storing it in database
module.exports.create_post = async function(req, res){
    // using async await for callback
    try{

        let post = await Post.create({
            content : req.body.content,
            userInfo : req.user._id
        });

        if(req.xhr){
            return res.status('200').json(
                {
                    data : {post: post},
                    message : "post created!"
                }
            );
        }

        // flash success msg
        req.flash("success", "Post succesfully added");
        return res.redirect('back');

    }catch(err){
        req.flash("error", err);
        return res.redirect("back");
    }

    // Post.create({
    //     content : req.body.content,
    //     userInfo : req.user._id
    // }, function(err, post){
    //     if(err){
    //         console.log(`Error on posting : ${err}`);
    //         return res.render("error", {layout : false});
    //     }

    //     return res.redirect('back');
    // });
}