const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require("path");


// configure nodemailer for sending mails
let transporter = nodemailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user: 'jadon71998@gmail.com', // generated ethereal user
        pass: '#Ibelieveinme001', // generated ethereal password
    }
});


// render template emails in nodemailer
let renderTemplate = (data, relativePath) => {

    let mailHtml;
    ejs.renderFile(
        path.join(__dirname , "../views/mailers", relativePath),
        data,
        function(err, template){
            if(err){
                console.log("Error in rendering template ---- ", err);
                return;
            }

            mailHtml = template;
        }
    );

    return mailHtml;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}