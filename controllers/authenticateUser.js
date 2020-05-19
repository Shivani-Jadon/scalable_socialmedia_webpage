const user_detail = require("../models/userInfo_model");

// steps for authenticating user
module.exports.verify_user = function(req, res){

    // find user
    user_detail.findOne({email: req.body.email}, function(err, user){
    
        if(err)
        {
            console.log(`Error in updating/creating user data in database ${err}`);
            return;
        } 

        // handle user found
        if(user)
        {   // handle password mismatch/incorrect password
            if(user.password != req.body.password)
            {
                return res.redirect("back");
            }

            // handle session creation
            res.cookie("user_id", user.id);
            res.redirect("/user/profile");
        }
        // handle user  not found
        else
        {
            return res.redirect("back");
        }
                    
    });
 
}