// user info from database
const user_detail = require("../models/userInfo_model");

module.exports.add_new_user = function(req, res){

    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect("back");
    }

    user_detail.findOne({email: req.body.email}, function(err, user){

        if(err){
                console.log(`Error in locating user in database : ${err}`);
                return;
        }

        if(!user){
            user_detail.create(req.body, function(err, user){
                if(err)
                {
                    console.log(`Error in updating/creating user data in database ${err}`);
                    return;
                }  
                return res.redirect("/login/user-login");                     
            });
        }else{
            return res.redirect("back");
        }    

    });

}

// user_detail.create(req.body == user_detail.create({
    //     first_name : req.body.first_name,
    //     last_name  : req.body.last_name,
    //     email : req.body.email,
    //     password : req.body.password
    // }