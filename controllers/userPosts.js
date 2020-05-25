const Post = require("../models/post_model");

//display posting_page view when post is exported
module.exports.post = function(req, res){

    // Post.find({}, function(err, posts){
    //     if(err){    console.log("error in finding posts", err); return;
    //     }
    //     return res.render("posting_page", {title: "User's posts", posts : posts});
    // });

    // populate the user of each post (this is called pre-populate data)
    // nested populating data in comments and user in comment schema
    Post.find({})
    .populate('userInfo')
    .populate({path : 'comments',       
               populate : {
                   path : 'user' 
               }})
    .exec(function(err, posts){
        if(err){    
            console.log("error in finding posts", err); 
            return res.render("error", {layout : false});   //error page would be rendered without default layout
        }
    
        for(post of posts){
            for(comment of post.comments){
                console.log(comment);
                //console.log(comment.content);
            }
        }
        return res.render("posting_page", 
                            {title: "User's posts", posts : posts});
    });
}

// getting data from post form and stroing it in database
module.exports.create_post = function(req, res){
    Post.create({
        content : req.body.content,
        userInfo : req.user._id
    }, function(err, post){
        if(err){
            console.log(`Error on posting : ${err}`);
            return res.render("error", {layout : false});
        }

        return res.redirect('back');
    });
}