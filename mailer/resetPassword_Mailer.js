// const nodeMailer = require("../config/nodemailer");

// exports.newPassword = (access_token) => {

//     console.log("Inside nodeMailer", access_token);

//     let html_email = nodeMailer.renderTemplate();

//     nodeMailer.transporter.sendMail({
//         from: 'application2020development@gmail.com',                    // sender address
//         to: ,                       // list of receivers
//         subject: " Reset Password ",                            // Subject line
//         html: html_email                    // html body
//     }, (err, info) => {
//             if(err){
//                 console.log("Error in rendering mail ------", err);
//                 return;
//             }

//             console.log("Your password request is accepted ", info);
//             return;
//     });

// }