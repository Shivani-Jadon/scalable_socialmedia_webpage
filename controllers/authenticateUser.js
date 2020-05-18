const user_detail = require("../models/userInfo_model");

module.exports.verify_user = function(req, res){

    let user_email = req.body.email;
    let user_password = req.body.password;

    // user_detail.find(user_email, user_password, function(err){

    //     if(err){
    //         console.log(`Error in login : ${err}`);
    //         return;
    //     }
    //     return res.send("<h1> Successfully Logged in </h1>");
    // });

    if(user_detail.email == user_email && user_detail.password == user_password)
    {
        return res.send("<h1> Successfully Logged in </h1>");
    }
}