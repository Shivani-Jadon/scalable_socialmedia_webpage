// rendering user login view
module.exports.validate_user = function(req, res){

    // clearing stored cookies before new login
    // the user_id object will be removed from the cookies
    // After Sign-out the user won't be able be visit the profile page before logging in 
    res.clearCookie('user_id');

    return res.render("login", {title : "User Login page"});
}
