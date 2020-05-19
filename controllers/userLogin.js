// rendering user login view
module.exports.validate_user = function(req, res){

    // clearing stored cookies before new login
    res.clearCookie('user_id');

    return res.render("login", {title : "User Login page"});
}
