// user info from database
const user_detail = require("../models/userInfo_model");

module.exports.add_new_user =async  function(req, res){

    try{

        // check if password and confirm password are equal or not
        if(req.body.password != req.body.confirm_password)
        {
            req.flash("error", "password and confirm password are not equal");
            return res.redirect("back");
        }
        // if password and confirm password are equal then find user
        let user = await user_detail.findOne({email: req.body.email});

        // if the user doesn't exist then create new user account in the database
        if(!user){
            await user_detail.create(req.body);
            
            req.flash("success", "user account successfully created");
            // after sign-in the user is redirected to the login page 
            return res.redirect("/login/user-login");                     
           
        }
        // if the user with the same email exist in the database then the user is asked to sigin with a new usename 
        // or can go to login page for logging in the system
        else{
            req.flash("error", "the user already exist");
            return res.redirect("back");
        }

    }catch(err){
        req.flash("error", err);
        return res.redirect("back");
    }
    
}

// user_detail.create(req.body == user_detail.create({
    //     first_name : req.body.first_name,
    //     last_name  : req.body.last_name,
    //     email : req.body.email,
    //     password : req.body.password
    // }