const user_detail = require("../models/userInfo_model");

//display profilepage view when profile_of_user is exported
module.exports.profile_of_user = function(req, res){

    // check if cookie is present or not
    if(req.cookies.user_id)
    {
        // find user by matching cookie user_id with the id in the database
        user_detail.findById(req.cookies.user_id, function(err, user){
            
            // if user is found then show user specific profile page
            if(user){
                return res.render("profilepage", {title: "User's profile", 
                                                        user: user.first_name + " " + user.last_name});
            }
            // handle user not found
            else{
                return res.redirect("/login/user-login");
            }
        });
    }
    // if cookie is not present then redirect to login page
    else{
        
            return res.redirect("/login/user-login");
    }
    
}

//display this when userProfile is exported
module.exports.userProfile = function(req, res){

    return res.send("<h1>Routing to the profiles page</h1>");
}