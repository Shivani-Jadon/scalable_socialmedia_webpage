const passport = require('passport');

// rendering user login view
module.exports.validate_user = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }

    return res.render("login", {title : "User Login page"});
}
