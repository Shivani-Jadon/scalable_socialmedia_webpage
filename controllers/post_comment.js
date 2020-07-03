const Comment = require("../models/comment_model");
const Post = require("../models/post_model");
const comment_mailer = require("../mailer/comment_Mailer");
const queue = require("../config/kue");
const commentEmailWorker = require("../workers/comment_email_workers");

module.exports.userComment = async function(req, res){

    // callback chaining using async await
    // error handling using try & catch
    try{
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id
            });

            post.comments.push(comment);
            post.save();

            // populating the newly created post
            comment = await Comment.populate(comment, {path: 'user', select: ['first_name', 'last_name', 'email']});
            

            // :::disabling mailer activities 
            // sending details to commentMailer
            //comment_mailer.newComment(comment);

            // Creating a new job and queuing it whenever a COMMENT is published and sent an email
            // a new queue is created if it is not present or a new job is inserted in the queue
            // create method takes queue name and data 
            // after saving the queue a callback function is executed
            // let job = queue.create('emails', comment).save(function(err){
            //     if(err){
            //         console.log("Error in creating new job", err);
            //         return;
            //     }

            //     console.log("New job queued ---> ", job.id);
            // })
        
            //console.log(comment);

            if(req.xhr){
                return res.status('200').json(
                    {
                        data : {comment: comment},
                        message : "comment created!"
                    }
                );
            }

            // flash success msg
            req.flash("success", "Comment succesfully added");
            return res.redirect("back");
        }

    }catch(err){
        
        req.flash("error", err);
        return res.redirect("back");
        
    }
    // callback chaining
    // Post.findById(req.body.post, function(err, post){

    //     if(post){
    //         //console.log("post id", post._id);
    //         Comment.create({
    //             content : req.body.content,
    //             post : req.body.post,
    //             user : req.user._id
    //         }, function(err, comment){
    //             if(err){
    //                 console.log(`Error in displaying comments : ${err}`);
    //                 return res.render("error", {layout : false});
    //             }

    //         //    console.log(comment);
    //             post.comments.push(comment);
    //             post.save();
    //             return res.redirect("back");
    //         })
    //     }
    // })
}
