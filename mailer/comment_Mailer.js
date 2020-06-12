const nodeMailer = require("../config/nodemailer");

// another way of exporting
exports.commentMailer = (comment) =>{

    console.log("Inside nodeMailer", comment);

    let html_email = nodeMailer.renderTemplate({comment : comment}, "/comment/comment_publish.ejs");

    nodeMailer.transporter.sendMail({
        from: 'application2020development@gmail.com',                    // sender address
        to: comment.user.email,                       // list of receivers
        subject: " New comment published ",                            // Subject line
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