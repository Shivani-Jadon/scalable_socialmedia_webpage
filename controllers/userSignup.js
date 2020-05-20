const passport = require('passport');

// rendering user signup view
module.exports.create_user = function(req, res){

    if(req.isAuthenticated()){
        return res.redirect("/user/profile");
    }

    return res.render("signup", {title : "User Sign-up page"});
}
