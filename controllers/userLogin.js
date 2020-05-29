const passport = require('passport');

// rendering user login view
module.exports.validate_user = function(req, res){

    if(req.isAuthenticated()){
        let id = req.user._id;
        // flash alert msg
        req.flash('warning', "Already signed in");
        //return res.redirect("/user/profile/:id");
        return res.redirect("back");
    }

    return res.render("login", {title : "User Login page"});
}
