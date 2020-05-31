const passport = require('passport');

// rendering user login view
module.exports.validate_user = function(req, res){


    if(req.isAuthenticated()){

        let id = res.locals.user._id;
        //console.log(id);
        // flash alert msg
        req.flash('error', "Already signed in");
        return res.redirect(`/user/profile/${id}`);
        //return res.redirect("back");
    }

    return res.render("login", {title : "User Login page"});
}
