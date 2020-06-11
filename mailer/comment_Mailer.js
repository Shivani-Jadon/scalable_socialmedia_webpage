const nodeMailer = require("../config/nodemailer");

// another way of exporting
exports.commentMailer = (comment) =>{

    console.log("Inside nodeMailer");

    nodeMailer.transporter.sendMail({
        from: 'jadon1998@gmail.com',                    // sender address
        to: "comment.user.email",                       // list of receivers
        subject: " New comment published ",                            // Subject line
        html: "<h1> Your comment has been published </h1>"                    // html body
    }, (err, info) => {
            if(err){
                console.log("Error in sending mail ------", err);
                return;
            }

            console.log("Your msg has been sent ", info);
            return;
    });
}