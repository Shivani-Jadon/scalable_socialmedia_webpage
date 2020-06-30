const Post = require("../models/post_model");
const postmailer = require("../mailer/post_Mailer");
const queue = require("../config/kue");
const post_email_worker = require("../workers/post_email_workers");

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
                        .populate({path : 'comments', options: { sort: '-createdAt' },       
                                populate : {
                                    path : 'user' 
                                },
                                populate : {
                                    path : 'likes'
                                }}
                        )        
                        .populate(
                            {
                                path : 'likes'
                            }
                        );

       

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

        // populating the newly created post
        post = await Post.populate(post, {path: 'userInfo', select: ['first_name', 'last_name', 'email']});

        // adding newly created post to mailer
        //postmailer.newPost(post);
        // Creating a new job and queuing it whenever a POST is published and sent an email
        let job = queue.create('emails', post).save(function(err){
            if(err){
                console.log("Error in creating new job", err);
                return;
            }

            console.log("New job queued ---> ", job.id);
        })

        //console.log(post);
                                                            
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