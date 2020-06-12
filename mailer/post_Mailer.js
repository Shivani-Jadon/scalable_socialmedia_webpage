const nodeMailer = require("../config/nodemailer");

// another way of exporting
exports.newPost = (post) =>{

    console.log("Inside nodeMailer", post);

    let html_email = nodeMailer.renderTemplate({post : post}, "/post/publish_post.ejs");

    nodeMailer.transporter.sendMail({
        from: 'application2020development@gmail.com',                    // sender address
        to: post.userInfo.email,                       // list of receivers
        subject: " New Post published ",                            // Subject line
        html: html_email                    // html body
    }, (err, info) => {
            if(err){
                console.log("Error in rendering mail ------", err);
                return;
            }

            console.log("Your msg has been sent ", info);
            return;
    });
}